import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, take, tap, throwError } from 'rxjs';

import { ILogin } from '../interfaces/loginform.interface';
import { ISignup } from '../interfaces/signupform.interface';
import { ILoginResponse } from '../interfaces/login-response.interface';
import { IUser } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { UserAgentService } from './user-agent.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private userAgentService: UserAgentService,
    @Inject('API_URL') private apiUrl: string,
    @Inject('GLOBAL_TOKEN') private gToken: string
  ) { }

  isLoggedin: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isLoggedinState: boolean = false;

  getLoggedInState() {
    return this.isLoggedinState;
  }

  signup(signupData: ISignup) {
    let headers = new HttpHeaders({
      'Authorization': this.gToken
    });
    let options = { headers: headers };

    return this.http.post<{ msg: string }>(
      this.apiUrl + '/user/register',
      signupData,
      options
    ).pipe(
      catchError(errorRes => this.handleError(errorRes))
    )
  }

  login(loginData: ILogin) {
    return this.http.post<ILoginResponse>(
      this.apiUrl + '/login',
      loginData,
      { observe: 'response' }
    ).pipe(
      take(1),
      tap(resData => {
        this.setToken(<string>resData.body?.token);
        this.setRefreshToken(<string>resData.body?.refresh_token);
        this.isLoggedin.next(true);
      }),
      catchError(errorRes => this.handleError(errorRes))
    )
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh-token');
    localStorage.removeItem('user');
    localStorage.removeItem('ins-code');
    this.isLoggedin.next(false);
    let userAgent = this.userAgentService.getDeviceType();
    if (userAgent === 'Desktop') {
      this.router.navigate(['/d/login']);
    }
    else
      this.router.navigate(['/m/login']);

  }

  private handleError(err: any) {
    let errorMessage = 'مشکلی پیش آمد لطفا دوباره تلاش کنید';
    if (!err.error) {
      return throwError(() => errorMessage);
    }
    return throwError(() => err.error.msg);
  }

  getToken() {
    let token = localStorage.getItem('token');
    if (!token) {
      this.isLoggedin.next(false);
    }
    return token;
  }

  getRefreshToken() {
    let refToken = localStorage.getItem('refresh-token');
    if (!refToken)
      this.logout();
    return refToken;
  }

  setToken(value: string) {
    localStorage.setItem('token', value);
  }

  setRefreshToken(value: string) {
    localStorage.setItem('refresh-token', value);
  }

  refreshToken() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken)
      return throwError(() => 'No refresh token is available');

    const headers = new HttpHeaders({
      'Authorization': refreshToken
    });
    const options = { headers: headers };
    return this.http.get<{ token: string }>(this.apiUrl + '/user/refresh_token', options).pipe(
      tap(resData => {
        this.setToken(resData.token);
      }),
      catchError(() => {
        this.logout();
        return throwError(() => 'Failed to refresh token');
      })
    )
  }

  getUser() {
    let user = <IUser>JSON.parse(<string>localStorage.getItem('user'));
    if (!user)
      this.logout();
    return user;
  }

}