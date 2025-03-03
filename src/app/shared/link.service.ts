import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root', // Service sẽ được dùng toàn ứng dụng
})
export class LinkService {

  constructor() { }
  private linkSubject = new BehaviorSubject<string | null>(null); // Giá trị mặc định là null

  // Observable cho phép các component subscribe để nhận giá trị
  currentLink$ = this.linkSubject.asObservable();

  // Phương thức để cập nhật giá trị
  updateLink(link: string): void {
    this.linkSubject.next(link);
  }
}
