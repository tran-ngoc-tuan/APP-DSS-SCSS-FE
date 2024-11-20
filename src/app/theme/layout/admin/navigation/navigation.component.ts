import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavContentComponent } from "./nav-content/nav-content.component";
@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NavContentComponent,CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  // public props
  windowWidth!: number;
  @Output() NavMobCollapse = new EventEmitter<boolean>();
  //@Input() navigationItems: NavigationItem[]=[]; // Đảm bảo item được truyền vào: NavigationItem[] = NavigationItems; // Gán giá trị cho navigationItems ở đây
  /*
  ngOnInit() {
    console.log('Tôi là  NavigationComponent nhận giá trị từ  AdminComponents', JSON.stringify(this.navigationItems, null, 2));
  }
  */
  // constructor
  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    // Chỉ gán windowWidth nếu đang trong môi trường trình duyệt
    if (isPlatformBrowser(this.platformId)) {
      this.windowWidth = window.innerWidth;
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['navigationItems']) {
      //console.log('NavigationComponent changed:', changes['navigationItems'].currentValue);
    }
  }

  // public method
  navMobCollapse() {
    if (this.windowWidth < 992) {
      this.NavMobCollapse.emit();
    }
  }

}