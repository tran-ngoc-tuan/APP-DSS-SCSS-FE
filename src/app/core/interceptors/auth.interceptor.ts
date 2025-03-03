import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private authService: AuthService) {
    console.log('AuthInterceptor instantiated ABC ABC ABC ABC ');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log('AuthInterceptor: Intercepting request');
    let token: string | null = null;
    // Chỉ truy cập localStorage nếu đang chạy trên trình duyệt
    if (isPlatformBrowser(this.platformId)) {
      token = this.authService.getToken()
      //console.log('Giá trị toke lấy ra',token);
    }
    let modifiedReq = req;
    if (token) {
      modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    //console.log('AuthInterceptor: Outgoing URL:', modifiedReq.url);
    //console.log('AuthInterceptor: Authorization header:', modifiedReq.headers.get('Authorization'));
    return next.handle(modifiedReq);
  }
}