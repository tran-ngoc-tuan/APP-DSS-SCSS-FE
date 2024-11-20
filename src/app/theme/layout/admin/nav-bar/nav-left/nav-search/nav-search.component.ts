import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-search',
  standalone: true,
  imports: [],
  templateUrl: './nav-search.component.html',
  styleUrl: './nav-search.component.scss'
})
export class NavSearchComponent {
  // public props
  searchOn = false;
}
