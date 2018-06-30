import { Component, OnInit, EventEmitter, Output, OnDestroy  } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit,  OnDestroy {
  @Output() closeSideNav = new EventEmitter<void>();
  authSubscription: Subscription;
  isAuth: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }
  onClose() {
    this.closeSideNav.emit();
  }
  onLogOut() {
    this.authService.logOut();
    this.onClose();
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
