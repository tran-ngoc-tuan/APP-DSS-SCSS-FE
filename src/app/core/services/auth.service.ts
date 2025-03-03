import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '@src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
     // Khóa dùng để lưu token trong LocalStorage
  private TOKEN_KEY = 'authToken';
  //${environment.apiBaseUrl}
   //private apiUrlAddMenu = `${environment.apiBaseUrl}/admin/Menu/AddMenu`;  
   //private apiUrlAddMenu = `${environment.apiBaseUrl}/admin`;  
   
  private authUrl = `${environment.apiBaseUrl}/admin`; ; // Thay bằng URL API của bạn
  //private authUrl = '/admin'; // Thay bằng URL API của bạn
   // Khóa dùng để lưu danh sách quyền của người dùng trong LocalStorage (dạng JSON string)
   private permissionsKey = 'userPermissions';

  constructor(private http: HttpClient,@Inject(PLATFORM_ID) private platformId: Object) { }

  // Lấy token chỉ khi đang chạy trong trình duyệt
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken');
    }
    return null;
  }


    // Lưu token vào localStorage
    //setToken(token: string) {
      //localStorage.setItem(this.TOKEN_KEY, token);
    //}
    
 /**
   * Xóa thông tin xác thực khi đăng xuất.
   */
 //logout(): void {
  //localStorage.removeItem(this.TOKEN_KEY);
  //localStorage.removeItem(this.permissionsKey);
//}

  /**
   * Kiểm tra xem người dùng đã đăng nhập hay chưa.
   * Phương pháp này đơn giản chỉ kiểm tra xem token có tồn tại không.
   * @returns {boolean} true nếu có token, false nếu không.
   */
  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('authToken');
    }
    return false;
  }
  /**
   * Kiểm tra xem người dùng có quyền cần thiết không.
   * Giả sử các quyền của người dùng được lưu dưới dạng mảng các chuỗi trong LocalStorage.
   * @param requiredPermission Quyền cần kiểm tra (ví dụ: 'VIEW_DASHBOARD').
   * @returns {boolean} true nếu người dùng có quyền, false nếu không.
   */
  hasPermission(requiredPermission: string): boolean {
    const permissions = localStorage.getItem(this.permissionsKey);
    if (permissions) {
      try {
        const permissionArray = JSON.parse(permissions) as string[];
        return permissionArray.includes(requiredPermission);
      } catch (error) {
        console.error('Lỗi khi parse userPermissions:', error);
        return false;
      }
    }
    return false;
  }

  /**
   * Lưu thông tin xác thực sau khi đăng nhập thành công.
   * @param token Token xác thực nhận từ API.
   * @param permissions Mảng các quyền của người dùng.
   */
  setAuthData(token: string, permissions: string[]): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.permissionsKey, JSON.stringify(permissions));
    }
  }

/**
   * Gửi yêu cầu đăng nhập với thông tin credentials.
   * @param credentials { email: string; password: string }
   * @returns Observable chứa token từ API.
   */
login(credentials: { username: string; password: string }): Observable<any> {
  // Kiểm tra xem credentials có hợp lệ không
    if (!credentials || !credentials.username || !credentials.password) {
      return throwError(() => new Error('Credentials are null or incomplete.'));
    }

    return this.http.post<any>(`${this.authUrl}/User/login`, credentials, { observe: 'body' })
    .pipe(
      map(response => {
        if (response === null) {
          throw new Error('API returned null.');
        }
        return response;
      }),
      catchError(error => {
        // Kiểm tra nếu có thuộc tính message trong error.error hoặc error.message
        const errorMessage = error.error?.message || error.message || JSON.stringify(error);
        console.error('Error in AuthService.login:', error);
        return throwError(() => new Error(errorMessage));
      })
    );
}
}
