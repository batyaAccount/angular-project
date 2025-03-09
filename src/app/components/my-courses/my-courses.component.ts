import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { UserService } from '../../services/user.service';
import { Courses } from '../../../Courses';

@Component({
  selector: 'app-my-courses',
  
standalone:true,
  imports: [ RouterLink, RouterOutlet, MatButtonModule, MatCardModule],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent {
   courses: Partial<Courses>[] = [];
 
  constructor(private coursesService: CoursesService, private user: UserService, private route: Router) {
   this.loadCourses();
  }
 loadCourses(){
  this.coursesService.getCoursesByStudentId(this.user.currentValue.userId).subscribe(
    c => this.courses = c
  );
 }
  leaveCourse(id: string | undefined) {
    var c;
    this.coursesService.leaveCourse(id).subscribe(r => { this.loadCourses()}, error => alert("You are not allowed to leave")
    );

  }
}
