import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);

  const isAuthenticated = checkAuthentication();

  console.log('AuthGuard - isAuthenticated:', isAuthenticated);
  console.log('Requested URL:', state.url);


  if (!isAuthenticated) {
    // Điều hướng về trang login nếu chưa xác thực
    console.warn('Người dùng chưa xác thực. Chuyển hướng về SignIn.');
    router.navigate(['/auth/signin']);
    //router.navigate(['/Home/sample-page']);
    return false;
  }

  return true;
};
function checkAuthentication(): boolean {
  // Logic kiểm tra trạng thái xác thực (ví dụ: token trong localStorage)
  //if (typeof window !== 'undefined' && window.localStorage) {
    //const token = localStorage.getItem('authToken');
    //return !!token; // Trả về true nếu token tồn tại
  //}
  //return false; // Mặc định không xác thực nếu không có localStorage
  return true; // Xác thực nếu  có localStorage
}