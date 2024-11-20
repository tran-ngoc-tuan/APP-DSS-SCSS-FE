import { Component, HostListener, Inject, Input, OnChanges, OnInit, PLATFORM_ID, Renderer2, SimpleChanges } from '@angular/core';
import { NavigationComponent } from "./navigation/navigation.component";
import { BreadcrumbComponent } from "../../shared/components/breadcrumb/breadcrumb.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { CommonModule } from '@angular/common';  // Import CommonModule để sử dụng trong component
import { Router, RouterModule } from '@angular/router';
import { ConfigurationComponent } from "./configuration/configuration.component";  // Import RouterModule
import { isPlatformBrowser } from '@angular/common';
import { Location } from '@angular/common';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NavigationComponent, BreadcrumbComponent, CommonModule, RouterModule, ConfigurationComponent, NavBarComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  
})

export class AdminComponent  {
  navCollapsed: boolean = false; // Khai báo biến và gán giá trị mặc định
  navCollapsedMob: boolean = false; 
  windowWidth: number = 0;

  // constructor
  constructor(
    
    private router: Router,
    private location: Location, // Khai báo Location
    private renderer: Renderer2, // Inject Renderer2 for DOM manipulation
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID
  ) {
    // Chỉ sử dụng window khi trong trình duyệt
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
    }
  }
  // public method
 navMobClick(): void {
  if (isPlatformBrowser(this.platformId) && this.windowWidth < 992) {
    const navElement = document.querySelector('app-navigation.pcoded-navbar');
    if (this.navCollapsedMob && !navElement?.classList.contains('mob-open')) {
      this.navCollapsedMob = !this.navCollapsedMob;
      setTimeout(() => {
        this.navCollapsedMob = !this.navCollapsedMob;
      }, 100);
    } else {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
  }
}

handleKeyDown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    this.closeMenu();
  }
}

closeMenu(): void {
  if (isPlatformBrowser(this.platformId)) {
    const navElement = document.querySelector('app-navigation.pcoded-navbar');
    if (navElement?.classList.contains('mob-open')) {
      this.renderer.removeClass(navElement, 'mob-open');
    }
  }
}
}