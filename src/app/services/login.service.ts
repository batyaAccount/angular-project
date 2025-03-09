import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../../Person';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

    loginUser(person:  Partial<Person>): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, person)
    }
   
    addUser(person:  Partial<Person>): Observable<any> {
      return this.http.post(`${this.apiUrl}/auth/register`, person);
    }
     
}
