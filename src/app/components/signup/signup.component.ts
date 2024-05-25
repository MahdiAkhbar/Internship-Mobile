import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordStrengthValidator } from '../../shared/validators/passwordStrength.validator';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  signupForm!: FormGroup;
  successSignupMsg: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, passwordStrengthValidator()])
    })
  }

  onSubmit() {
    if (!this.signupForm.valid)
      return;
    this.errorMessage = '';
    this.isLoading = true;

    this.authService.signup({ ...this.signupForm.value }).pipe(
      catchError((err) => {
        this.errorMessage = err;
        this.isLoading = false;
        return throwError(() => err);
      })
    ).subscribe(() => {
      this.signupForm.reset();
      this.isLoading = false;
      this.successSignupMsg = 'ثبت نام موفقیت آمیز \n لطفا وارد شوید';
      setTimeout(() => {
        this.router.navigate(['/m', 'login']);
      }, 2000);
    })
  }

  goToLogin() {
    this.router.navigate(['/m/login']);
  }
}
