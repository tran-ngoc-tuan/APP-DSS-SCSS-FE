import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
/*
  private apiUrlGetUserByPhongBan = `/admin/DMDungChung/GetAllNhanViensByPhongBanAsync`;
  private apiUrlGetNhanVienByEmailAsyn = `/admin//DMDungChung/GetNhanVienByEmailAsync`;
*/
  private apiUrlGetUserByPhongBan =  `${environment.apiBaseUrl}/admin/DMDungChung/GetAllNhanViensByPhongBanAsync`;
  private apiUrlGetNhanVienByEmailAsyn =  `${environment.apiBaseUrl}/admin//DMDungChung/GetNhanVienByEmailAsync`;
  constructor(private http: HttpClient) {}
  
  getUsersByPhongBan(phongbanid: string): Observable<User[]> {
    //console.warn('API Menu sau khi gọi Load User',this.apiUrlGetUserByPhongBan);
    return this.http.get<User[]>(`${this.apiUrlGetUserByPhongBan}/${phongbanid}`);
  } 
  getUsersByGetNhanVienByEmailAsync(eMail: string): Observable<User> {
    //console.warn('API Menu sau khi gọi Load User',this.apiUrlGetNhanVienByEmailAsyn);
    return this.http.get<User>(`${this.apiUrlGetNhanVienByEmailAsyn}/${eMail}`);
}

}
