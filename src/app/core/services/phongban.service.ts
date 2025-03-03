import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PhongBan } from '../models/phongban';
import { Observable } from 'rxjs';
import { environment } from '@src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PhongbanService {

  //private apiUrlGetPhongBan = `/admin/DMDungChung/GetPhongBan`;

  private apiUrlGetPhongBan = `${environment.apiBaseUrl}/admin/DMDungChung/GetPhongBan`;
  constructor(private http: HttpClient) {}
  
  getPhongBans(): Observable<PhongBan[]> {
    return this.http.get<PhongBan[]>(this.apiUrlGetPhongBan);
  } 
}
