import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Chucnang } from '@src/app/core/models/chucnang';
import { ChucnangService } from '@src/app/core/services/chucnang.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MenuService } from '@src/app/core/services/menu.service';
import { SoftwareMenu } from '@src/app/core/models/menu.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quantri-thaotacmenu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quantri-thaotacmenu.component.html',
  styleUrl: './quantri-thaotacmenu.component.scss'
})
export class QuantriThaotacmenuComponent {
  chucnang: Chucnang[] = [];
  menuPhanHe: SoftwareMenu[] = [];
  icons: string[] = [];
  isEditMode: boolean = false;// Nếu false hiển thị form thêm mới ngược lại true thì hiển thị form sửa,
  modalTitle: string = '';
  page: number = 1; // Trang hiện tại
  pageSize: number = 14; // Số dòng mỗi trang
  // Đối tượng mặc định
  public defaultChucnang: Chucnang = {
    id: 0,
    title: "",
    type: "",
    icon: "",
    hidden: false,
    url: "",
    classes: "",
    externals: false,
    target: false,
    breadcrumbs: false,
    badgeTitle: "",
    badgeType: "",
    parentId: 0,
    isDelete: false,
    nguoiCapNhat: "",
    ngayCapNhat: new Date(),
    phanHeID: ""
  };

  public newchucnang: Chucnang = {
    id: 0,
    title: "",
    type: "",
    icon: "",
    hidden: false,
    url: "",
    classes: "",
    externals: false,
    target: false,
    breadcrumbs: false,
    badgeTitle: "",
    badgeType: "",
    parentId: 0,
    isDelete: false,
    nguoiCapNhat: "",
    ngayCapNhat: new Date(), // Định dạng ngày chuẩn
    phanHeID: ""
  };

  constructor(
    private http: HttpClient,
    private chucnangService: ChucnangService,
    private modalService: NgbModal, 
    private menuphanheService : MenuService, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
    ) {}
    get paginatedChucNang() {
      const startIndex = (this.page - 1) * this.pageSize;
      return this.chucnang.slice(startIndex, startIndex + this.pageSize);
    }
  
    nextPage() {
      if ((this.page * this.pageSize) < this.chucnang.length) {
        this.page++;
      }
    }
  
    prevPage() {
      if (this.page > 1) {
        this.page--;
      }
    }

    totalPages(): number {
      return Math.ceil(this.chucnang.length / this.pageSize);
    }
    // Hàm lấy danh sách dữ liệu theo trang
    getPagedData(): any[] {
      const start = (this.page - 1) * this.pageSize;
      return this.chucnang.slice(start, start + this.pageSize);
    }
    ngOnInit() {
      // Kiểm tra xem có token không (người dùng đã đăng nhập chưa)
      if (isPlatformBrowser(this.platformId)) {
        const token = localStorage.getItem('authToken');
        console.log('Token:', token);
        this.loadChucnangs()
      } else {
        console.warn('localStorage không thể sử dụng trên server!');
        this.router.navigate(['/login']);
      }
      this.fetchBootstrapIcons();
    }

// Mở modal để Thêm mới
openAddChucnangnModal(content: any): void {
    this.isEditMode = false; // Đặt thành false để biết đây là Thêm mới
    this.modalTitle = 'Thêm mới chức năng (Menu)';
    this.newchucnang = { 
                        id: 0,
                        title: "",
                        type: "",
                        icon: "",
                        hidden: false,
                        url: "",
                        classes: "",
                        externals: false,
                        target: false,
                        breadcrumbs: false,
                        badgeTitle: "",
                        badgeType: "",
                        parentId: 0,
                        isDelete: false,
                        nguoiCapNhat: "",
                        ngayCapNhat: new Date(), // Định dạng ngày chuẩn
                        phanHeID: ""
                      }; // Reset dữ liệu
    //this.modalService.open(content, { size: 'lg', backdrop: 'static' });
    this.modalService.open(content);
    this.loadmenuphanhe();
  }
  // Mở modal để Chỉnh sửa
openEditChucnangModal(content: any, chucnang: Chucnang) {
  //console.log('Sửa');
  this.isEditMode = true; // Đặt thành true để biết đây là Sửa
  this.modalTitle = 'Chỉnh sửa chức năng (Menu)';
  this.newchucnang = { ...this.defaultChucnang, ...chucnang  }; // Sao chép dữ liệu từ dòng được chọn
  console.log('Dữ liệu sau khi sao chép vào newchucnang:', this.newchucnang);
  this.modalService.open(content);
  this.loadmenuphanhe();
}
// Lấy danh sách các icon từ file CSS
  fetchBootstrapIcons(): void {
    this.http.get('assets/vendor/bootstrap-icons/bootstrap-icons.css', { responseType: 'text' })
      .subscribe({
        next: (css: string) => {
          const regex = /\.bi-([a-z0-9-]+)/g;
          const matches = css.match(regex);  
          if (matches) {
            this.icons = Array.from(new Set(matches.map(match => match.replace('.bi-', '').trim())));
          } else {
            console.warn("Không tìm thấy icon nào trong file CSS.");
          }
        },
        error: (error) => console.error("Lỗi tải danh sách icon:", error)
      });
  }
// Lấy danh sách chức năng
  loadChucnangs(): void {   
    this.chucnangService.getChucNangs().subscribe(data => {
      this.chucnang = data;
    });
  }
// Thêm mới chức năng
  addChucnangs(chucnang: Chucnang): void {
   //console.log('Dữ liệu gửi lên API:', JSON.stringify(this.newchucnang));
   //console.log('Dữ liệu icon:', this.newchucnang.icon,this.newchucnang.phanHeID,this.newchucnang.title,this.newchucnang.type);
    // Kiểm tra xem các giá trị đã được nhập chưa
  if (!this.newchucnang.phanHeID || !this.newchucnang.title || !this.newchucnang.type || !this.newchucnang.url) {
    console.error("Vui lòng nhập đầy đủ thông tin!");
    return;
  }
    this.chucnangService.addChucNangs(chucnang).subscribe({      
      next: () => this.loadChucnangs(),
      error: (err) => console.error("Lỗi API:", err.error)
    });
  }
// Sửa chức năng
  editChucnangs(): void {
    //console.log('Dữ liệu trước khi gửi API:', this.newchucnang);
    if (!this.newchucnang || !this.newchucnang.id) {
      console.error('Lỗi: Dữ liệu không hợp lệ hoặc thiếu ID.');
      return;
    }  
    this.chucnangService.updateChucNangs(this.newchucnang).subscribe({
      next: () => {
        console.log('Cập nhật thành công!');
        this.loadChucnangs(); // Load lại danh sách sau khi cập nhật
      },
      error: (err) => {
        console.error('Lỗi API khi cập nhật:', err);
        console.log('Dữ liệu gửi lên API:', this.newchucnang);
      }
    });
  }
  // Thêm mới hoặc sửa chức năng khi người dùng nhấn lưu
  addeditChucnangs(): void {

    if (!this.isEditMode) {
      this.addChucnangs(this.newchucnang)  // Thêm mới
    } else {
      //console.log('Sửa', this.newchucnang);
      this.editChucnangs();  // Sửa
    }
   }
// Xóa chức năng
  deleteChucnangs(chucnang: Chucnang): void {
    console.log('Dữ liệu trước khi gửi API:', chucnang.id);
    if (!this.chucnang || !chucnang.id) {
      console.error('Lỗi: Dữ liệu không hợp lệ hoặc thiếu ID.');
      return;
    }  
    this.chucnangService.deleteChucNangs(chucnang.id).subscribe({
      next: () => {
        console.log('Cập nhật thành công!');
        this.loadChucnangs(); // Load lại danh sách sau khi cập nhật
      },
      error: (err) => {
        console.error('Lỗi API khi cập nhật:', err);
        console.log('Dữ liệu gửi lên API:', this.chucnang);
      }
    });
  }
// Load menu phân hệ
  loadmenuphanhe(): void {   
    console.log('Load menu phân hệ  28022025');
    this.menuphanheService.getAllPhanHes().subscribe(data => {
      this.menuPhanHe = data;
    });
  }
}