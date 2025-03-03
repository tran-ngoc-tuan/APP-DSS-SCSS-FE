import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID, input} from '@angular/core';
import { environment } from '../../../../../../environments/environment.prod';
import { NavigationItem, NavigationItems } from '../navigation';
import { CommonModule, Location, LocationStrategy, isPlatformBrowser } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ClickOutsideModule } from 'ng-click-outside';
import { NavGroupComponent } from "./nav-group/nav-group.component";
import { NavCollapseComponent } from "./nav-collapse/nav-collapse.component";
import { NavItemComponent } from "./nav-item/nav-item.component";
import { HttpClient } from '@angular/common/http';
import { MenuService } from '@src/app/core/services/menu.service';
import { FunctionMenu } from '@src/app/core/models/menu.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav-content',
  standalone: true,
  imports: [NgScrollbarModule, CommonModule, ClickOutsideModule, NavGroupComponent, NavCollapseComponent, NavItemComponent],
  templateUrl: './nav-content.component.html',
  styleUrl: './nav-content.component.scss'
})
export class NavContentComponent implements OnInit {
  // version
  title = 'Ứng dụng hỗ trợ điều hành DSS';
  currentApplicationVersion = environment.appVersion;
  phanHeID: string | null = null;
  private FunctionMenus1: FunctionMenu[] = [
    {
      id: 1,
      title: 'Navigation',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 2,
          title: 'Dashboard',
          type: 'item',
          url: '/analytics',
          icon: 'feather icon-home'
        }
      ]
    },
    {
      id: 3,
      title: 'Ui Component',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 4,
          title: 'Component',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 5,
              title: 'Button',
              type: 'item',
              url: '/home/component/button'
            },
            {
              id: 6,
              title: 'Badges',
              type: 'item',
              url: '/home/component/badges'
            },
            {
              id: 7,
              title: 'Breadcrumb & Pagination',
              type: 'item',
              url: '/component/breadcrumb-paging'
            },
            {
              id: 8,
              title: 'Collapse',
              type: 'item',
              url: '/component/collapse'
            },
            {
              id:9,
              title: 'Tabs & Pills',
              type: 'item',
              url: '/component/tabs-pills'
            },
            {
              id: 10,
              title: 'Typography',
              type: 'item',
              url: '/component/typography'
            }
          ]
        }
      ]
    },
    {
      id: 11,
      title: 'Viễn thông',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 12,
          title: 'VTDR',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 13,
              title: 'Chức năng 1',
              type: 'item',
              url: '/home/ui-vtcntt/QL_TKND/qltkndabc'
            },
            {
              id: 14,
              title: 'Chức năng 2',
              type: 'item',
              url: '/home/ui-vtcntt/QL_TKND/qltkndcde'
            },
            {
              id: 15,
              title: 'Chức năng 3',
              type: 'item',
              url: '/home/ui-vtcntt/QL_TKND/qltknddang-ky'
            }
          ]
        }
      ],
    },
    {
      id: 16,
      title: 'Viễn thông',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 17,
          title: 'QTHT',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 18,
              title: 'Thao tác Menu',
              type: 'item',
              url: '/home/ui-vtcntt/QUANTRI/quantrithaotacmenu'
            },
            {
              id: 19,
              title: 'Phân quyền',
              type: 'item',
              url: '/home/ui-vtcntt/QUANTRI/quantriphanquyenmenu'
            },          
          ]
        }
      ],
    },
    {
      id: 20,
      title: 'Authentication',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 21,
          title: 'Sign up',
          type: 'item',
          url: '/auth/signup',
          icon: 'feather icon-at-sign',
          target: true,
          breadcrumbs: false
        },
        {
          id: 22,
          title: 'Sign in',
          type: 'item',
          url: '/auth/signin',
          icon: 'feather icon-log-in',
          target: true,
          breadcrumbs: false
        }
      ]
    },
    {
      id: 23,
      title: 'Chart',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 24,
          title: 'ApexChart',
          type: 'item',
          url: '/chart',
          classes: 'nav-item',
          icon: 'feather icon-pie-chart'
        }
      ]
    },
    {
      id: 25,
      title: 'Forms & Tables',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 26,
          title: 'Basic Forms',
          type: 'item',
          url: 'forms',
          classes: 'nav-item',
          icon: 'feather icon-file-text'
        },
        {
          id: 27,
          title: 'tables',
          type: 'item',
          url: 'tables',
          classes: 'nav-item',
          icon: 'feather icon-server'
        }
      ]
    },
    {
      id: 28,
      title: 'Other',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 29,
          title: 'Sample Page',
          type: 'item',
          url: 'sample-page',
          classes: 'nav-item',
          icon: 'feather icon-sidebar'
        },
        {
          id: 30,
          title: 'Menu Levels',
          type: 'collapse',
          icon: 'feather icon-menu',
          children: [
            {
              id: 31,
              title: 'Menu Level 2.1',
              type: 'item',
              url: 'javascript:',
              external: true
            },
            {
              id: 32,
              title: 'Menu Level 2.2',
              type: 'collapse',
              children: [
                {
                  id: 33,
                  title: 'Menu Level 2.2.1',
                  type: 'item',
                  url: 'javascript:',
                  external: true
                },
                {
                  id: 34,
                  title: 'Menu Level 2.2.2',
                  type: 'item',
                  url: 'javascript:',
                  external: true
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  
  private FunctionMenus: FunctionMenu[] = [
    {
      "id": 1,
      "title": "Navigation",
      "type": "group",
      "icon": "icon-group",
      "children": [
        {
          "id": 2,
          "title": "Dashboard",
          "type": "item",
          "url": "zbc",
          "icon": "feather icon-home",
          "target": false,
          "breadcrumbs": false,
          "classes": "zbc",
          "externals": false,
          "children": []
        }
      ]
    },
    {
      id: 3,
      title: "Viễn thông",
      type: "group",
      icon: "icon-group",
      children: [
        {
          id: 15,
          title: "Danh mục chức năng",
          type: "item",
          url: "zbc",
          icon: "",
          target: false,
          breadcrumbs: false,
          classes: "zbc",
          externals: false,
          children: [
            {
              id: 16,
              title: "Phân quyền chức năng",
              type: "item",
              url: "zbc",
              icon: "",
              target: false,
              breadcrumbs: false,
              classes: "zbc",
              externals: false,
              children: []
            },
            {
              id: 17,
              title: "Danh mục phần mềm",
              type: "item",
              url: "zbc",
              icon: "",
              target: false,
              breadcrumbs: false,
              classes: "zbc",
              externals: false,
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 4,
      title: "VTNR",
      type: "group",
      icon: "",
      children: [
        {
          id: 5,
          title: "Chức năng 1",
          type: "item",
          url: "zbc",
          icon: "",
          target: false,
          breadcrumbs: false,
          classes: "zbc",
          externals: false,
          children: []
        },
        {
          id: 6,
          title: "Chức năng 2",
          type: "item",
          url: "zbc",
          icon: "",
          target: false,
          breadcrumbs: false,
          classes: "zbc",
          externals: false,
          children: []
        },
        {
          id: 7,
          title: "Chức năng 3",
          type: "item",
          url: "zbc",
          icon: "",
          target: false,
          breadcrumbs: false,
          classes: "zbc",
          externals: false,
          children: []
        }
      ]
    },
    {
      id: 8,
      title: "Hệ thống",
      type: "group",
      icon: "icon-group",
      children: [
        {
          "id": 9,
          "title": "Cấu hình hệ thống",
          "type": "item",
          "url": "zbc",
          "icon": "feather icon-home",
          "target": false,
          "breadcrumbs": false,
          "classes": "zbc",
          "externals": false,
          "children": []
        }
      ]
    },
    {
      "id": 10,
      "title": "Quản trị hệ thống",
      "type": "group",
      "icon": "icon-group",
      "children": [
        {
          "id": 11,
          "title": "Nhóm người dùng",
          "type": "collapse",
          "url": "zbc",
          "icon": "feather icon-box",
          "target": false,
          "breadcrumbs": false,
          "classes": "zbc",
          "externals": false,
          "children": [
            {
              "id": 12,
              "title": "Danh mục người dùng",
              "type": "item",
              "url": "zbc",
              "icon": "NULL",
              "target": false,
              "breadcrumbs": false,
              "classes": "zbc",
              "externals": false,
              "children": []
            }
          ]
        }
      ]
    },
    {
      "id": 13,
      "title": "Phân quyền",
      "type": "group",
      "icon": "icon-group",
      "children": [
        {
          "id": 14,
          "title": "Chức năng",
          "type": "collapse",
          "url": "zbc",
          "icon": "feather icon-box",
          "target": false,
          "breadcrumbs": false,
          "classes": "zbc",
          "externals": false,
          "children": []
        }
      ]
    },
    {
      id: 18,
      title: "Thông tin người dùng",
      type: "group",
      icon: "icon-group",
      children: [
        {
          id: 19,
          title: "Đăng nhập",
          type: "item",
          url: "zbc",
          icon: "feather icon-log-in",
          target: false,
          breadcrumbs: false,
          classes: "zbc",
          externals: false,
          children: []
        },
        {
          id: 20,
          title: "Đăng xuất",
          type: "item",
          url: "zbc",
          icon: "feather icon-at-sign",
          target: false,
          breadcrumbs: false,
          classes: "zbc",
          externals: false,
          children: []
        }
      ]
    }
  ];


  

  public functionMenus: FunctionMenu[] = [];
  public errorMessage: string = '';
  // public pops
  //public navigations: NavigationItem[];
  // Kích thước của giao diện
  wrapperWidth!: number;
  windowWidth!: number;
  @Input() isMenuCollapsed: boolean = false; // Nhận trạng thái thu gọn từ NavigationComponent
  // Đầu vào và đầu ra
  @Output() NavMobCollapse = new EventEmitter();
  //navigationItemsFromAdmin: NavigationItem[] = NavigationItems;
  navigationItemsFromAdmin: FunctionMenu[] = []; // Khởi tạo mảng rỗng
  constructor(
    private location: Location,
    private locationStrategy: LocationStrategy,
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private menuService: MenuService,
    private route: ActivatedRoute,
  ) {
    // Chỉ truy cập `window` nếu đang chạy trong trình duyệt
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
    }
  }


  loadFunctMenus(): void {
    console.log('Xin chào Menu');
    this.menuService.getFunctionMenus().subscribe({
      next: (menus) => {
        this.functionMenus = menus;
       // this.navigationItemsFromAdmin = this.functionMenus; // Cập nhật dữ liệu
       this.navigationItemsFromAdmin = this.functionMenus;
        //console.log('Software menus:', this.functionMenus);
      },
      error: (err) => {
        //console.error('Error loading software menus:', err);
        this.errorMessage = 'Không thể tải Software Menu. Vui lòng thử lại sau.';
      }
    });
  }

  loadFunctMenusByUserId_idPhanHe(idPhanHe: string): void {
    console.log('Xin chào Menu');
    this.menuService.getFunctionMenusByUserId_idPhanHe(idPhanHe).subscribe({
      next: (menus) => {
        this.functionMenus = menus;       
       this.navigationItemsFromAdmin = this.functionMenus;
        //console.log('Software menus:', this.functionMenus);
      },
      error: (err) => {
        //console.error('Error loading software menus:', err);
        this.errorMessage = 'Không thể tải Software Menu. Vui lòng thử lại sau.';
      }
    });
  }
  
  trackItem(index: number, item: FunctionMenu): any  {
    return  item?.id|| index ; // sử dụng 'id' là unique identifier để track item
  }
  /*
  // life cycle event
  ngOnInit() {
    //console.warn('Con chim non');
    //console.warn('Dữ liệu gốc NavigationItems là đầu vào', JSON.stringify(this.navigationItemsFromAdmin, null, 2));
    if (isPlatformBrowser(this.platformId)) {
       //this.loadFunctMenus();
       this.loadFunctMenusByUserId_idPhanHe();
      if (this.windowWidth < 992) {
        const navbar = document.querySelector('.pcoded-navbar');
        navbar?.classList.add('menupos-static');
       
      }
    }
  }
*/

ngOnInit() {
  this.route.queryParams.subscribe(params => {
    console.log('Giá trị paramas: ', params)
    this.phanHeID = params['id'] || null;
    console.log('🔹 phanHeID từ URL :', this.phanHeID);
    
    if (this.phanHeID) {
      this.loadFunctMenusByUserId_idPhanHe(this.phanHeID);
    }
  });

  if (isPlatformBrowser(this.platformId) && this.windowWidth < 992) {
    document.querySelector('.pcoded-navbar')?.classList.add('menupos-static');
  }
}

  // public method
  navMob() {
    //console.log('Menu clicked outside.');
    if (isPlatformBrowser(this.platformId)) {
      const navElement = document.querySelector('app-navigation.pcoded-navbar');
      if (this.windowWidth < 992 && navElement?.classList.contains('mob-open')) {
        this.NavMobCollapse.emit();
      }
    }
  }

  fireOutClick() {
    //console.log('Item clicked outside.');
    if (isPlatformBrowser(this.platformId)) {
      let currentUrl = this.location.path();
      const baseHref = this.locationStrategy.getBaseHref();
      if (baseHref) {
        currentUrl = `${baseHref}${this.location.path()}`;
      }
      const link = `a.nav-link[href='${currentUrl}']`;
      const ele = document.querySelector(link);

      if (ele) {
        const parent = ele.parentElement;
        const upParent = parent?.parentElement?.parentElement;
        const lastParent = upParent?.parentElement;

        if (parent?.classList.contains('pcoded-hasmenu')) {
          parent.classList.add('pcoded-trigger', 'active');
        } else if (upParent?.classList.contains('pcoded-hasmenu')) {
          upParent.classList.add('pcoded-trigger', 'active');
        } else if (lastParent?.classList.contains('pcoded-hasmenu')) {
          lastParent.classList.add('pcoded-trigger', 'active');
        }
      }
    }
  }
}