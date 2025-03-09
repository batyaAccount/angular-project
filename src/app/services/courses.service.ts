import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Courses } from '../../Courses';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Lessons } from '../../Lessons';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {



  constructor(private http: HttpClient, private user: UserService) { }
  private apiUrl = 'http://localhost:3000/api';
  private getHeaders(): HttpHeaders {
    let token = '';
    this.user.user$.subscribe(user => {
      if (user?.token) {
        token = user.token;
      }
    });
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  addCourses(course: Partial<Courses>): Observable<any> {
    return this.http.post(`${this.apiUrl}/courses`, course, { headers: this.getHeaders() });
  }
  addLessonToCourse(lesson: Partial<Lessons>, courseId: string): Observable<any> {

    return this.http.post(`${this.apiUrl}/courses/${courseId}/lessons`, lesson, { headers: this.getHeaders() });
  }

  removeLessonFromCourse(courseId: string,less:string): Observable<any> {

    return this.http.delete(`${this.apiUrl}/courses/${courseId}/lessons/${less}`,{ headers: this.getHeaders() });
  }
  deleteCourse(id: string | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/courses/${id}`, { headers: this.getHeaders() })
  }

  updateCourse(course: Partial<Courses>, id: string | undefined): Observable<Partial<Courses>> {
    return this.http.put(`${this.apiUrl}/courses/${id}`, course, { headers: this.getHeaders() })
  }

  getCourses(): Observable<Partial<Courses>[]> {
    return this.http.get<Courses[]>(`${this.apiUrl}/courses`, { headers: this.getHeaders() });
  }
  getLessonsInCourses(courseId:string|undefined): Observable<Partial<Lessons>[]> {
    return this.http.get<Partial<Courses>[]>(`${this.apiUrl}/courses/${courseId}/lessons`, { headers: this.getHeaders() });
  }
  getCoursesByStudentId(studentId:string|undefined): Observable<Partial<Lessons>[]> {
    return this.http.get<Partial<Courses>[]>(`${this.apiUrl}/courses/student/${studentId}`, { headers: this.getHeaders() });
  }
  getCourseById(id: number): Observable<Partial<Courses>> {
    return this.http.get<Partial<Courses>>(`${this.apiUrl}/courses/${id}`, { headers: this.getHeaders() });
  }

  getLessonsByCourseId(id: number): Observable<Partial<Lessons>[]> {
    return this.http.get<Partial<Lessons>[]>(`${this.apiUrl}/courses/${id}/lessons`, { headers: this.getHeaders() });
  }
  joinToCourse(courseId: string | undefined): Observable<any> {
    var userId;
    this.user.user$.subscribe(d => userId = d.userId)
    return this.http.post(`${this.apiUrl}/courses/${courseId}/enroll`, { userId }, { headers: this.getHeaders() })
  }
  leaveCourse(courseId: string | undefined): Observable<any> {
    var userId;
    this.user.user$.subscribe(d => userId = d.userId)
    return this.http.delete(`${this.apiUrl}/courses/${courseId}/unenroll`, { body: { userId }, headers: this.getHeaders() })
  }
}
