import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  loginForm!: FormGroup;
  isLoading: boolean = false;
  errorMessage!: string;
  successLoginMsg: string = '';

  ngOnInit(): void {
    this.autoLogin();
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      // 'remember': new FormControl(false)
    })
  }

  onSubmit() {
    this.errorMessage = '';
    let formControls = this.loginForm.controls;
    if (!formControls['username'].touched)
      this.loginForm.controls['username'].markAsTouched();
    if (!formControls['password'].touched)
      this.loginForm.controls['password'].markAsTouched();
    // if (!formControls['captcha'].touched)
    //   this.loginForm.controls['captcha'].markAsTouched();

    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login({ ...this.loginForm.value }).subscribe({
        next: (resData) => {
          this.userService.getUserProfile(this.loginForm.value.username).subscribe()
          this.successLoginMsg = 'ورود موفقیت آمیز';
          this.isLoading = false;
          setTimeout(() => {
            this.loginForm.reset();
            this.router.navigate(['/m']);
          }, 1000);
        },
        error: (err) => {
          this.errorMessage = err;
          this.isLoading = false;
        }
      })
    }
  }

  goToSignup() {
    this.router.navigate(['/m/signup']);
  }

  autoLogin() {
    let user = this.authService.getUser();
    let token = this.authService.getToken();
    if (user && token)
      this.userService.getUserProfile(user.username).subscribe(resData => {
        //check if the user object in localstorage is equal to the user object comes from api
        if (resData.status === 200) {
          if (JSON.stringify({ username: user.username, pass: user.password }) === JSON.stringify({ username: resData.body?.username, pass: resData.body?.password })) {
            this.authService.isLoggedin.next(true);
            this.router.navigate(['/m']);
          }
        }
        else {
          return;
        }
      })
  }
}
