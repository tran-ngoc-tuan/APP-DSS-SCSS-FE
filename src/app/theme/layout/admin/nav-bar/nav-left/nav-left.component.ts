import { Component } from '@angular/core';
import { NavSearchComponent } from "./nav-search/nav-search.component";

@Component({
  selector: 'app-nav-left',
  standalone: true,
  imports: [NavSearchComponent],
  templateUrl: './nav-left.component.html',
  styleUrl: './nav-left.component.scss'
})
export class NavLeftComponent {

}
