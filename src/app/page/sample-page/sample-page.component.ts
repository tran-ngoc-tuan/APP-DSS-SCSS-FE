import { Component } from '@angular/core';
import { SharedModule } from '../../theme/shared/shared.module';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-sample-page',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './sample-page.component.html',
  styleUrl: './sample-page.component.scss'
})
export  class SamplePageComponent {

}
