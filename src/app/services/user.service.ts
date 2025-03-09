import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Person } from '../../Person';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly user: BehaviorSubject<Partial<Person>> = new BehaviorSubject<Partial<Person>>(

    this.getUserFromSessionStorage()
  );
  user$ = this.user.asObservable();
  constructor(private http: HttpClient) {
  }
  private getHeaders(): HttpHeaders {
    let token = '';
    if (this.user$.subscribe(
      (user: Partial<Person>) => {
        if (user && user.token) {
          token = user.token;
        }
      }
    )) { }
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  getTeacerById(id: string|undefined): Observable<Partial<Person>> {
    if(id == undefined) 
      alert("Please provide a valid id");
    return this.http.get(`http://localhost:3000/api/users/${id}`, { headers: this.getHeaders() })
  }
  setValue(newValue: Partial<Person>): void {
    this.user.next(newValue);
    this.saveUserToSessionStorage(newValue);

  }

  get currentValue(): Partial<Person> {
    return this.user.value;
  }
  clearUser(): void {
    this.user.next({ userId: '', name: '', email: '', password: '', role: '', token: '' });
    sessionStorage.removeItem('user'); // Clear from sessionStorage
  }

  private saveUserToSessionStorage(user: Partial<Person>): void {

    sessionStorage.setItem('user', JSON.stringify(user));
  }

  private getUserFromSessionStorage(): Partial<Person> {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : { userId: '', name: '', email: '', password: '', role: '', token: '' };
  }
}
