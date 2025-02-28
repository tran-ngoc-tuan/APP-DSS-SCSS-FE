import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, Input, NgZone, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationItem } from '../../navigation';
import { NavItemComponent } from "../nav-item/nav-item.component";
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-nav-collapse',
  standalone: true,
  imports: [RouterModule, CommonModule, NavItemComponent],
  templateUrl: './nav-collapse.component.html',
  styleUrl: './nav-collapse.component.scss',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', display: 'block' }),
        animate('250ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [animate('250ms ease-in', style({ transform: 'translateY(-100%)' }))])
    ])
  ]//,
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavCollapseComponent {
  // Nhận input từ NavigationItem truyền từ cha
  @Input() item_collapse!: NavigationItem;
  @Input() depth: number = 0; // Khai báo thêm `depth` nếu cần sử dụng đệ quy sâu hơn
  isOpen = false;
  isCollapsed: boolean = false; // Mặc định đóng menu
  private hasLoaded = false;
  @ViewChild('NavCollapsedynamicContainer', { read: ViewContainerRef, static: false  }) 
  container!: ViewContainerRef;
  isDestroyed = false;
  constructor(private zone: NgZone,private cdr: ChangeDetectorRef) {}
  
  async loadNavGroupComponent() {
    if (this.isDestroyed|| this.hasLoaded) {
      console.log("Component đã bị hủy hoặc đã được load trước đó.");
      return;
    }
  
    try {
      const { NavGroupComponent } = await import('../nav-group/nav-group.component');
      const { NavItemComponent } = await import('../nav-item/nav-item.component');
      
      this.zone.run(() => {
        // Đảm bảo container chỉ được render một lần
        if (!this.container || this.isDestroyed) return;
  
        // Xoá toàn bộ các component cũ trước khi render mới
        this.container.clear();
        console.warn("Xuất hiện: " + this.item_collapse.children);
        if (this.item_collapse?.children) {
          const uniqueChildren = this.item_collapse.children; // Đảm bảo dữ liệu là duy nhất
          console.warn("Lần: " + this.depth,uniqueChildren);
          uniqueChildren.forEach(child => {
            if (child.type === 'group' || child.type === 'collapse') {
              const componentRef = this.container.createComponent(NavGroupComponent);
              componentRef.instance.item_group = child;
              componentRef.instance.depth = this.depth + 1;
            } else if (child.type === 'item') {
              const componentRef = this.container.createComponent(NavItemComponent);
              componentRef.instance.item_item = child;
            }
          });
        }
      });
      this.hasLoaded = true; // Đánh dấu đã load
    } catch (error) {
      console.error("Lỗi khi tải NavGroupComponent:", error);
    }
  }
  
  
  // Hàm trackBy để tối ưu hóa *ngFor
trackItem(index: number, child: NavigationItem):any  {
  return child?.id|| index;
}
// Kiểm tra xem có children không
hasChildren(): boolean {
  //return !!(this.item_collapse && this.item_collapse.children && this.item_collapse.children.length > 0);
  //const has = Array.isArray(this.item_collapse?.children) && this.item_collapse.children.length > 0;
  //console.log('hasChildren:', has);
  return Array.isArray(this.item_collapse?.children) && this.item_collapse.children.length > 0;
} 


navCollapse(e: MouseEvent) {
  e.preventDefault();
  e.stopPropagation();

  // Toggle trạng thái `isCollapsed`
  this.isCollapsed = !this.isCollapsed;

  // Xác định phần tử parent
  const parent = (e.target as HTMLElement).closest('.pcoded-hasmenu') as HTMLElement | null;
  if (!parent) {
    console.warn('Parent element not found!');
    return;
  }

  const isCurrentlyOpen = parent.classList.contains('pcoded-trigger');
  const submenu = parent.querySelector(':scope > .pcoded-submenu') as HTMLElement | null;

  // Đóng tất cả các menu khác
  const allMenus = document.querySelectorAll('.pcoded-hasmenu.pcoded-trigger');
  allMenus.forEach((menu) => {
    if (menu !== parent) {
      menu.classList.remove('pcoded-trigger');
      const childSubmenu = menu.querySelector(':scope > .pcoded-submenu') as HTMLElement | null;
      if (childSubmenu) {
        childSubmenu.style.display = 'none'; // Ẩn tất cả submenu khác
      }
    }
  });

  // Xử lý menu hiện tại
  if (!isCurrentlyOpen) {
    parent.classList.add('pcoded-trigger');
    if (submenu) {
      submenu.style.display = 'block'; // Hiển thị submenu
    }
  } else {
    parent.classList.remove('pcoded-trigger');
    if (submenu) {
      submenu.style.display = 'none'; // Ẩn submenu
    }
  }

  // Cập nhật `isCollapsed`
  this.isCollapsed = !isCurrentlyOpen;

  // Nếu không có submenu trong DOM nhưng có dữ liệu con, buộc cập nhật lại giao diện
  if (!submenu && this.hasChildren()) {
    console.warn('Submenu not rendered but children exist.');
    setTimeout(() => {
      this.cdr.detectChanges(); // Buộc Angular cập nhật DOM
    }, 0);
  }

  // Xử lý đệ quy cho các menu cha
  let ancestor: HTMLElement | null = parent.closest('.pcoded-submenu');
  while (ancestor) {
    const parentMenu = ancestor.closest('.pcoded-hasmenu') as HTMLElement | null;
    if (!parentMenu) break;

    parentMenu.classList.add('pcoded-trigger');
    ancestor = parentMenu.closest('.pcoded-submenu');
  }

  console.log('Menu state:', {
    isCurrentlyOpen,
    isCollapsed: this.isCollapsed,
    submenu,
    children: this.item_collapse?.children,
  });
}




toggleCollapse(): void {

  if (this.isDestroyed) {
    console.warn("Component đã bị hủy, không thể thực hiện toggleCollapse.");
    return;
  }

  this.isCollapsed = !this.isCollapsed;
  console.log('isCollapsed con cat:', this.isCollapsed); // Kiểm tra giá trị isCollapsed
  if(this.isCollapsed && this.hasChildren())
  {
    console.log('Children of Collapse:', this.item_collapse.children);
    //console.log("Classes applied:", this.isCollapsed ? "active" : "not-active");
    this.cdr.markForCheck(); // Cập nhật giao diện
  }  
}
ngOnDestroy() {
  this.isDestroyed = true; // Đánh dấu là component đã bị hủy
  if (this.container) {
    this.container.clear();
  }
}

async ngAfterViewInit() {
  console.log("NavCollapseComponent: ngAfterViewInit");
  if (!this.container) {
    console.warn("ViewContainerRef 'container' chưa được khởi tạo.");
    return;
  }
  if (this.hasLoaded) {
    console.log("loadNavGroupComponent đã được gọi trước đó, bỏ qua lần này.");
    return;
  }
  this.hasLoaded = true;
  console.log("NavCollapseComponent: NgAfterViewInit đang gọi loadNavGroupComponent");
  await this.loadNavGroupComponent();
}

ngOnChanges(changes: SimpleChanges) {
  if (changes['item_collapse']) {
    //console.log("Dữ liệu item_collapse thay đổi:", changes['item_collapse'].currentValue);
  }
}

}
