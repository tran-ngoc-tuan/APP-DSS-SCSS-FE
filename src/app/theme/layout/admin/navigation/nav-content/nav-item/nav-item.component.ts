import { Component, Input } from '@angular/core';
import { NavigationItem } from '../../navigation';
import { CommonModule } from '@angular/common';  // Import CommonModule để sử dụng trong component
import { RouterModule } from '@angular/router';  // Import RouterModule

@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [CommonModule,RouterModule ],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss'
})
export class NavItemComponent {
// public props
@Input() item_item!: NavigationItem;
ngOnInit() {
  //console.log('Tôi là nav-item:',this.item_item.title);
  //console.log('Tôi là nav-item:', JSON.stringify(this.item_NavContent.title, null, 2));
  //console.table(this.item_NavContent.children);
 // console.log('Tôi là nav-item',this.item.title);
}
// public method
closeOtherMenu(event: MouseEvent) {
  const ele = event.target as HTMLElement;
  if (ele !== null && ele !== undefined) {
    const parent = ele.parentElement as HTMLElement;
    const up_parent = ((parent.parentElement as HTMLElement).parentElement as HTMLElement).parentElement as HTMLElement;
    const last_parent = up_parent.parentElement;
    const sections = document.querySelectorAll('.pcoded-hasmenu');
    for (let i = 0; i < sections.length; i++) {
      sections[i].classList.remove('active');
      sections[i].classList.remove('pcoded-trigger');
    }

    if (parent.classList.contains('pcoded-hasmenu')) {
      parent.classList.add('pcoded-trigger');
      parent.classList.add('active');
    } else if (up_parent.classList.contains('pcoded-hasmenu')) {
      up_parent.classList.add('pcoded-trigger');
      up_parent.classList.add('active');
    } else if (last_parent?.classList.contains('pcoded-hasmenu')) {
      last_parent.classList.add('pcoded-trigger');
      last_parent.classList.add('active');
    }
  }
  if (document.querySelector('app-navigation.pcoded-navbar')?.classList.contains('mob-open')) {
    document.querySelector('app-navigation.pcoded-navbar')?.classList.remove('mob-open');
  }
}
}
