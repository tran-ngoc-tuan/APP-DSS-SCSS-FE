import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ComponentRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavItemComponent } from "../nav-item/nav-item.component";
import { NavigationItem } from '../../navigation';

@Component({
  selector: 'app-nav-collapse',
  standalone: true,
  imports: [RouterModule, CommonModule, NavItemComponent],
  templateUrl: './nav-collapse.component.html',
  styleUrl: './nav-collapse.component.scss'
})
export class NavCollapseComponent implements OnInit{
  // Nhận input từ NavigationItem truyền từ cha


  @Input() item_collapse!: NavigationItem;
  @Input() depth: number = 0; // Khai báo thêm `depth` nếu cần sử dụng đệ quy sâu hơn
  isOpen = false;
  isCollapsed: boolean = true; // Mặc định đóng menu

  @ViewChild('NavCollapsedynamicContainer', { read: ViewContainerRef, static: false  }) 
  container!: ViewContainerRef;

  isDestroyed = false;

  constructor() { }

  ngOnInit() {
  }
//ngOnInit() {
  //console.log('NavCollapseComponent initialized');
  //console.log('Tôi là nav Collapse Children:', JSON.stringify(this.item_collapse?.children, null, 2));
//}
ngOnDestroy() {
  this.isDestroyed = true; // Đánh dấu là component đã bị hủy
  if (this.container) {
    this.container.clear();
  }
  console.log("NavCollapseComponent đã bị hủy.");
}

async ngAfterViewInit() {
  console.warn('Đã được NavGroup để ý');
  if (!this.container) {
    console.warn("ViewContainerRef 'container' chưa được khởi tạo.");
    return; // Ngừng thực thi nếu container không tồn tại
  } else {
    //console.log("ViewContainerRef 'container' đã được khởi tạo.", this.container);
    await this.loadNavGroupComponent();
  }
}

async loadNavGroupComponent() {
  if (this.isDestroyed) {
    console.warn("Component đã bị hủy, không thể loadNavGroupComponent.");
    return;
  }
  if (this.item_collapse?.children) {
    try {
      const { NavGroupComponent } = await import('../nav-group/nav-group.component');

      if (this.isDestroyed) return; // Kiểm tra lại trước khi sử dụng container

      this.container.clear();
      console.warn('Tôi đã vào loadNavGroupComponent');

      this.item_collapse.children.forEach(child => {
        console.log("Child Type:", child.type);

        if (child.type === 'group'|| child.type === 'collapse') {
          console.warn('chim manh manh');
          const componentRef = this.container.createComponent(NavGroupComponent);
          componentRef.instance.item_group = child;
          componentRef.instance.depth = this.depth + 1;
        }
      });
    } catch (error) {
      console.error("Lỗi khi tải NavGroupComponent:", error);
    }
  } else {
    console.warn("item_collapse hoặc children không tồn tại.");
  }
}
  // Hàm trackBy để tối ưu hóa *ngFor
trackItem(index: number, child: NavigationItem):any  {
  return child?.id|| index;
}
// Kiểm tra xem có children không
hasChildren(): boolean {
  //return !!(this.item_collapse && this.item_collapse.children && this.item_collapse.children.length > 0);
  return Array.isArray(this.item_collapse?.children) && this.item_collapse.children.length > 0;
} 
navCollapse(event: Event) {
  event.preventDefault();
  this.isCollapsed = !this.isCollapsed;
  console.log('isCollapsed con cat:', this.isCollapsed); // Kiểm tra giá trị isCollapsed
}
ngOnChanges(changes: SimpleChanges) {
  if (changes['isCollapsed'] && this.isCollapsed) {
    if (!this.container) {
      console.warn("Container chưa được khởi tạo trong ngOnChanges.");
    }
  }
}
}
