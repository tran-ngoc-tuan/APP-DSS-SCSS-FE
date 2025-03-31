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
  ngOnInit() {
     // Kiểm tra xem có token không (người dùng đã đăng nhập chưa)
     if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      console.log('Token:', token);
    } else {
      console.warn('localStorage không thể sử dụng trên server!');
      this.router.navigate(['/login']);
    }
  }

  savePermissions(IDUser: number) {
    console.log('Hello Thứ 6', this.navigationItemsFromAdmin);
  }
}
