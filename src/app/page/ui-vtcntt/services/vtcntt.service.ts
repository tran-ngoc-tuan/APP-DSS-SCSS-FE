import { Injectable } from '@angular/core';
import { ApiService } from '@src/app/core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VtcnttService {

  constructor(private api: ApiService) { }
   // Lấy danh sách trường học
   getSchools(): Observable<any> {
    return this.api.get('education/schools');
  }

  // Thêm trường học mới
  addSchool(data: any): Observable<any> {
    return this.api.post('education/schools', data);
  }
}
