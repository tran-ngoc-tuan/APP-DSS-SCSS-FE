import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomainMenu, FunctionMenu, SoftwareMenu } from '../models/menu.model';
import { Observable } from 'rxjs';
import { environment } from '@src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  // Đường dẫn API. Vì bạn đã cấu hình proxy, bạn dùng URL tương đối.
  // Giả sử các endpoint như sau:
  //private domainMenuEndpoint = `${environment.apiBaseUrl}/admin/DMDungChung/GetAllLinhVucByUsername`;     // Lấy tất cả Domain Menu
  private authUrl = `${environment.apiBaseUrl}/admin`;  // Thay bằng URL API của bạn

  //private domainMenuEndpoint = "/admin/DMDungChung/GetAllLinhVucByUsername";     // Lấy tất cả các lĩnh vực theo username
  //private softwareMenuEndpoint = '/admin/PhanHe/GetPhanHeByLinhVucID';     // Lấy tất cả các Phân hệ ứng với Linh Vuc ID
  //private functionMenuEndpoint = '/admin/Menu/GetMenusFormat';     // Lấy tất cả các chứng năng
  //private functionGetMenusByUserId_idPhanHet = '/admin/Menu/GetMenusByUserId_idPhanHe';     // Lấy các chứng năng ứng với user/phân hệ
  //private getAllPhanHe='admin/DMDungChung/GetAllPhanHe';// Lất tất cả các phân hệ

  private domainMenuEndpoint = `${environment.apiBaseUrl}/admin/DMDungChung/GetAllLinhVucByUsername`;     // Lấy tất cả các lĩnh vực theo username

  private softwareMenuEndpoint = `${environment.apiBaseUrl}/admin/PhanHe/GetPhanHeByLinhVucID`;     // Lấy tất cả các Phân hệ ứng với Linh Vuc ID
  private functionMenuEndpoint = `${environment.apiBaseUrl}/admin/Menu/GetMenusFormat`;     // Lấy tất cả các chứng năng
  private functionGetMenusByUserId_idPhanHet = `${environment.apiBaseUrl}/admin/Menu/GetMenusByUserId_idPhanHe`;     // Lấy các chứng năng ứng với user/phân hệ
  private getAllPhanHe=`${environment.apiBaseUrl}/admin/DMDungChung/GetAllPhanHe`;// Lất tất cả các phân hệ
  constructor(private http: HttpClient) {}

 //1. Lấy danh sách phân hệ
  getDomainMenus(): Observable<DomainMenu[]> {
    //console.warn('API Menu sau khi gọi getDomainMenus',this.domainMenuEndpoint);
    return this.http.get<DomainMenu[]>(this.domainMenuEndpoint, { observe: 'body' });
  }
  
//2. Lấy danh sách phần mềm ứng với phân hệ ID
  getSoftwareMenus(domainId: string): Observable<SoftwareMenu[]> {
    // Giả sử API nhận domainId qua query string
    //console.warn('API Menu sau khi gọi softwareMenuEndpoint',this.softwareMenuEndpoint,domainId);
    return this.http.get<SoftwareMenu[]>(`${this.softwareMenuEndpoint}?linhvuc=${domainId}`, { observe: 'body' });
  }

//3. Lấy  tất cả các chức năng
  getFunctionMenus(): Observable<FunctionMenu[]> {
    // Giả sử API nhận softwareId qua query string
    return this.http.get<FunctionMenu[]>(this.functionMenuEndpoint, { observe: 'body' });
  }

  //3.1. Lấy các chức năng ứng với user/phân hệ
  getFunctionMenusByUserId_idPhanHe(PhanHeId: string): Observable<FunctionMenu[]> {
    // Giả sử API nhận softwareId qua query string
    return this.http.get<FunctionMenu[]>(`${this.functionGetMenusByUserId_idPhanHet}?idPhanHe=${PhanHeId}`, { observe: 'body' });
  }


//4. Lấy danh sách các chức năng ứng với phần mềm ID
getFunctionMenussoftwareId(softwareId: string): Observable<FunctionMenu[]> {
  // Giả sử API nhận softwareId qua query string
  return this.http.get<FunctionMenu[]>(`${this.functionMenuEndpoint}?softwareId=${softwareId}`, { observe: 'body' });
}

//5. Lấy danh sách tất cả phân hệ
getAllPhanHes(): Observable<SoftwareMenu[]> {
  // Giả sử API nhận softwareId qua query string
  console.warn('API lấy tất cả các phân hệ 28022025',this.getAllPhanHe);
  return this.http.get<SoftwareMenu[]>(this.getAllPhanHe, { observe: 'body' });
}

/*
  getSoftwareMenuslinhvucID(domainId: string): Observable<SoftwareMenu[]> {
    // Giả sử API nhận domainId qua query string
    console.warn('API Menu sau khi gọi softwareMenuEndpoint',this.softwareMenuEndpoint,domainId);
    return this.http.get<SoftwareMenu[]>(`${this.softwareMenuEndpoint}?linhvuc=${domainId}`, { observe: 'body' });
  }
*/
  /**
   * Lấy danh sách Function Menu theo Software Menu ID- Danh sách các chức năng.
   * @param softwareId ID của Software Menu
   * @returns Observable chứa mảng FunctionMenu.
   */



  /*
  getFunctionMenus(softwareId: string): Observable<FunctionMenu[]> {
    // Giả sử API nhận softwareId qua query string
    return this.http.get<FunctionMenu[]>(`${this.functionMenuEndpoint}?softwareId=${softwareId}`, { observe: 'body' });
  }*/
}
