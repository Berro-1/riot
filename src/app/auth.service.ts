import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/riot';

  constructor(private http: HttpClient) {}

  signup(email: string, password: string, confirmPassword: string): Observable<any> {
    const body = { email, password, confirmPassword };
    return this.http.post(`${this.apiUrl}/signup.php`, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login.php`, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      tap((response: any) => {
        if (response.success) {
          sessionStorage.setItem('userId', response.userId); // Store userId in session storage
        }
      })
    );
  }

  getSessionUserId(): number {
    return +sessionStorage.getItem('userId')!; // Fetch userId from session storage
  }

  checkSession(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getSession.php`); // Check session from PHP backend
  }
}
