import { AfterViewInit, Component, ComponentRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef} from '@angular/core';
import { NavigationItem } from '../../navigation';
import { CommonModule } from '@angular/common';
import { NavItemComponent } from "../nav-item/nav-item.component";
import { isPlatformBrowser } from '@angular/common';
import { NavCollapseComponent } from "../nav-collapse/nav-collapse.component";
@Component({
  selector: 'app-nav-group',
  standalone: true,
  imports: [NavItemComponent, CommonModule, NavCollapseComponent],
  templateUrl: './nav-group.component.html',
  styleUrl: './nav-group.component.scss'
})
export class NavGroupComponent implements OnInit, OnChanges, AfterViewInit{
  // public props
  @Input() item_group!: NavigationItem;
  @Input() depth: number = 0; // Khai báo thêm `depth` nếu cần sử dụng đệ quy sâu hơn
  location: any;
  locationStrategy: any;
 // Lazy load NavCollapseComponent
 @ViewChild('NavGroupdynamicContainer', { read: ViewContainerRef, static: false  }) 
 container!: ViewContainerRef;
constructor(){}
ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    // at reload time active and trigger link
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
async ngAfterViewInit() {
  //console.log('Checking container:', this.container);
  if (this.container) {
    //console.warn('Đã bắt đầu call NavCollapseComponent :');
    this.loadNavCollapseComponent();
    //console.warn('Sau khi call NavCollapseComponent :');
  } else {
    // Sử dụng setTimeout để trì hoãn, cho phép Angular hoàn tất quá trình khởi tạo
    setTimeout(() => {
      if (this.container) {
        this.loadNavCollapseComponent();
      } else {
        console.warn("ViewContainerRef 'container' chưa được khởi tạo sau khi trì hoãn.");
      }
    }, 0);
  }
}
async loadNavCollapseComponent() {
  ///console.warn('Đã vào NavCollapseComponent :');
    if (this.item_group?.children) {      
      const { NavCollapseComponent } = await import('../nav-collapse/nav-collapse.component');
      if (this.container) {
        this.container.clear();
        //console.warn('Clear xong!');
      }

      this.item_group.children.forEach(child => {
        if (child.type === 'collapse') {
          const componentRef: ComponentRef<any> = this.container.createComponent(NavCollapseComponent);
          componentRef.instance.item_collapse = child;
          componentRef.instance.depth = this.depth + 1;
        }
      });
    }
  }
  // Hàm trackBy để tăng hiệu suất khi sử dụng *ngFor
  trackItem(index: number, child: NavigationItem):any  {
    return child?.id|| index;
  }
  

  hasChildren(): boolean {
    return !!(this.item_group && this.item_group?.children && this.item_group?.children.length > 0);
  }
  platformId(platformId: any) {
    throw new Error('Method not implemented.');
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['item_group'] && changes['item_group'].currentValue) {
      //console.log('item_group received:', this.item_group);
    } else {
      //console.warn('item_group is undefined or null');
    }
  }
}