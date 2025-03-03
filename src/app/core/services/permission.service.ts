import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permission } from '../models/permission';
import { FunctionMenu } from '../models/menu.model';
import { environment } from '@src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {


  private apiUrlGetPermission = `${environment.apiBaseUrl}/admin/Permission`;
  private apiUrlGetMenuListByUserId_idPhanHe = `${environment.apiBaseUrl}/admin/Permission/GetMenuListByUserId_idPhanHe`;
  private apiUrlAddPermissionAsync = `${environment.apiBaseUrl}/admin/Permission/AddPermissionAsync`;
  private apiUrlDeletePermissionAsync = `${environment.apiBaseUrl}/admin/Permission/DeletePermissionByidUseridPhanHeAsync`;



  /*
  private apiUrlGetPermission = `/admin/Permission`;
  private apiUrlGetMenuListByUserId_idPhanHe = `/admin//Permission/GetMenuListByUserId_idPhanHe`;
  private apiUrlAddPermissionAsync = `/admin/Permission/AddPermissionAsync`;
  private apiUrlDeletePermissionAsync = `/admin/Permission/DeletePermissionByidUseridPhanHeAsync`;
*/

  constructor(private http: HttpClient) {}
  
  getPermissionByidnhanvien(idnhanvien: string): Observable<FunctionMenu[]> {
    //console.warn('API Menu sau khi gọi Load User',this.apiUrlGetPermission);
    return this.http.get<FunctionMenu[]>(`${this.apiUrlGetPermission}/${idnhanvien}`);
  }

  getGetMenuListByUserId_idPhanHe(idUser: number, idPhanHe: string): Observable<Permission[]> {
    //console.warn('Hello API get DS quyền', this.apiUrlGetMenuListByUserId_idPhanHe);
    return this.http.get<Permission[]>(`${this.apiUrlGetMenuListByUserId_idPhanHe}/${idUser}/${idPhanHe}`, { observe: 'body' });
  }




  addPermission(idUser: number, idMenu: number): Observable<void> {
    const url = `${this.apiUrlAddPermissionAsync}/${idUser}/${idMenu}`;  
    console.log('URL:', url);
    return this.http.post<void>(url, {}); // Gửi body rỗng`
  }
  
  deletePermission(idUser: number, idPhanHe: string): Observable<void> {
    const url = `${this.apiUrlDeletePermissionAsync}/${idUser}/${idPhanHe}`;  
    console.log('Xóa URL:', url);
    return this.http.delete<void>(url, {}); // Gửi body rỗng
  }
}

// Trường hợp cần truyền dưới dạng From body phương thức put, post
/*
deleteChucNang_FromBody(id: number): Observable<void> {

  const url = `${this.apiUrlDeleteChucnang}`;
  //console.log('API Menu sau khi gọi delete',this.apiUrlDeleteChucnang,id);
  const body = {  id: 11, title: 'Trần Ngọc Tuấn', type: 'group', icon: 'icon', hidden: true}
  return this.http.put<void>(url,body);
}
//return this.http.post<Chucnang>(this.apiUrlAddChucnang, chucnang);
// addChucNangs(chucnang: Chucnang): Observable<Chucnang> {
  */