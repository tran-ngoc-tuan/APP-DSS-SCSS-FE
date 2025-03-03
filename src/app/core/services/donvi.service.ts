import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Donvi } from '../models/donvi';
import { Observable } from 'rxjs';
import { environment } from '@src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DonviService {
  
  private apiUrlGetDonVi = `${environment.apiBaseUrl}/admin/DMDungChung/GetDMDonVi`;

  //private apiUrlGetDonVi = `/admin/DMDungChung/GetDMDonVi`;
  constructor(private http: HttpClient) {}
  
  getDonVis(): Observable<Donvi[]> {
    return this.http.get<Donvi[]>(this.apiUrlGetDonVi);
  } 
}
