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
      this.user.userSignOut();
      window.localStorage.clear();
      window.sessionStorage.clear();
  }

  /**
   * Login method 
   * @param login
   * @param password
   */
  login(login, password) {
    this.user.userLogin(login, password).then(user => {
      if(user['user'].length > 0){
        console.log(user['user']);
        window.localStorage.setItem('id', user['user'][0]['id']);
        window.localStorage.setItem('username', user['user'][0]['username']);
        window.localStorage.setItem('role', user['user'][0]['role']);
        window.localStorage.setItem('prename', user['user'][0]['prename']);
        window.localStorage.setItem('firstname', user['user'][0]['firstname']);
        window.localStorage.setItem('lastname', user['user'][0]['lastname']);
        window.localStorage.setItem('email', user['user'][0]['email']);
        window.localStorage.setItem('phone', user['user'][0]['phone']);
        window.localStorage.setItem('school_id', user['user'][0]['school_id']);
        this.router.navigateByUrl('/Home');
      }else{
        this.errorMessage = 'มีบางอย่างผิดพลาด Username หรือ Password ไม่ถูกต้อง กรุณาลองอีกครั้ง';
        this.isShowErrorMessage = true;
      }
    });
  }


}
