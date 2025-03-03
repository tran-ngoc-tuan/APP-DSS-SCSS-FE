import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (this.authService.isLoggedIn()) {
      // Kiểm tra quyền truy cập (nếu cần)
      const requiredPermission = route.data['permission'];
      if (!requiredPermission || this.authService.hasPermission(requiredPermission)) {
        return true; // Truy cập được cho phép
      }

      // Nếu không có quyền, chuyển hướng đến trang không được phép
      this.router.navigate(['/unauthorized']);
      return false;
    }

    // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}