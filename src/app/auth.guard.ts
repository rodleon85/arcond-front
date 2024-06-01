import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from './_services/storage.service';
import { EventBusService } from './_shared/event-bus.service';
import { EventData } from './_shared/event.class';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private storageService: StorageService,
    private eventBusService: EventBusService
  ) { }

  canActivate(): boolean {
    if (this.storageService.isLoggedIn()) {
      return true;
    } else {
      this.eventBusService.emit(new EventData('login', null));
      this.router.navigate(['/login']);
      return false;
    }
  }
}
