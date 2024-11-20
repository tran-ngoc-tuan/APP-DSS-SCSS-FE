import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';

 export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'analytics',
        pathMatch: 'full'        
      },
      {
        path: 'component',
        loadChildren: () => import('./page/ui-element/ui-basic.module').then((m) => m.UiBasicModule)
      },
      {
        path: 'chart',
        loadComponent: () => import('./page/chart-map/core-apex.component').then((m) => m.CoreApexComponent)
      },
      {
        path: 'forms',
        loadComponent: () => import('./page/forms-tables/form-elements/form-elements.component').then((m) => m.FormElementsComponent)
      },
      {
        path: 'tables',
        loadComponent: () => import('./page/forms-tables/tbl-bootstrap/tbl-bootstrap.component').then((m) => m.TblBootstrapComponent)
      },     
      { path: 'sample-page', 
        loadComponent: () => import('./page/sample-page/sample-page.component').then(m => m.SamplePageComponent)
      },
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
        { 
          path: 'auth/signin', 
          loadComponent: () => import('./page/authentication/sign-in/sign-in.component').then(m => m.SignInComponent)
        },  
        { 
          path: 'auth/signup', 
          loadComponent: () => import('./page/authentication/sign-up/sign-up.component').then(m => m.SignUpComponent)
        }   
      ]
    }
  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}