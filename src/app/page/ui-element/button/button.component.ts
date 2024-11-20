import { Component } from '@angular/core';
import { CardComponent } from "../../../theme/shared/components/card/card.component";
import { SharedModule } from '../../../theme/shared/shared.module';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CardComponent,SharedModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export  class ButtonComponent {

}
