import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DomainMenu, FunctionMenu, SoftwareMenu } from '@src/app/core/models/menu.model';
import { MenuService } from '@src/app/core/services/menu.service';
import { LinkService } from '@src/app/shared/link.service';
import * as AOS from 'aos';
import 'aos/dist/aos.css';
@Component({
  selector: 'app-intro-page',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './intro-page.component.html',
  styleUrl: './intro-page.component.scss'
})
export class IntroPageComponent {
  MenuphanMem = [
    {
      IdPhanMem:'ABC',
      TenPhanMem: 'Walter White- ĐTXD ABC',
      MoTa: 'Chief Executive Officer',
      imageUrl: 'assets/img/team/team-1.jpg',
      delay: 100,
    },
    {
      IdPhanMem:'XYZ',
      TenPhanMem: 'Sarah Jhonson- ĐTXD XYZ',
      MoTa: 'Product Manager',
      imageUrl: 'assets/img/team/team-2.jpg',
      delay: 200,
    },
    {
      IdPhanMem:'KLI',
      TenPhanMem: 'William Anderson- ĐTXD KLI',
      MoTa: 'CTO',
      imageUrl: 'assets/img/team/team-3.jpg',
      delay: 300,
    },
    {
      IdPhanMem:'MKL',
      TenPhanMem: 'Amanda Jepson- ĐTXD MKL',
      MoTa: 'Accountant',
      imageUrl: 'assets/img/team/team-4.jpg',
      delay: 400,
    }
  ];
  currentLink: string | null = null;

  public domainMenus: DomainMenu[] = [];
  public softwareMenus: SoftwareMenu[] = [];
  public functionMenus: FunctionMenu[] = [];
  public errorMessage: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    private cdr: ChangeDetectorRef,
    private router: Router,
    private linkService: LinkService,
    private http: HttpClient,
    private menuService: MenuService, 
    ) {}
    ngOnInit(): void {
      // Kiểm tra xem code có đang chạy trên trình duyệt hay không
      if (isPlatformBrowser(this.platformId)) {
        const token = localStorage.getItem('authToken');
        console.log('Giá trị Token lấy ra:', token);
        if (!token) {
          this.errorMessage = 'Chưa có token, vui lòng đăng nhập lại.';
          return;
        }
        // Chỉ gọi API khi đang chạy trên trình duyệt
        console.warn('Đang chạy trên trình duyệt into-page');
        this.loadDomainMenus();
      } else {
        // Nếu không phải trình duyệt, không thực hiện các thao tác liên quan đến localStorage
        console.warn('IntroPageComponent: Không chạy trên trình duyệt, bỏ qua localStorage và loadDomainMenus.');
      }
    }
     /**
   * Load danh sách Domain Menu.
   */
  
  loadDomainMenus(): void {
    this.menuService.getDomainMenus().subscribe({
      next: (menus) => {
        this.domainMenus = menus;
        console.log('Domain menus:', this.domainMenus);
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
  loadSoftwareMenus(selectedLinhVucId: string): void {
    console.log('Selected LinhVucId:', selectedLinhVucId);
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
  setActive(item: any, event: Event) {
    event.preventDefault(); // Ngăn hành vi mặc định của <a>
    event.stopPropagation(); // Ngăn chặn sự kiện lan truyền ra ngoài  
    console.log('Link clicked', item); // Kiểm tra sự kiện có được gọi không  
     // Gọi hàm loadSoftwareMenus với ID của domain được chọn
     this.loadSoftwareMenus(item.phanHeID);
    // Cập nhật trạng thái active
    this.domainMenus.forEach(menu => (menu.isDelete = false));
    item.isActive = true;  
    // Cuộn đến phần tử
    const elementId = item.link?.substring(1); // Bỏ dấu # nếu có
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  


  ngAfterViewInit(): void {
    console.log('Component view initialized');
    if (typeof window !== 'undefined') {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 200
      });
      setTimeout(() => {
        AOS.refresh();
      }, 500);
    }
  }
 
  navigateToHome(event: MouseEvent) {
    const linkText = (event.target as HTMLElement).textContent?.trim();
    //this.router.navigate(['/home'], { queryParams: { link: linkText } });
     // Điều hướng đến AdminComponent (route '/home')
     this.router.navigate(['/home'],{ queryParams: { link: linkText } }).then((success) => {
      if (success) {
        console.log('Điều hướng thành công!');
      } else {
        console.error('Điều hướng thất bại!');
      }
    });
  }
  openApplication(event: MouseEvent): void {
    event.preventDefault(); // Ngăn chặn hành vi mặc định
    console.log('Link clicked, but staying on the current page.');
    // Mở URL trong một tab mới
    window.open('https://chat.cpc.vn/', '_blank');
  }



  navigateToPhanMemDetails(id: string): void {
    console.log('🔹IntroPage phanHeID từ URL :', id);
    this.router.navigate(['/home'],{ queryParams: { id } }).then((success)=>{
      if (success) {
        console.log('🔹IntroPage phanHeID từ URL Nếu thành công:', id);
        console.log('Điều hướng phần mềm  thành công!');
      } else {
        console.error('Điều hướng phần mềm thất bại!');
      }
    });
  }
}
