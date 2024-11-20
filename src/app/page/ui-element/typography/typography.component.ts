import { Component } from '@angular/core';
import { SharedModule } from '../../../theme/shared/shared.module';

@Component({
  selector: 'app-typography',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './typography.component.html',
  styleUrl: './typography.component.scss'
})
export class TypographyComponent {
}
