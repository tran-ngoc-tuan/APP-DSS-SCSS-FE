import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Địa chỉ API chính (thay đổi URL này theo dự án của bạn)
  private API_URL = 'https://ebill.khpc.vn:7777';

  constructor(private http: HttpClient) {}

   // Overload signature: khi observe là 'body' thì trả về Observable<T>
   get<T>(endpoint: string, options?: { observe: 'body'; [key: string]: any }): Observable<T>;
   // Overload signature: khi observe là 'events' thì trả về Observable<HttpEvent<T>>
   get<T>(endpoint: string, options: { observe: 'events'; [key: string]: any }): Observable<HttpEvent<T>>;
   // Implementation: nếu không có observe hoặc observe không được chỉ định, mặc định là 'body'
   get<T>(endpoint: string, options: any = {}): Observable<any> {
     if (!options.observe) {
       options.observe = 'body';
     }
     return this.http.get<T>(`${this.API_URL}/${endpoint}`, options);
   }
   // --- POST method ---
  // Khi observe là 'body'
  post<T>(endpoint: string, data: any, options?: { observe: 'body'; [key: string]: any }): Observable<T>;
  // Khi observe là 'events'
  post<T>(endpoint: string, data: any, options: { observe: 'events'; [key: string]: any }): Observable<HttpEvent<T>>;
  // Implementation: mặc định observe là 'body'
  post<T>(endpoint: string, data: any, options: any = {}): Observable<any> {
    if (!options.observe) {
      options.observe = 'body';
    }
    return this.http.post<T>(`${this.API_URL}/${endpoint}`, data, options);
  }

  // --- PUT method ---
  // Khi observe là 'body'
  put<T>(endpoint: string, data: any, options?: { observe: 'body'; [key: string]: any }): Observable<T>;
  // Khi observe là 'events'
  put<T>(endpoint: string, data: any, options: { observe: 'events'; [key: string]: any }): Observable<HttpEvent<T>>;
  // Implementation: mặc định observe là 'body'
  put<T>(endpoint: string, data: any, options: any = {}): Observable<any> {
    if (!options.observe) {
      options.observe = 'body';
    }
    return this.http.put<T>(`${this.API_URL}/${endpoint}`, data, options);
  }

  // --- DELETE method ---
  // Khi observe là 'body'
  delete<T>(endpoint: string, options?: { observe: 'body'; [key: string]: any }): Observable<T>;
  // Khi observe là 'events'
  delete<T>(endpoint: string, options: { observe: 'events'; [key: string]: any }): Observable<HttpEvent<T>>;
  // Implementation: mặc định observe là 'body'
  delete<T>(endpoint: string, options: any = {}): Observable<any> {
    if (!options.observe) {
      options.observe = 'body';
    }
    return this.http.delete<T>(`${this.API_URL}/${endpoint}`, options);
  }
}