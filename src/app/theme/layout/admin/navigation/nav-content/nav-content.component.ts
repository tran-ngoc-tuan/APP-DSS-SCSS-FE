import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID, input} from '@angular/core';
import { environment } from '../../../../../../environments/environment.prod';
import { NavigationItem, NavigationItems } from '../navigation';
import { CommonModule, Location, LocationStrategy, isPlatformBrowser } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ClickOutsideModule } from 'ng-click-outside';
import { NavGroupComponent } from './nav-group/nav-group.component';
import { NavCollapseComponent } from './nav-collapse/nav-collapse.component';
import { NavItemComponent } from "./nav-item/nav-item.component";

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

  // public pops
  //public navigations: NavigationItem[];
  // Kích thước của giao diện
  wrapperWidth!: number;
  windowWidth!: number;


  //@Input() item!: NavigationItem;

  //@Input() navigations!: NavigationItem[]; // đảm bảo dữ liệu không undefined
  // Đầu vào và đầu ra
  @Output() NavMobCollapse = new EventEmitter();
  navigationItemsFromAdmin: NavigationItem[] = NavigationItems;

  //navigationItemsFromAdmin =  NavigationItem[];
  constructor(
    private location: Location,
    private locationStrategy: LocationStrategy,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Chỉ truy cập `window` nếu đang chạy trong trình duyệt
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
    }
  }

  trackItem(index: number, item: NavigationItem): any  {
    return  item?.id|| index ; // sử dụng 'id' là unique identifier để track item
  }
  
  // life cycle event
  ngOnInit() {
    //console.warn('Dữ liệu gốc NavigationItems là đầu vào', JSON.stringify(this.navigationItemsFromAdmin, null, 2));
   //console.warn('Dữ liệu gốc NavigationItems là đầu vào',this.navigationItemsFromAdmin);
   //console.warn('NavigationItems:', JSON.stringify(this.navigationItemsFromAdmin, null, 2));
    if (isPlatformBrowser(this.platformId)) {
      if (this.windowWidth < 992) {
        const navbar = document.querySelector('.pcoded-navbar');
        navbar?.classList.add('menupos-static');
      }
    }
  }

  // public method
  navMob() {
    if (isPlatformBrowser(this.platformId)) {
      const navElement = document.querySelector('app-navigation.pcoded-navbar');
      if (this.windowWidth < 992 && navElement?.classList.contains('mob-open')) {
        this.NavMobCollapse.emit();
      }
    }
  }

  fireOutClick() {
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