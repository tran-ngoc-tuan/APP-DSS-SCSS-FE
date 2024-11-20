import { Component } from '@angular/core';
import { SharedModule } from '../../../theme/shared/shared.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [SharedModule,RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {}
