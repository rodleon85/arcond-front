import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { EventBusService } from './_shared/event-bus.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  adminRights = false;
  moderatorRights = false;
  userRights = false;
  username?: string;
  opened = false;
  showSpinner = false;

  eventBusSub?: Subscription;

  @ViewChild('sidenav') sidenav!: MatSidenav;
  
  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.adminRights = this.roles.includes('ROLE_ADMIN');
      this.moderatorRights = this.roles.includes('ROLE_MODERATOR');
      this.userRights = this.roles.includes('ROLE_USER');

      this.username = user.username;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    this.storageService.clean();
    this.isLoggedIn = false;
    this.opened = false;
    this.username = '';
    this.router.navigate(['']);
    window.location.reload(); // navigate to home page
  }

  closeSidenav(): void {
    if (window.innerWidth <= 768) { // Adjust this value based on your mobile breakpoint
      this.opened = false;
    }
  }

}
