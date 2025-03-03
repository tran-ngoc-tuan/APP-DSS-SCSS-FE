import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FunctionMenu } from '@src/app/core/models/menu.model';

@Component({
  selector: 'app-recursive-menu-item',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './recursive-menu-item.component.html',
  styleUrl: './recursive-menu-item.component.scss'
})
export class RecursiveMenuItemComponent {
  @Input() item: any; // Dữ liệu menu item
  @Input() level: number = 0; // Cấp độ của menu (dùng để thụt lề)
  @Input() parent?: any; // Thêm tham chiếu đến cha để dễ xử lý

  onCheckboxChange(event: Event, item: any) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.toggleSelection(item, isChecked);
  }

  toggleSelection(item: any, isChecked: boolean) {
    if (!item) return;

    item.externals = isChecked;

    // 🔹 Nếu item có con, cập nhật trạng thái cho tất cả con
    if (item.children?.length) {
      this.updateChildrenSelection(item, isChecked);
    }

    // 🔹 Cập nhật cha để đảm bảo nếu có ít nhất một con được chọn, cha cũng chọn
    this.updateParentSelection(item.parent);
  }

  updateChildrenSelection(parent: any, isChecked: boolean) {
    if (!parent?.children?.length) return;

    parent.children.forEach((child: any) => {
      child.externals = isChecked;
      if (child.children?.length) {
        this.updateChildrenSelection(child, isChecked);
      }
    });
  }

  updateParentSelection(parent: any) {
    if (!parent) return;

    const allChildrenSelected = parent.children.every((c: any) => c.externals);
    const anyChildSelected = parent.children.some((c: any) => c.externals);

    // 🔹 Cập nhật trạng thái cha
    parent.externals = anyChildSelected; // Nếu có ít nhất một con được chọn, cha cũng chọn

    // 🔹 Đệ quy lên cha cao hơn
    this.updateParentSelection(parent.parent);
  }
}