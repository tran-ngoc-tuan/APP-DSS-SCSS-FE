import { Component } from '@angular/core';
import { SharedModule } from '../../../theme/shared/shared.module';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export  class SignInComponent {
}