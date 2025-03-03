import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { AuthInterceptor } from './app/core/interceptors/auth.interceptor';


//const bootstrap = () => bootstrapApplication(AppComponent, config);
/*
const bootstrap = () => bootstrapApplication(AppComponent, {
    ...config,
    providers: [
      ...(config.providers || []),
      provideHttpClient(withFetch())  // Cung cấp HttpClient cho toàn bộ ứng dụng
    ]
  });
  */

  const bootstrap = () => bootstrapApplication(AppComponent, {
    ...config,
    providers: [
      ...(config.providers || []),
      provideHttpClient(withFetch()),
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ]
  });
export default bootstrap;
