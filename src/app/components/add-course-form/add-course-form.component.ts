import { ChangeDetectorRef, Component } from "@angular/core";
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { CoursesService } from "../../services/courses.service";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { UserService } from "../../services/user.service";
import { Courses } from "../../../Courses";
import { Lessons } from "../../../Lessons";

@Component({
  selector: 'app-add-course-form',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './add-course-form.component.html',
  styleUrl: './add-course-form.component.css'
})
export class AddCourseFormComponent {
  constructor(private cdr: ChangeDetectorRef, private coursesService: CoursesService, private router: Router, private route: ActivatedRoute, private user: UserService) {
    const courseId = this.route.snapshot.paramMap.get('courseId');
    if (courseId) {
      this.coursesService.getCourseById(+courseId).subscribe(course => {
        this.course = course;
        this.patchCourseData(course);
      });
    }
  }

  private isSubmitted: boolean = false;

  course: Partial<Courses> | undefined
  courseId: string = '0'
  tmp: Partial<Lessons>[] = []
  addCourseForm = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    teacherId: new FormControl<string>('', [Validators.required]),
    lessons: new FormArray([], [Validators.required])
  });
  patchCourseData(course: Partial<Courses>): void {
    this.addCourseForm.patchValue({
      title: course.title,
      description: course.description,
      teacherId: course.teacherId
    });
    this.coursesService.getLessonsInCourses(course.id).subscribe((less) => {
      less.forEach(l => {
        this.tmp.push(l)
        this.coursesService.removeLessonFromCourse(course.id as string, l.id as string).subscribe(s => {
        })
        this.lessons.push(new FormGroup({
          title: new FormControl(l.title, Validators.required),
          content: new FormControl(l.content, Validators.required)
        }));
      });
    })
    this.lessons.clear();


  }
  get lessons(): FormArray {
    return this.addCourseForm.get('lessons') as FormArray;
  }
  addLesson(): void {
    this.lessons.push(new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    }));
  }


  removeLesson(index: number): void {
    this.lessons.removeAt(index);   
    this.sent("laod")

  }

  sent(typ: string) {
    this.user.getTeacerById(this.addCourseForm.value.teacherId as string).subscribe(res => {
      this.isSubmitted = true
      if (this.course == undefined) {
        this.addCourse();
      } else {
        this.updateCourse(this.addCourseForm.value as Partial<Courses>, this.course.id);
      }
      if (typ == "send")
        this.router.navigate(['/home/courses-page']);
      else {
window.location.reload();
      }
    }, error => {

      alert("The teacherId is not valid. Please try again.");
      this.router.navigate(['/home/courses-page']);

    });
  }
  addCourse() {
    var cour = {
      title: this.addCourseForm.value.title ?? undefined,
      description: this.addCourseForm.value.description ?? undefined,
      teacherId: this.addCourseForm.value.teacherId ?? undefined,
      lessons: this.lessons.controls.map(control => control.value)
    } as Partial<Courses>
    this.coursesService.addCourses(cour).subscribe(
      r => {
        this.courseId = r.courseId;
        for (let index = 0; index < this.lessons.length; index++) {
          this.coursesService.addLessonToCourse(this.lessons.at(index).value as Partial<Lessons>, this.courseId).subscribe(r => { },
            err => console.log(err))
        }
      },
      error => alert("error at adding course"))

  }
  updateCourse(course: Partial<Courses>, id: string | undefined) {
    this.coursesService.updateCourse(course, id).subscribe(r => { }, error => alert("You are not allowed to update"))
    for (let index = 0; index < this.lessons.length; index++) {
      this.coursesService.addLessonToCourse(this.lessons.at(index).value as Partial<Lessons>, id ? id : '-1').subscribe()
    }
  }
}
