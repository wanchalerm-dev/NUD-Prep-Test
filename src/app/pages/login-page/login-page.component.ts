import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerAnimation } from '../../utils/page.animation';
import { LogedinGuard } from '../../guard/logedin.guard';
import { NgModule } from '@angular/core';
import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  animations: [routerAnimation]
})
export class LoginPageComponent implements OnInit {
  // Add router animation
  @HostBinding('@routerAnimation') routerAnimation = true;

  isShowErrorMessage = false;
  errorMessage = ""
  constructor(private router: Router, private user: UserService) { }

  ngOnInit() {
    if(window.localStorage.getItem('token') != undefined){
      this.router.navigate(["/authorities/dashboard"]);
    }else{
      this.user.userSignOut();
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
    this.user.userLogin(login + '@nu.ac.th', password).then(user => {
      if(user['user']['uid'] != undefined){
        this.router.navigateByUrl('/Home');
      }else{
        this.errorMessage = user['message'];
        this.isShowErrorMessage = true;
      }
    });
  }


}
