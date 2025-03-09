import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Courses } from '../../../Courses';
import { Person } from '../../../Person';
import { CoursesService } from '../../services/courses.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [RouterLink, RouterLink, RouterOutlet, MatButtonModule, MatCardModule, ],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.css'
})
export class CoursesPageComponent {
  openFormToAdd = false;
  courses: Partial<Courses>[] = [];
  coursesNot: Partial<Courses>[] = [];
  person: Partial<Person> = {};
  constructor(private coursesService: CoursesService, private user: UserService, private route: Router) {
    this.loadCourses();
    this.person = this.user.currentValue;
  }
  loadCourses() {
    this.coursesService.getCourses().subscribe(allCourses => {
      this.courses = allCourses;
      if (this.user.currentValue.role === "student") {
        this.coursesService.getCoursesByStudentId(this.user.currentValue.userId).subscribe(enrolledCourses => {
          const enrolledCourseIds = enrolledCourses.map(course => course.id);
          this.courses = this.courses.filter(course => !enrolledCourseIds.includes(course.id));
        });
      }
    });
  }
  InCourse(course: Partial<Courses>, studId: string | undefined): boolean {
    this.coursesService.getCoursesByStudentId(studId).subscribe(r => {
      if (r.find(x => x.id === course.id))
        return true;
      else
        return false;
    })
    return false;
  }
  loadCoursesTeacher() {
    this.coursesService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }


  deleteCourse(id: string | undefined) {
    this.coursesService.deleteCourse(id).subscribe(r => { this.loadCoursesTeacher() }, error => alert("You are not allowed to delete"))
  }

  JoinToCourse(id: string | undefined) {
    var c;
    this.coursesService.joinToCourse(id).subscribe(r => {
      this.loadCourses();

    }, error => alert("You are not allowed to join")
    );

  }
}
