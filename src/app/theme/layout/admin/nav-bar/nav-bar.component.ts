import { Component, EventEmitter, HostListener, Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { NavLeftComponent } from "./nav-left/nav-left.component";
import { NavRightComponent } from "./nav-right/nav-right.component";
import { CommonModule } from '@angular/common';  // Import CommonModule để sử dụng trong component
import { RouterModule } from '@angular/router';  // Import RouterModule
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NavLeftComponent, NavRightComponent,CommonModule,RouterModule], 
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  // public props
  menuClass = false;
  collapseStyle = 'none';
  windowWidth!: number; // Sẽ được gán khi chắc chắn trong trình duyệt
  @Output() NavCollapse = new EventEmitter<boolean>();;
  @Output() NavCollapsedMob = new EventEmitter<boolean>();;
  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    // Chỉ gán windowWidth nếu đang trong môi trường trình duyệt
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
    }
  }

  // public method
  toggleMenuCollapse() {
    this.menuClass = !this.menuClass; // Đổi trạng thái thu gọn
    this.NavCollapse.emit(this.menuClass);
    this.collapseStyle = this.menuClass ? 'none' : 'block'; // Điều chỉnh collapseStyle khi thu gọn
  }
  // public method
  toggleMobOption() {   
    this.menuClass = !this.menuClass;
    this.collapseStyle = this.menuClass ? 'block' : 'none';
  }

  navCollapse() {
    console.warn('Hello ComponentNavBar');
    if (this.windowWidth >= 992) {
      this.NavCollapse.emit();
    }
  }

  @HostListener('window:resize', ['$event'])
  // eslint-disable-next-line
  onResize(event: any): void {
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = event.target.innerWidth;
    }
  }

  navCollapseMob() {
    if (this.windowWidth < 992) {
      this.NavCollapsedMob.emit();
    }
  }
}