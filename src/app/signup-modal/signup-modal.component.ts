import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModalComponent implements OnInit {
  isLoginMode = true;  // True for login, false for sign up
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;  // Toggle between login and sign up mode
  }

  onSubmit(authForm: any) {  // Accept the form as a parameter
    if (this.isLoginMode) {
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          if (response.success) {
            if (response.role == 1) {
              this.router.navigate(['/user-page']);  // Redirect to user page
            } 
            else if (response.role == 0) {
            this.router.navigate(['/admin-page']);  // Redirect to admin page
              } 
            else {
              // Handle other roles if needed
              console.log('Login successful, but role handling not implemented');
            }
          } else {
            console.error('Login failed:', response.message);
          }
        },
        (error) => {
          console.error('Login error:', error);
        }
      );
    } else {
      this.authService.signup(this.email, this.password, this.confirmPassword).subscribe(
        (response) => {
          if (response.success) {
            console.log('Signup successful');
          } else {
            console.error('Signup failed:', response.message);
          }
        },
        (error) => {
          console.error('Signup error:', error);
        }
      );
    }
  }
}
