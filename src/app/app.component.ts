import {Component, OnInit} from '@angular/core';
import {
  Event,
  Router,
  NavigationStart,
  NavigationEnd,
  RouterEvent
} from '@angular/router';
import { PlatformLocation } from '@angular/common';
import {AuthService} from "./services/auth.service";
import {ROUTES} from "./layout/sidebar/sidebar-items";
import {TokenStorageService} from "./services/token-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit{
  // private roles: string[];
//  isLoggedIn = false;
 // showAdminBoard = false;
 // showModeratorBoard = false;
  name: string;

   currentUrl: string;
  showLoadingIndicatior = true;

  constructor(public _router: Router,
              location: PlatformLocation) {
    // this._router.events.subscribe((routerEvent: Event) => {
    //   if (routerEvent instanceof NavigationStart) {
    //     this.showLoadingIndicatior = true;
    //     location.onPopState(() => {
    //       window.location.reload();
    //     });
    //     this.currentUrl = routerEvent.url.substring(
    //       routerEvent.url.lastIndexOf('/') + 1
    //     );
    //   }
    //   if (routerEvent instanceof NavigationEnd) {
    //     this.showLoadingIndicatior = false;
    //   }
    //   window.scrollTo(0, 0);
    // });
  }

  ngOnInit(): void {
    // let isloggedin: string;
    // let loggedUser:string;
    // isloggedin = localStorage.getItem('isloggedIn');
    // loggedUser = localStorage.getItem('loggedUser');
    // if (isloggedin!=="true" || !loggedUser)
    //   this._router.navigate(['/authentication/signin']);
    // else
    //   this.authService.setLoggedUserFromLocalStorage(loggedUser);
 //   this.isLoggedIn = !!this.tokenStorageService.getToken();

    // if (this.isLoggedIn) {
    //  // const user = this.tokenStorageService.getUser();
    //   //  this.roles = user.roles;
    //   // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    //   // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
    //   // this.name = user.name;
    //   console.log('connecter okkkk')
    // }
  }

  // logout(): void {
  //   this.tokenStorageService.signOut();
  //   window.location.reload();
  // }
}
