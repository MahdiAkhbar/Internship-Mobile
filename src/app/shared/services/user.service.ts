import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { AuthService } from './auth.service';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    @Inject('API_URL') private apiUrl: string
  ) { }

  getUserProfile(username: string) {
    return this.http.get<IUser>(this.apiUrl + '/user/' + username, { observe: 'response' }).pipe(
      tap(res => {
        this.setUser(<IUser>res.body);
      })
    );
  }

  setUser(userObj: IUser) {
    localStorage.setItem('user', JSON.stringify(userObj));
  }

  getUser() {
    let user = <IUser>JSON.parse(<string>localStorage.getItem('user'));
    if (!user)
      this.authService.logout();
    return user;
  }

}
