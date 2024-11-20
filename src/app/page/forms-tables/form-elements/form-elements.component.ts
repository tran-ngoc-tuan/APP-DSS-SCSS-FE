import { Component } from '@angular/core';
import { CardComponent } from "../../../theme/shared/components/card/card.component";
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-form-elements',
  standalone: true,
  imports: [NgbModule,CardComponent,NgbDropdownModule,ColorPickerModule],
  templateUrl: './form-elements.component.html',
  styleUrl: './form-elements.component.scss'
})
export class FormElementsComponent {

}
