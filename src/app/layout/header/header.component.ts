import { DOCUMENT } from '@angular/common';

import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener
} from '@angular/core';
import { RightSidebarService } from '../../services/rightsidebar.service';
import { WINDOW } from '../../services/window.service';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";

const document: any = window.document;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  isNavbarShow: boolean;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  name: string;

  constructor(
    public authService: AuthService,
    private tokenStorageService: TokenStorageService,
    // tslint:disable-next-line:no-shadowed-variable
    @Inject(DOCUMENT) public document: Document,
    @Inject(WINDOW) private window: Window,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private dataService: RightSidebarService,
    private router: Router,
  ) {
  }

  // tslint:disable-next-line:ban-types
  notifications: Object[] = [
    {
      userImg: 'assets/images/user/user1.jpg',
      userName: 'Sarah Smith',
      time: '14 mins ago',
      message: 'Please check your mail'
    },
    {
      userImg: 'assets/images/user/user2.jpg',
      userName: 'Airi Satou',
      time: '22 mins ago',
      message: 'Work Completed !!!'
    },
    {
      userImg: 'assets/images/user/user3.jpg',
      userName: 'John Doe',
      time: '3 hours ago',
      message: 'kindly help me for code.'
    },
    {
      userImg: 'assets/images/user/user4.jpg',
      userName: 'Ashton Cox',
      time: '5 hours ago',
      message: 'Lets break for lunch...'
    },
    {
      userImg: 'assets/images/user/user5.jpg',
      userName: 'Sarah Smith',
      time: '14 mins ago',
      message: 'Please check your mail'
    },
    {
      userImg: 'assets/images/user/user6.jpg',
      userName: 'Airi Satou',
      time: '22 mins ago',
      message: 'Work Completed !!!'
    },
    {
      userImg: 'assets/images/user/user7.jpg',
      userName: 'John Doe',
      time: '3 hours ago',
      message: 'kindly help me for code.'
    }
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset =
      this.window.pageYOffset ||
      this.document.documentElement.scrollTop ||
      this.document.body.scrollTop ||
      0;
    if (offset > 50) {
      this.isNavbarShow = true;
    } else {
      this.isNavbarShow = false;
    }
  }

  ngOnInit() {
    this.setStartupStyles();
    // let isloggedin: string;
    // let loggedUser:string;
    // isloggedin = localStorage.getItem('isloggedIn');
    // loggedUser = localStorage.getItem('loggedUser');
    // if (isloggedin!=="true" || !loggedUser)
    //   this.router.navigate(['/authentication/signin']);
    // else
    //   this.authService.setLoggedUserFromLocalStorage(loggedUser);
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
     //  this.roles = user.roles;
    this.showAdminBoard = true;
     this.router.navigate(['dashboard/main']);
     //  this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.name = user.name;
      console.log('connexxxionn okkkk '+this.name)
    }

  }

  setStartupStyles() {
    // set theme on startup
    if (localStorage.getItem('theme')) {
      this.renderer.removeClass(this.document.body, 'dark');
      this.renderer.removeClass(this.document.body, 'light');
      this.renderer.addClass(this.document.body, localStorage.getItem('theme'));
    } else {
      this.renderer.addClass(this.document.body, 'light');
    }

    // set light sidebar menu on startup
    if (localStorage.getItem('menu_option')) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem('menu_option')
      );
    } else {
      this.renderer.addClass(this.document.body, 'menu_light');
    }

    // set logo color on startup
    if (localStorage.getItem('choose_logoheader')) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem('choose_logoheader')
      );
    } else {
      this.renderer.addClass(this.document.body, 'logo-white');
    }
  }

  callFullscreen() {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  mobileMenuSidebarOpen(event: any, className: string) {
    const hasClass = event.target.classList.contains(className);
    if (hasClass) {
      this.renderer.removeClass(this.document.body, className);
    } else {
      this.renderer.addClass(this.document.body, className);
    }
  }
  callSidemenuCollapse() {
    const hasClass = this.document.body.classList.contains('side-closed');
    if (hasClass) {
      this.renderer.removeClass(this.document.body, 'side-closed');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    } else {
      this.renderer.addClass(this.document.body, 'side-closed');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }
  public toggleRightSidebar(): void {
    this.dataService.changeMsg(
      (this.dataService.currentStatus._isScalar = !this.dataService
        .currentStatus._isScalar)
    );
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  onLogout(){
//    this.authService.logout();
  }
}
