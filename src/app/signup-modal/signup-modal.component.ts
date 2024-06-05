import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import * as bootstrap from 'bootstrap';

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

 onSubmit(authCheck: any) {
    if (this.isLoginMode) {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        if (response.success) {
          setTimeout(() => {
            this.closeModal();  // Adding a slight delay can help ensure proper order of operations
          }, 500);
          this.navigateUser(response.role);
        } else {
          console.error('Login failed:', response.message);
        }
      },
      error => console.error('Login error:', error)
    );
  } else {
    this.authService.signup(this.email, this.password, this.confirmPassword).subscribe(
      (response) => {
        if (response.success) {
          this.closeModal();  // Close the modal on successful response
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
private navigateUser(role: string): void {
  switch (role) {
    case '1':  // User role
      this.router.navigate(['/user-page']);
      break;
    case '0':  // Admin role
      this.router.navigate(['/admin-page']);
      break;
    default:  // Any other role that isn't explicitly handled
      console.log(`Login successful, but role ${role} handling not implemented`);
      this.router.navigate(['/']); // Navigate to a default or error page
      break;
  }
}


private closeModal(): void {
  const modalElement = document.getElementById('signupModal');
  if (modalElement) {
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    if (modalInstance) {
      modalInstance.hide();
    } else {
      const newModalInstance = new bootstrap.Modal(modalElement);
      newModalInstance.hide();
    }
    // Ensure the modal-open class is removed from the body
    document.body.classList.remove('modal-open');
    // Manually remove any remaining backdrop elements
    this.removeBackdrop();
  }
}

private removeBackdrop(): void {
  const backdrops = document.querySelectorAll('.modal-backdrop');
  backdrops.forEach(backdrop => {
    backdrop.remove();
  });
}



}