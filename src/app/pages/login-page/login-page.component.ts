import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerAnimation } from '../../utils/page.animation';
import { LogedinGuard } from '../../guard/logedin.guard';
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  animations: [routerAnimation]
})
export class LoginPageComponent implements OnInit {
  // Add router animation
  @HostBinding('@routerAnimation') routerAnimation = true;
  constructor(private router: Router) { }

  ngOnInit() {
    if(window.localStorage.getItem('token') != undefined){
      this.router.navigate(["/authorities/dashboard"]);
    }else{
      window.localStorage.clear();
      window.sessionStorage.clear();
    }
  }

  /**
   * Login method 
   * @param login
   * @param password
   */
  login(login, password) {
    
  }


}
