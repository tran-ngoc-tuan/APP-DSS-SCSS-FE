import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SpinnerComponent } from "./theme/shared/components/spinner/spinner.component";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'HỖ TRỢ ĐIỀU HÀNH';
  linkText: string | null = null;
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object, // Kiểm tra platform
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      this.route.queryParams.subscribe((params) => {
        this.linkText = params['link'] || null;
        console.log('Received link:', this.linkText);
      });
      // Chỉ gọi window.scrollTo khi đang chạy trên trình duyệt
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo(0, 0);
      }
    });
  }
}