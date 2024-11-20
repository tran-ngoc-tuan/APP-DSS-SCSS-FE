import { Component } from '@angular/core';
import { SharedModule } from '../../../theme/shared/shared.module';

@Component({
  selector: 'app-collapse',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './collapse.component.html',
  styleUrl: './collapse.component.scss'
})
export class CollapseComponent {
  // Public props
  isCollapsed = true;
  isMultiCollapsed1 = true;
  isMultiCollapsed2 = true;
  items = ['First', 'Second', 'Third'];
}
