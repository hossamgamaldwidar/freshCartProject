import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/Auth/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _Router: Router , private AuthService_:AuthService ,@Inject(PLATFORM_ID) private platformId: object) { }
  flag: boolean = false;
  UserName!: string 
  ngOnInit(): void {
      this.UserName = this._AuthService.userToken?.name ? 'Welcome : ' + this._AuthService.userToken.name : '';
             if(isPlatformBrowser(this.platformId)){
      if (sessionStorage.getItem('token')) {
        this.flag = true;
      } else {
        this.flag = false;
      }
    }
  }
  logOut() {
    sessionStorage.removeItem('token');
    this._Router.navigate(['/login']);
    this._AuthService.userToken.name = "";
    this._AuthService.userToken.id = "";
    this._AuthService.userToken.role = "";
    this._AuthService.userToken.iat = 0;
    this._AuthService.userToken.exp = 0;
  }
}
