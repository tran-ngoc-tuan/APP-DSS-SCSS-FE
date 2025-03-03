import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Đường dẫn mặc định - chuyển hướng đến trang đăng nhập
  {
    path: '',
    redirectTo: 'auth/signin',
    pathMatch: 'full',
  },
  // Đường dẫn Auth (dành cho khách)
  {
    path: 'auth',
    component: GuestComponent,
    children: [
      {
        path: 'signin',
        loadComponent: () =>
          import('./page/authentication/sign-in/sign-in.component').then(
            (m) => m.SignInComponent
          ),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./page/authentication/sign-up/sign-up.component').then(
            (m) => m.SignUpComponent
          ),
      },
    ],
  },
  {
    path: 'intro-page',
    loadComponent: () =>
      import('./page/intro-page/intro-page.component').then(
        (m) => m.IntroPageComponent
      ),
      canActivate: [authGuard], // Thêm AuthGuard để bảo vệ route
  },
  // Đường dẫn Admin (sau khi đăng nhập)
  {
    path: 'home',
    component: AdminComponent,
    canActivateChild: [authGuard], // Áp dụng AuthGuard
    children: [
      {
        path: '',
        redirectTo: 'analytics',
        pathMatch: 'full',
      },
      {
        path: 'component',
        loadChildren: () => import('./page/ui-element/ui-basic.module').then((m) => m.UiBasicModule)
      },
      {
        path: 'sample-page',
        loadComponent: () =>
          import('./page/sample-page/sample-page.component').then(
            (m) => m.SamplePageComponent
          ),
      },
      {
        path: 'forms',
        loadComponent: () =>
          import('./page/forms-tables/form-elements/form-elements.component').then(
            (m) => m.FormElementsComponent
          ),
      },
      {
        path: 'tables',
        loadComponent: () =>
          import('./page/forms-tables/tbl-bootstrap/tbl-bootstrap.component').then(
            (m) => m.TblBootstrapComponent
          ),
      },
      {
        path: 'ui-vtcntt',
        loadChildren: () => 
        import('./page/ui-vtcntt/ui-vtcntt-routing.module').then(
          (m) => m.UiVTCNTTRoutingModule)
      }
      // Các route khác
    ],
  },
    // Xử lý đường dẫn không tồn tại
    {
      path: '**',
      redirectTo: 'auth/signin',
    },
];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}