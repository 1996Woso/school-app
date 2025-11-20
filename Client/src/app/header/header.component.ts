import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  router = inject(Router);
  currentRoute: string = '';
  isHamMenuActive: boolean = false;

    constructor() {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  goToHome(): void {
    this.router.navigateByUrl('');
  }

  toggleHamMenu(): void {
    this.isHamMenuActive = !this.isHamMenuActive;
  }

  closeHamMenu(): void {
    this.isHamMenuActive = false;
  }

  isRouterActive(route: string): boolean {
    return this.currentRoute === route;
  }

}
