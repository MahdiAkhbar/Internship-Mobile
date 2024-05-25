import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, switchMap, throwError } from 'rxjs';
import { ILogin } from '../interfaces/loginform.interface';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private route: ActivatedRoute,
    @Inject('API_URL') private apiUrl: string
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.authService.getToken();

    if (!token)
      return next.handle(req);

    const haveAuth = req.headers.get('Authorization');
    if (haveAuth)
      return next.handle(req);

    const newReq = this.addTokenHeader(req, token);
    return next.handle(newReq).pipe(
      catchError((err: HttpErrorResponse) => {
        let error401 = err.status === 401;
        let refToken = this.authService.getRefreshToken();
        // let urlBlackList = ['login', 'signup'];
        // let isWhitList = !urlBlackList.find(item => req.url.match(item));
        let isWhitList = !this.route.snapshot.routeConfig?.path?.includes('login');
        if (error401 && refToken && isWhitList) {
          return this.handle401Error(req, next);
        }
        return throwError(() => err);
      })
    )

  }

  addTokenHeader(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: {
        Authorization: token
      }
    });
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.refreshToken().pipe(
      switchMap(() => {
        const newToken = this.authService.getToken();
        if (newToken) {
          req = this.addTokenHeader(req, newToken);
          return next.handle(req);
        } else {
          this.authService.logout();
          return throwError(() => 'Failed to refresh token');
        }
      })
    )
  }

}
