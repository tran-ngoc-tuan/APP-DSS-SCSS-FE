import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Chucnang } from '@src/app/core/models/chucnang';
import { Donvi } from '@src/app/core/models/donvi';
import { DomainMenu, FunctionMenu, SoftwareMenu } from '@src/app/core/models/menu.model';
import { Permission } from '@src/app/core/models/permission';
import { PhongBan } from '@src/app/core/models/phongban';
import { User } from '@src/app/core/models/user';
import { Users } from '@src/app/core/models/users';
import { DonviService } from '@src/app/core/services/donvi.service';
import { MenuService } from '@src/app/core/services/menu.service';
import { PermissionService } from '@src/app/core/services/permission.service';
import { PhongbanService } from '@src/app/core/services/phongban.service';
import { UserService } from '@src/app/core/services/user.service';
import { UsersService } from '@src/app/core/services/users.service';
import { forkJoin, switchMap } from 'rxjs';
import { RecursiveMenuItemComponent } from '../recursive-menu-item/recursive-menu-item.component';

@Component({
  selector: 'app-quantri-thongtinnguoidung',
  standalone: true,
  imports: [CommonModule, FormsModule,RecursiveMenuItemComponent,NgSelectModule],
  templateUrl: './quantri-thongtinnguoidung.component.html',
  styleUrl: './quantri-thongtinnguoidung.component.scss'
})
export class QuantriThongtinnguoidungComponent {

  @ViewChild('addPermissionModal') addPermissionModal: any; // Tham chiếu tới template modal
  
  public donvi: Donvi[] = [];// Danh sách đơn vị
  public phongban: PhongBan[] = [];
  public user: User[] = [];// Thông tin nhân viên
  public user_Selected?: User ;// Thông tin nhân viên
  public users: Users[] = [];// Thông tin người dùng
  public domainMenus: DomainMenu[] = [];// Danh sách lĩnh vực
  public softwareMenus: SoftwareMenu[] = [];// Danh sách phần mềm

  public functionMenus: FunctionMenu[] = [];// Danh sách chức năng (Menu)
  public chucnang: Chucnang[] = [];
  private selectedNoteItems : Permission[] = [];
  private selectedNoteItems_API: Permission[] = [];
  public navigationItemsFromAdmin: FunctionMenu[] = []; // Khởi tạo mảng rỗng
  
  private selectedUser: Number | null = null; // Biến lưu user được chọn
  private IDUser: Number=0; // Biến lưu IDUser để cấp quyền
  //private selectedPhanHeID: number | null = null; // Lưu ID phần mềm được chọn
  public errorMessage: string = '';

  public selectedPhanHeID: string | null = null; // Hoặc giá trị mặc định khác
  public selectedDonViId: string | null = null; // Hoặc giá trị mặc định khác
  public selectedPhongBanId: string | null = null; // Hoặc giá trị mặc định khác
  public selectedUserId: string | null = null; // Hoặc giá trị mặc định khác

  public selectedLinhVucId: string | null = null; // Hoặc giá trị mặc định khác
  public selectedPhanMemId : string | null = null; // Hoặc giá trị mặc định khác



  isEditMode: boolean = false;// Nếu false hiển thị form thêm mới ngược lại true thì hiển thị form sửa,
  modalTitle: string = '';
  page: number = 1; // Trang hiện tại
  pageSize: number = 14; // Số dòng mỗi trang

  public defaultusers: Users = {
    id: 0,
    username: "",
    fullName: "",
    email: "",
    phone: "",
    phongBanID: "",
    isDelete: false,        
    nguoi_Cap_Nhat: "",
    ngay_Cap_Nhat: new Date(),
    nguoi_Tao: "",
    ngay_Tao:  new Date(),
  };
  public newusers: Users = {
    id: 0,
    username: "",
    fullName: "",
    email: "",
    phone: "",
    phongBanID: "",
    isDelete: false,        
    nguoi_Cap_Nhat: "",
    ngay_Cap_Nhat: new Date(),
    nguoi_Tao: "",
    ngay_Tao:  new Date(),
  }

  constructor(
    private router: Router, 
    private http: HttpClient,
    private menuService: MenuService,
    private donviService: DonviService,
    private phongbanService: PhongbanService,
    private userService: UserService,
    private usersService:UsersService,
    private modalService: NgbModal,
    private permissionService: PermissionService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: object
    ){}


    ngOnInit() {
      // Kiểm tra xem có token không (người dùng đã đăng nhập chưa)
      if (isPlatformBrowser(this.platformId)) {
       const token = localStorage.getItem('authToken');
       console.log('Token:', token);
       this.loadusers();
       this.loadDonVis();
       this.loadPhongBans();
       this.loadDomainMenus()
       this.loadFunctMenus();
       //this.loadMenuListByUserId_idPhanHe(2,'CNTT');
       console.log('ID vừa chọn để phân quyền!', this.IDUser,this.selectedPhanHeID);
       if (!this.selectedPhanHeID) {
        console.error('❌ Thiếu thông tin user hoặc phần mềm!');
        return;
      }
      this.loadMenuListByUserId_idPhanHe1(2,'CNTT');
     } else {
       console.warn('localStorage không thể sử dụng trên server!');
       this.router.navigate(['/login']);
     }
   }
    
    get paginatedChucNang() {
      const startIndex = (this.page - 1) * this.pageSize;
      return this.users.slice(startIndex, startIndex + this.pageSize);
    }
  
    nextPage() {
      if ((this.page * this.pageSize) < this.users.length) {
        this.page++;
      }
    }
  
    prevPage() {
      if (this.page > 1) {
        this.page--;
      }
    }

    totalPages(): number {
      return Math.ceil(this.users.length / this.pageSize);
    }
    // Hàm lấy danh sách dữ liệu theo trang
    getPagedData(): any[] {
      const start = (this.page - 1) * this.pageSize;
      return this.users.slice(start, start + this.pageSize);
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



  
  // Load danh sách Đon vị
  loadDonVis(): void {
    this.donviService.getDonVis().subscribe({
      next: (menus) => {
        this.donvi = menus;
        //console.log('Don Vị', this.donviService);
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
    console.log('Phòng ban được chọn:', selectedValue);
  
    this.selectedPhongBanId = selectedValue; // Cập nhật giá trị phòng ban
  
    if (this.selectedPhongBanId) {
      this.loadUsers(this.selectedPhongBanId); // Gọi API lấy danh sách người dùng
      this.newusers.phongBanID = this.selectedPhongBanId; 
    } else {
      this.user = []; // Nếu không có phòng ban, reset danh sách người dùng
    }
  }
  


// Load danh sácch người dùng theo phòng ban
loadUsers(selectedPhongBanId: string): void {
  //console.log('Xin chào các bạn:', selectedPhongBanId);
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
 // Load danh sách người dùng khi đơn vị thay đổi
 onUserChange(selectedValue: string): void {
  //console.log('Hello phongban chọn', selectedValue);
  this.selectedUserId = selectedValue; // Cập nhật giá trị

   // Tìm nhân viên dựa vào email
   const selectedUser = this.user.find(u => u.eMail === selectedValue);
   if (selectedUser) {
    // Gán thông tin vào biến `newusers`
    this.newusers.fullName = selectedUser.hovaten; 
    this.newusers.email = selectedUser.eMail;
   }

  if (this.selectedUserId) {
    this.loaduserByemail(selectedValue);
    //console.log('Giá trị được chọn', selectedValue)
    
  } else {
    this.user = []; // Nếu không có lĩnh vực, reset danh sách phần mềm
  }
}

onSoftwareChange(phanHeID: string) {
  this.selectedPhanHeID = phanHeID; // Cập nhật giá trị được chọn
  console.log('🔹 Đã chọn phần mềm với ID:',this.IDUser ,this.selectedPhanHeID);
  //this.loadMenuListByUserId_idPhanHe1(Number(this.IDUser),this.selectedPhanHeID);
}
// Mở modal để Thêm mới
openAddUsersModal(content: any): void {
  this.isEditMode = false; // Đặt thành false để biết đây là Thêm mới
  this.modalTitle = 'Thêm mới người dùng';
  this.newusers = { 
    id: 0,
    username: "",
    fullName: "",
    email: "",
    phone: "",
    phongBanID: "",
    isDelete: false,        
    nguoi_Cap_Nhat: "",
    ngay_Cap_Nhat: new Date(),
    nguoi_Tao: "",
    ngay_Tao:  new Date(),
  }; // Reset dữ liệu
  this.modalService.open(content);
  this.loadusers();
}
// Thêm mới chức năng
addUsers(users: Users): void {
  //console.log('Dữ liệu gửi lên API:', JSON.stringify(this.newchucnang));
  //console.log('Dữ liệu icon:', this.newchucnang.icon,this.newchucnang.phanHeID,this.newchucnang.title,this.newchucnang.type);
   // Kiểm tra xem các giá trị đã được nhập chưa
 if (!this.newusers.fullName||!this.newusers.email|| !this.newusers.phone|| !this.newusers.phongBanID) {
  console.log('Thông tin:', this.newusers.fullName);
   console.error("Vui lòng nhập đầy đủ thông tin!");
   return;
 }
   this.usersService.AddUserAsync(users).subscribe({      
     next: () => this.loadusers(),     
     error: (err) => console.error("Lỗi API:", err.error)
   });
 }

 // Mở modal để Chỉnh sửa
openEidtUsersModal(content: any, user: Users) {
  console.log('Thông tin id',user.id);
  this.isEditMode = true; // Đặt thành true để biết đây là Sửa
  this.modalTitle = 'Thay đổi thông tin người dùng';
  this.newusers = { ...this.defaultusers, ...user  }; // Sao chép dữ liệu từ dòng được chọn
  //console.log('Dữ liệu sau khi sao chép vào newchucnang:', this.newusers);
  this.modalService.open(content);
  this.loadusers();
}
// Sửa chức năng
eidtUsers(): void {
  console.log('Dữ liệu trước khi gửi API:', this.newusers);
  if (!this.newusers || !this.newusers.id) {
    console.error('Lỗi: Dữ liệu không hợp lệ hoặc thiếu ID.');
    return;
  }  
  this.usersService.UpdateUserAsync(this.newusers).subscribe({
    next: () => {
      console.log('Cập nhật thành công!');
      this.loadusers(); // Load lại danh sách sau khi cập nhật
    },
    error: (err) => {
      console.error('Lỗi API khi cập nhật:', err);
      console.log('Dữ liệu gửi lên API:', this.newusers);
    }
  });
}



// Thêm mới hoặc sửa chức năng khi người dùng nhấn lưu
addeditUsers(): void {

  if (!this.isEditMode) {
    this.addUsers(this.newusers)  // Thêm mới
    console.log('Thông tin người dùng:',this.newusers)
  } else {
    //console.log('Sửa', this.newchucnang);
    this.eidtUsers();  // Sửa
  }
 }

// Mở modal để phân quyền
openAddPermissionsModal(content: any, user: Users) {
  //console.log('Sửa');
  this.isEditMode = true; // Đặt thành true để biết đây là Sửa
  this.modalTitle = 'Thay đổi thông tin quyền truy cập';
  this.selectedUser = user.id; // Lưu user được chọn
  this.IDUser=user.id;
  console.log('User được chọn đó là:', this.selectedUser); // Kiểm tra console

  this.modalService.open(content);
  this.loadusers();
}

// Xóa chức năng
deleteusers(users: Users): void {
  console.log('Dữ liệu trước khi gửi API:', users.id);
  if (!this.chucnang || !users.id) {
    console.error('Lỗi: Dữ liệu không hợp lệ hoặc thiếu ID.');
    return;
  }  
  this.usersService.DeleteUserAsync(users.id).subscribe({
    next: () => {
      console.log('Cập nhật thành công!');
      this.loadusers(); // Load lại danh sách sau khi cập nhật
    },
    error: (err) => {
      console.error('Lỗi API khi cập nhật:', err);
      console.log('Dữ liệu gửi lên API:', this.chucnang);
    }
  });
}
// Load danh sách người dùng
loadusers(): void {   
  console.log('Load ds người dùng');
  this.usersService.getGetUsers().subscribe(data => {
    this.users = data;
  });
}


loaduserByemail(eMail: string): void {   
  console.log('Load ds người dùng');
  this.userService.getUsersByGetNhanVienByEmailAsync(eMail).subscribe(data => {
    this.user_Selected = data;
    //console.log('Giá trị', this.user_Selected);
    // Gán giá trị username vào ô input
    //console.log('Giá trị', this.user_Selected.eMail);
    this.newusers.username = this.user_Selected.eMail;
    this.newusers.email = this.user_Selected.eMail+'@cpc.vn';
    //this.newusers.phongBanID = this.user_Selected.donvi;
    //console.log('Giá trị', this.user_Selected.donvi);
  });
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

// Load danh sách các quyền của một user ứng với một lĩnh vực
loadMenuListByUserId_idPhanHe(idUser: number, idPhanHe: string): void {
  console.log('Hello ')
  this.permissionService.getGetMenuListByUserId_idPhanHe(idUser, idPhanHe).subscribe({
    next: (menus) => {
      this.selectedNoteItems_API = menus;
      //console.log('Danh sách quyền của một user ', this.selectedNoteItems_API);
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

loadMenuListByUserId_idPhanHe1(idUser: number, idPhanHe: string): void {
  console.log('Hello nè 1 ', this.IDUser, this.selectedPhanHeID);
  this.permissionService.getGetMenuListByUserId_idPhanHe(idUser, idPhanHe).subscribe({
    next: (menus) => {
      this.selectedNoteItems_API = menus;
      console.log('Danh sách quyền của một user ', this.selectedNoteItems_API);
      
      // Khi có danh sách quyền, cập nhật navigationItemsFromAdmin
      this.updateMenuSelection();
    },
    error: (err) => {
      console.error('Error loading domain menus:', err);
      this.errorMessage = 'Không thể tải danh sách menu. Vui lòng thử lại sau.';
    }
  });
}


updateMenuSelection(): void {
  if (!this.navigationItemsFromAdmin || !this.selectedNoteItems_API) return;

  const selectedIDs = new Set(this.selectedNoteItems_API.map(item => item.idMenu)); 

  const markSelected = (menuItems: FunctionMenu[]) => {
    menuItems.forEach(item => {
      // Nếu ID của item có trong danh sách quyền đã cấp, đánh dấu nó
      item.externals = selectedIDs.has(item.id);

      // Kiểm tra nếu có children, duyệt tiếp tục
      if (item.children?.length) {
        markSelected(item.children);
      }
    });
  };

  markSelected(this.navigationItemsFromAdmin);
}

// Các phương thức sau xét đến load mặc định lĩnh vực và phần mềm 

openModal(modalRef: any, user: Users) {
  //this.selectedUser = user.id; // Lưu user được chọn
  this.selectedUser = user.id; // Lưu user được chọn
  //console.log('Giá trị idUser truyền từ dòng đang chọn: ', this.selectedUser);
  this.initializeForm(); // Thiết lập giá trị mặc định trước khi mở modal
  //this.modalService.open(this.addPermissionModal, { size: 'lg', backdrop: 'static' }); // Mở modal
  setTimeout(() => {
    if (this.softwareMenus.length > 0) {
      this.selectedPhanHeID = this.softwareMenus[0].phanHeID;
      //console.log('Phần mềm mặc định:', this.selectedPhanHeID); // Kiểm tra giá trị
       // Kiểm tra selectedUser có giá trị hợp lệ hay không
      if (this.selectedUser !== null) {
        this.loadMenuListByUserId_idPhanHe1(Number(this.selectedUser), this.selectedPhanHeID);
      } else {
        console.warn('selectedUser is null, không thể tải menu.');
      }
    }
  }, 300); // Chờ danh sách phần mềm load xong
  
  this.modalService.open(modalRef, { size: 'lg', backdrop: 'static' });
}

initializeForm() {
  if (this.selectedUser) {
    // Nếu user đã có lĩnh vực, chọn lĩnh vực của user
    this.selectedLinhVucId = this.domainMenus[0]?.phanHeID;
  } else {
    // Nếu không có user, chọn lĩnh vực đầu tiên
    this.selectedLinhVucId = this.domainMenus[0]?.phanHeID;
  }

  if (this.selectedLinhVucId) {
    // Load danh sách phần mềm và chọn phần tử đầu tiên
    this.loadSoftwareMenus(this.selectedLinhVucId);
  }
}
  // Load danh sách phần mềm khi lĩnh vực thay đổi
  onDomainChange(selectedValue: string): void {
    this.selectedLinhVucId = selectedValue; // Cập nhật lĩnh vực
  
    if (this.selectedLinhVucId) {
      this.loadSoftwareMenus(this.selectedLinhVucId);
    } else {
      this.softwareMenus = []; // Nếu không có lĩnh vực, reset danh sách phần mềm
      this.selectedPhanMemId = ''; // Reset phần mềm
    }
  
    // Gọi hàm load menu khi lĩnh vực thay đổi
    this.reloadMenuIfValid();
  }
  
  // Load danh sách phần mềm
  loadSoftwareMenus(selectedLinhVucId: string): void {
    this.menuService.getSoftwareMenus(selectedLinhVucId).subscribe({
      next: (menus) => {
        this.softwareMenus = menus;
        if (this.softwareMenus.length > 0) {
          this.selectedPhanMemId = this.softwareMenus[0].phanHeID; // Chọn phần mềm đầu tiên
        } else {
          this.selectedPhanMemId = ''; // Không có phần mềm nào
        }
  
        // Gọi hàm load menu khi danh sách phần mềm đã cập nhật
        this.reloadMenuIfValid();
      },
      error: (err) => {
        console.error('Error loading software menus:', err);
        this.errorMessage = 'Không thể tải Software Menu. Vui lòng thử lại sau.';
      }
    });
  }
  
  getSelectedMenuIDs(menuItems: FunctionMenu[]): number[] {
    return this.getSelectedMenus(menuItems).map(item => item.id);
  }
  reloadMenuIfValid(): void {
    console.log('🔄 Đang tải menu...');

    // Reset trạng thái trước khi load dữ liệu mới
    this.resetMenuState();
  
    if (this.selectedUser !== null && this.selectedPhanMemId) {
      this.loadMenuListByUserId_idPhanHe1(Number(this.selectedUser), this.selectedPhanMemId);
    } else {
      console.warn('⚠️ Không thể tải menu: Chưa chọn user hoặc lĩnh vực!');
    }
  }
  resetMenuState(): void {
    if (!this.navigationItemsFromAdmin) return;
  
    console.log('🔄 Reset trạng thái menu');
  
    const resetRecursive = (items: FunctionMenu[]) => {
      items.forEach(item => {
        item.externals = false; // Bỏ chọn tất cả checkbox
        if (item.children?.length) {
          resetRecursive(item.children);
        }
      });
    };
  
    resetRecursive(this.navigationItemsFromAdmin);
  }
  savePermissions() {
     //this.IDUser= Number(this.selectedUser);
    console.log('User vừa chọn để cấp quyền và phân hệ ', this.selectedUser,this.selectedPhanHeID);
  
    // Lấy danh sách các mục đã chọn
    const selectedIDs = this.getSelectedMenuIDs(this.navigationItemsFromAdmin);
    console.log('Danh sách các chức năng', selectedIDs);

    if (!this.selectedUser || !this.selectedPhanHeID) {
      console.error('❌ Thiếu thông tin user hoặc phần mềm!');
      return;
    }


    // Xóa quyền trước khi thêm quyền mới
    this.permissionService.deletePermission(Number(this.selectedUser), this.selectedPhanHeID).pipe(
      switchMap(() => {
        // Sau khi xóa xong, gửi tất cả quyền lên API trong 1 request duy nhất
        return forkJoin(selectedIDs.map(IDMenu => 
          this.permissionService.addPermission(Number(this.selectedUser), IDMenu)
        ));
      })
    ).subscribe({
      next: (res) => console.log('🔹 Đã thêm quyền:', res),
      error: (err) => console.error('❌ Lỗi khi thêm quyền:', err),
    });
  }

  
}
