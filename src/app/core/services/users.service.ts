import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { Observable } from 'rxjs';
import { environment } from '@src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrlGetUsers = `${environment.apiBaseUrl}/admin/User/GetUsers`;
  private apiUrlGetByUsername = `${environment.apiBaseUrl}/admin/User/GetByUsername`;
  private apiUrlAddUserAsync = `${environment.apiBaseUrl}/admin/User/AddUserAsync`;
  private apiUrlUpdateUserAsync = `${environment.apiBaseUrl}/admin/User/UpdateUserAsync`;
  private apiUrlDeleteUserAsync = `${environment.apiBaseUrl}/admin/User/DeleteUserAsync`;

/*
  private apiUrlGetUsers = `/admin/User/GetUsers`;
  private apiUrlGetByUsername = `/admin//User/GetByUsername`;
  private apiUrlAddUserAsync = `/admin//User/AddUserAsync`;
  private apiUrlUpdateUserAsync = `/admin//User/UpdateUserAsync`;
  private apiUrlDeleteUserAsync = `/admin//User/DeleteUserAsync`;
  */
  constructor(private http: HttpClient) {}
  getGetUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiUrlGetUsers);
  } 
  getUsersByUsername(phongbanid: string): Observable<Users[]> {
    //console.warn('Url get by username ',this.apiUrlGetByUsername);
    return this.http.get<Users[]>(`${this.apiUrlGetByUsername}/${phongbanid}`);
  } 

  AddUserAsync(users: Users): Observable<Users> {
    //console.warn('API Menu sau khi gọi getChucnangs',this.apiUrlAddMenu,chucnang);
    return this.http.post<Users>(this.apiUrlAddUserAsync, users);
  }
  UpdateUserAsync(users: Users): Observable<Users> {
    //console.warn('API Menu sau khi gọi update',this.apiUrlUpdateChucnang,chucnang);
    //return this.http.put<Chucnang>(`${this.apiUrlUpdateChucnang}/${chucnang.id}`, chucnang);
    const url = `${this.apiUrlUpdateUserAsync}/${users.id}`;
    return this.http.put<Users>(url, users);
  }



  DeleteUserAsync(id: number): Observable<void> {
    //const url = `${this.apiUrlDeleteUserAsync}/${id}?id=${id}`;
    //console.log('🔗 URL API gọi:', url); // Debug kiểm tra URL
    return this.http.put<void>(`${this.apiUrlDeleteUserAsync}/${id}?id=${id}`, null);
  }
  
}
