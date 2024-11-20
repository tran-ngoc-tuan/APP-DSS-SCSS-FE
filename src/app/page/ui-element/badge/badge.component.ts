import { Component } from '@angular/core';
import { CardComponent } from "../../../theme/shared/components/card/card.component";
import { SharedModule } from '../../../theme/shared/shared.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CardComponent,SharedModule,RouterModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss'
})
export   class BadgeComponent {

}
