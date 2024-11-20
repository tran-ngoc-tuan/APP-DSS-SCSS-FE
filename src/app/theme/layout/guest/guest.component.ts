import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [RouterModule,CommonModule],   // Thêm RouterModule vào imports],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.scss'
})
export class GuestComponent {

}
