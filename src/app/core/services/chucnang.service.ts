import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chucnang } from '../models/chucnang';
import { Observable } from 'rxjs';
import { environment } from '@src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ChucnangService {
  //private apiUrl = `${environment.apiBaseUrl}/api/Menu/AddMenu`; Nếu là proxy khác thì phải khai báo như vậy
  //private apiUrlAddMenu = `${environment.apiBaseUrl}/admin/Menu/AddMenu`; 
  
  private apiUrlGetChucnang = `${environment.apiBaseUrl}/admin/Menu/GetMenus`;
  private apiUrlAddChucnang = `${environment.apiBaseUrl}/admin/Menu/AddMenu`;  
  private apiUrlUpdateChucnang = `${environment.apiBaseUrl}/admin/Menu/UpdateMenu`;  
  private apiUrlDeleteChucnang = `${environment.apiBaseUrl}/admin/Menu/DeleteMenu`;  

  /*
  private apiUrlGetChucnang = `/admin/Menu/GetMenus`;
  private apiUrlAddChucnang = `/admin/Menu/AddMenu`;  
  private apiUrlUpdateChucnang = `/admin/Menu/UpdateMenu`;  
  private apiUrlDeleteChucnang = `/admin/Menu/DeleteMenu`;  */
  //private apiUrlDeleteChucnang = `/admin/Menu`;  

  constructor(private http: HttpClient) {}
  
  getChucNangs(): Observable<Chucnang[]> {
    return this.http.get<Chucnang[]>(this.apiUrlGetChucnang);
  } 
  addChucNangs(chucnang: Chucnang): Observable<Chucnang> {
    //console.warn('API Menu sau khi gọi getChucnangs',this.apiUrlAddMenu,chucnang);
    return this.http.post<Chucnang>(this.apiUrlAddChucnang, chucnang);
  }
  updateChucNangs(chucnang: Chucnang): Observable<Chucnang> {
    //console.warn('API Menu sau khi gọi update',this.apiUrlUpdateChucnang,chucnang);
    //return this.http.put<Chucnang>(`${this.apiUrlUpdateChucnang}/${chucnang.id}`, chucnang);
    return this.http.put<Chucnang>(this.apiUrlUpdateChucnang, chucnang);
  }
  deleteChucNangs(id: number): Observable<void> {

    const url = `${this.apiUrlDeleteChucnang}?id=${id}`;
    console.log('API Menu sau khi gọi delete',this.apiUrlDeleteChucnang,id);
    return this.http.put<void>(url,null);
  }

// Trường hợp cần truyền dưới dạng From body phương thức put, post
  deleteChucNang_FromBody(id: number): Observable<void> {

    const url = `${this.apiUrlDeleteChucnang}`;
    //console.log('API Menu sau khi gọi delete',this.apiUrlDeleteChucnang,id);
    const body = {  id: 11, title: 'Trần Ngọc Tuấn', type: 'group', icon: 'icon', hidden: true}
    return this.http.put<void>(url,body);
  }
}
