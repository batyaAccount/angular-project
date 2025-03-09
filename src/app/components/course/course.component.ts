import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Courses } from '../../../Courses';
import { CoursesService } from '../../services/courses.service';
import { Lessons } from '../../../Lessons';
import { Person } from '../../../Person';
import { UserService } from '../../services/user.service';
import { LessonsPipe } from '../../pipes/lessons.pipe';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle } from '@angular/material/card';

@Component({
  selector: 'app-course',
  standalone:true,
  imports: [ LessonsPipe, MatCard,MatCardHeader,MatCardSubtitle,MatCardContent],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {

  constructor(private activedRoute: ActivatedRoute, private courseService: CoursesService, private userService: UserService) { }
  courseId: number = 0;
  course: Partial<Courses> = {}
  lessons: Partial<Lessons>[] = []
  teacher: Partial<Person> = {}

  ngOnInit() {

    this.activedRoute.paramMap.subscribe(p => {
      const id = p.get('id');
      if (id) {
        this.courseId = +id;
        this.courseService.getCourseById(this.courseId).subscribe(c => 
          {
          this.course = c
          this.userService.getTeacerById(c.teacherId).subscribe(t => this.teacher = t);
          
        });
        this.courseService.getLessonsByCourseId(this.courseId).subscribe(c => this.lessons = c)
        console.log(this.lessons);
      }
      else
        console.log('There is no course');
    })
   

  }

}
