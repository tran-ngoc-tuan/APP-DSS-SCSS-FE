import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.scss'
})
export class ConfigurationComponent {
  @Output() closeConfig = new EventEmitter<void>();
  constructor(private router: Router) {}
  async goToIntroPage() {
    // Điều hướng đến AdminComponent (route '/home')
    const success = await this.router.navigate(['/intro-page']);
    if (success) {
      console.log('Chuyển hướng thành công đến IntroPage!');
      console.log('URL hiện tại:', this.router.routerState.snapshot.url);
    } else {
      console.error('Chuyển hướng không thành công!');
    }
  }
}
