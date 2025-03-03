import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Chucnang } from '@src/app/core/models/chucnang';
import { DomainMenu, FunctionMenu, SoftwareMenu } from '@src/app/core/models/menu.model';
import { MenuService } from '@src/app/core/services/menu.service';
import { RecursiveMenuItemComponent } from "../recursive-menu-item/recursive-menu-item.component";
import { Donvi } from '@src/app/core/models/donvi';
import { PhongBan } from '@src/app/core/models/phongban';
import { User } from '@src/app/core/models/user';
import { DonviService } from '@src/app/core/services/donvi.service';
import { PhongbanService } from '@src/app/core/services/phongban.service';
import { UserService } from '@src/app/core/services/user.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { PermissionService } from '@src/app/core/services/permission.service';
import { Permission } from '@src/app/core/models/permission';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-quantri-phanquyenmenu',
  standalone: true,
  imports: [CommonModule, FormsModule, RecursiveMenuItemComponent,NgSelectModule],
  templateUrl: './quantri-phanquyenmenu.component.html',
  styleUrl: './quantri-phanquyenmenu.component.scss'
})


export class QuantriPhanquyenmenuComponent {
  //public functionMenus: FunctionMenu[] = [];

  public functionMenus: FunctionMenu[] = [];// Danh sách chức năng (Menu)
  public domainMenus: DomainMenu[] = [];// Danh sách lĩnh vực
  public softwareMenus: SoftwareMenu[] = [];// Danh sách phần mềm
  public donvi: Donvi[] = [];// Danh sách đơn vị
  public phongban: PhongBan[] = [];
  public user: User[] = [];
  public errorMessage: string = '';
  public chucnang: Chucnang[] = [];
  form: FormGroup;
  public selectedLinhVucId: string | null = null; // Hoặc giá trị mặc định khác
  public selectedPhanMemId : string | null = null; // Hoặc giá trị mặc định khác

  public selectedDonViId: string | null = null; // Hoặc giá trị mặc định khác
  public selectedPhongBanId: string | null = null; // Hoặc giá trị mặc định khác
  public selectedUserId: string | null = null; // Hoặc giá trị mặc định khác
  public navigationItemsFromAdmin: FunctionMenu[] = []; // Khởi tạo mảng rỗng

  private selectedNoteItems: Permission[] = [];
  constructor(
    private fb: FormBuilder, 
    private router: Router,  
    private http: HttpClient, 
    private menuService: MenuService,
    private donviService: DonviService,
    private phongbanService: PhongbanService,
    private userService: UserService,
    private permissionService: PermissionService,
    @Inject(PLATFORM_ID) private platformId: object
    ) {
    this.form = this.fb.group({
      userId: [''],
      permissions: [[]]
    });
  }
  // Load danh sách Đon vị
  loadDonVis(): void {
    this.donviService.getDonVis().subscribe({
      next: (menus) => {
        this.donvi = menus;
        console.log('Don Vị', this.donviService);
      },
      error: (err) => {
        console.error('Error loading Don Vị:', err);
        console.error('Error status:', err.status);
        console.error('Error statusText:', err.statusText);
        console.error('Error message:', err.message);
        console.error('Error details:', JSON.stringify(err.error));
        this.errorMessage = 'Không thể tải danh sách menu. Vui lòng thử lại sau.';
      }
    });
  }
  /*
// Load danh sách người dùng khi đơn vị thay đổi
onDonViChange(selectedValue: string): void {
  console.log('Hello don vi chọn', selectedValue);
  this.selectedLinhVucId = selectedValue; // Cập nhật giá trị
  if (this.selectedLinhVucId) {
    this.loadSoftwareMenus(this.selectedLinhVucId);
  } else {
    this.softwareMenus = []; // Nếu không có lĩnh vực, reset danh sách phần mềm
  }
  this.selectedPhanMemId = ''; // Reset phần mềm khi lĩnh vực thay đổi
}
*/



  // Load danh sácch phòng ban
  loadPhongBans(): void {
    this.phongbanService.getPhongBans().subscribe({
      next: (menus) => {
        this.phongban = menus;
        console.log('Phòng ban', this.phongbanService);
      },
      error: (err) => {
        console.error('Error loading Phòng ban:', err);
        console.error('Error status:', err.status);
        console.error('Error statusText:', err.statusText);
        console.error('Error message:', err.message);
        console.error('Error details:', JSON.stringify(err.error));
        this.errorMessage = 'Không thể tải danh sách menu. Vui lòng thử lại sau.';
      }
    });
  }
 // Load danh sách người dùng khi đơn vị thay đổi
 onPhongBanChange(selectedValue: string): void {
  //console.log('Hello phongban chọn', selectedValue);
  this.selectedPhongBanId = selectedValue; // Cập nhật giá trị
  if (this.selectedPhongBanId) {
    this.loadUsers(selectedValue);
  } else {
    this.phongban = []; // Nếu không có lĩnh vực, reset danh sách phần mềm
  }
  this.selectedPhongBanId = ''; // Reset phần mềm khi lĩnh vực thay đổi
}

  

   // Load danh sácch người dùng
   loadUsers(selectedPhongBanId: string): void {
    console.log('Xin chào các bạn:', selectedPhongBanId);
    this.userService.getUsersByPhongBan(selectedPhongBanId).subscribe({
      next: (menus) => {
        this.user = menus;
        console.log('User', this.userService);
      },
      error: (err) => {
        console.error('Error loading người dùng:', err);
        console.error('Error status:', err.status);
        console.error('Error statusText:', err.statusText);
        console.error('Error message:', err.message);
        console.error('Error details:', JSON.stringify(err.error));
        this.errorMessage = 'Không thể tải danh sách menu. Vui lòng thử lại sau.';
      }
    });
  }
// Load danh sách lĩnh vực
  loadDomainMenus(): void {
    this.menuService.getDomainMenus().subscribe({
      next: (menus) => {
        this.domainMenus = menus;
        console.log('Domain menus ', this.domainMenus);
      },
      error: (err) => {
        console.error('Error loading domain menus:', err);
        console.error('Error status:', err.status);
        console.error('Error statusText:', err.statusText);
        console.error('Error message:', err.message);
        console.error('Error details:', JSON.stringify(err.error));
        this.errorMessage = 'Không thể tải danh sách menu. Vui lòng thử lại sau.';
      }
    });
  }

  // Load danh sách phần mềm khi lĩnh vực thay đổi
  onDomainChange(selectedValue: string): void {
    console.log('Hello lĩnh vực chọn', selectedValue);
    this.selectedLinhVucId = selectedValue; // Cập nhật giá trị
    if (this.selectedLinhVucId) {
      this.loadSoftwareMenus(this.selectedLinhVucId);
    } else {
      this.softwareMenus = []; // Nếu không có lĩnh vực, reset danh sách phần mềm
    }
    this.selectedPhanMemId = ''; // Reset phần mềm khi lĩnh vực thay đổi
  }

  // Load danh sách phần mềm
  loadSoftwareMenus(selectedLinhVucId: string): void {
    console.log('Selected LinhVucId đã chọn:', selectedLinhVucId);
    this.menuService.getSoftwareMenus(selectedLinhVucId).subscribe({
      next: (menus) => {
        this.softwareMenus = menus;
        console.log('Software menus:', this.softwareMenus);
      },
      error: (err) => {
        console.error('Error loading software menus:', err);
        this.errorMessage = 'Không thể tải Software Menu. Vui lòng thử lại sau.';
      }
    });
  }
// Load danh sách chức năng
  loadFunctMenus(): void {
    //console.log('Xin chào Menu',this.functionMenus);    
    this.menuService.getFunctionMenus().subscribe({
      next: (menus) => {
        this.functionMenus = menus;
        this.navigationItemsFromAdmin = this.functionMenus; // Cập nhật dữ liệu
      },
      error: (err) => {
        console.error('Error loading software menus:', err);
        this.errorMessage = 'Không thể tải Software Menu. Vui lòng thử lại sau.';
      }
    });
  }
  ngOnInit() {
     // Kiểm tra xem có token không (người dùng đã đăng nhập chưa)
     if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      console.log('Token:', token);
      //this.loadChucnangs()
      this.loadFunctMenus();
      this.loadDonVis();
      this.loadPhongBans();
      this.loadDomainMenus();
      //this.loadSoftwareMenus('CNTT');
      //this.loadUsers();
    } else {
      console.warn('localStorage không thể sử dụng trên server!');
      this.router.navigate(['/login']);
    }
  }


  
  selectedItems: any[] = []; // Mảng để lưu các node được chọn
  onSelect(item: any) {
    const index = this.selectedItems.indexOf(item);
    if (index === -1) {
      this.selectedItems.push(item); // Thêm vào nếu chưa chọn
    } else {
      this.selectedItems.splice(index, 1); // Xóa nếu đã chọn
    }
  }


  onMenuSelected(item: any) {
    const index = this.selectedNoteItems.indexOf(item);
    if (index === -1) {
      this.selectedNoteItems.push(item); // Thêm vào nếu chưa chọn
    } else {
      this.selectedNoteItems.splice(index, 1); // Xóa nếu đã chọn
    }
    console.log( 'Node khi chọn selectedNoteItems', this.selectedNoteItems)
  }
/*1.1.1
  getSelectedMenus(item: any, selectedMenus: any[] = []) {
    console.log('Hello Thứ 6 đã vào',item,selectedMenus);
    if (item.externals) {
      selectedMenus.push({ id: item.id, title: item.title });
    }
    if (item.children?.length) {
      item.children.forEach((child: any) => this.getSelectedMenus(child, selectedMenus));
    }
    return selectedMenus;
  }
*/
  getSelectedMenus(menuItems: FunctionMenu[]): FunctionMenu[] {
    let selectedMenus: FunctionMenu[] = [];
  
    menuItems.forEach(item => {
      if (item.externals) {
        selectedMenus.push(item);
      }
      if (item.children?.length) {
        selectedMenus = selectedMenus.concat(this.getSelectedMenus(item.children));
      }
    });
  
    return selectedMenus;
  }

  getSelectedMenuIDs(menuItems: FunctionMenu[]): number[] {
    return this.getSelectedMenus(menuItems).map(item => item.id);
  }

  savePermissions(IDUser: number) {
    console.log('Hello Thứ 6', this.navigationItemsFromAdmin);
  
    // Lấy danh sách các mục đã chọn
    const selectedIDs = this.getSelectedMenuIDs(this.navigationItemsFromAdmin);
    console.log('Hello Thứ 61', selectedIDs);
  
    // Xóa quyền trước khi thêm quyền mới
    this.permissionService.deletePermission(IDUser, 'CNTT').pipe(
      switchMap(() => {
        // Sau khi xóa xong, gửi tất cả quyền lên API trong 1 request duy nhất
        return forkJoin(selectedIDs.map(IDMenu => 
          this.permissionService.addPermission(IDUser, IDMenu)
        ));
      })
    ).subscribe({
      next: (res) => console.log('🔹 Đã thêm quyền:', res),
      error: (err) => console.error('❌ Lỗi khi thêm quyền:', err),
    });
  }
  

}
