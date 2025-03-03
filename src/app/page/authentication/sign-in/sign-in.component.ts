import { Component } from '@angular/core';
import { SharedModule } from '../../../theme/shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { LinkService } from '@src/app/shared/link.service';
import { AuthService } from '@src/app/core/services/auth.service';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export  class SignInComponent {
  public  username: string = ''////'tuantn3';
  public  password: string = ''//'NgocTu@n@1979022024~!!@@##';
  public  errorMessage: string = '';
  constructor(
    private router: Router,
    private linkService: LinkService,
    private authService: AuthService,
    ) {}
/**
   * Hàm thực hiện đăng nhập:
   * - Gọi API đăng nhập qua AuthService.
   * - Nếu đăng nhập thành công, lưu token và chuyển hướng đến trang chủ.
   * - Nếu đăng nhập thất bại, hiển thị thông báo lỗi.
   */
  /*


*/

onLogin() {
  // Kiểm tra dữ liệu nhập trước (tùy chọn)
  if (!this.username || !this.password) {
    this.errorMessage = 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.';
    return;
  }
  this.authService.login({ username: this.username, password: this.password })
  .subscribe({
      next: async (response) => {
        console.log('Response từ API:', response);
        // Kiểm tra xem token có tồn tại trong response không
        if (response && response.jwtToken) {
          // Lưu token vào LocalStorage
          localStorage.setItem('authToken', response.jwtToken);
          //console.log('Token được lưu:', localStorage.getItem('authToken'));
           // Chuyển hướng đến trang chủ IntroPage sau khi đăng nhập thành công
          const success = await this.router.navigate(['/intro-page']);
          if (success) {
            console.log('Chuyển hướng thành công đến IntroPage!-URL hiện tại:', this.router.routerState.snapshot.url);
          } else {
            console.error('Chuyển hướng không thành công!');
          }
        }
        else {
          console.error('Không tìm thấy token trong response!');
          this.errorMessage = 'Không tìm thấy token trong response từ API';
        }
       
      },
      error: (err) => {
         // Kiểm tra nếu lỗi có status 401 (Unauthorized) thì hiển thị thông báo cụ thể
         if (err.status === 401||err.status === 400) {
          this.errorMessage = 'Tên đăng nhập hoặc mật khẩu không đúng.';
        } else {
          this.errorMessage = 'Đăng nhập thất bại. Vui lòng thử lại sau.';
        }
      }
    });
  }
  
  // Hàm xử lý khi nhấn nút SignIn tham khảo
  async onSignIn(linkText: string) {
    console.error('Đăng nhập click!');
    const isAuthenticated = true; // Giả lập đăng nhập thành công    
      if (isAuthenticated) {
        try {
          localStorage.setItem('authToken', 'your-auth-token'); // Thiết lập token trước điều hướng
          console.log('authToken được lưu:', localStorage.getItem('authToken'));
    
          // Chuyển hướng đến IntroPage
          const success = await this.router.navigate(['/intro-page']);
          if (success) {
            console.log('Chuyển hướng thành công đến IntroPage!');
            console.log('URL hiện tại:', this.router.routerState.snapshot.url);
          } else {
            console.error('Chuyển hướng không thành công!');
          }
        } catch (error) {
          console.error('Chuyển hướng thất bại:', error);
        }
      } else {
        console.error('Đăng nhập thất bại!');
      }
  }
  }