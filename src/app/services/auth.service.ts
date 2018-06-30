import { AuthData } from './../auth/auth-data.model';
import { User } from './../auth/user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;
  constructor(private router: Router) {
  }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
  logOut() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }
  getUser(): User {
    return {...this.user };
  }
  isAuth() {
    return this.user != null;
  }
}

