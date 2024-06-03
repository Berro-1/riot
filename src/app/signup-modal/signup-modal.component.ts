import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;  // Toggle between login and sign up mode
  }

  onSubmit() {
    if (this.isLoginMode) {
      // Login logic here
      console.log('Logging in:', this.email, this.password);
    } else {
      // Sign-up logic here
      console.log('Signing up:', this.email, this.password, this.confirmPassword);
    }
  }
}
