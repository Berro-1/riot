import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/riot';

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
    });
  }
}
