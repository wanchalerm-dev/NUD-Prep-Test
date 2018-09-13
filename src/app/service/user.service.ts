import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';
import { first } from 'rxjs/operators';
import { Http, Response, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fireAuth: AngularFireAuth) { }

  userSignOut(){
    return new Promise((reslove, reject) => {
      this.fireAuth.auth.signOut();
      reslove({operation: 'loged out'});
    });
  }

  isLogin(){
    return this.fireAuth.authState.pipe(first()).toPromise();
    // isLoggedIn().pipe(
    //   tap(user => {
    //     if (user) {
    //       // do something
    //     } else {
    //       // do something else
    //     }
    //   })
    // )
    // .subscribe()
  }

  userLogin(email, password){
    return new Promise((resolve, reject) => {
      return this.fireAuth.auth.signInWithEmailAndPassword(email, password).then( sign => {
        resolve(sign);
      }).catch(error => {
        console.log(error);
      });
    });
  }

  userRegiste(email, password){
    return new Promise((reslove, reject) => {
      return this.fireAuth.auth.createUserWithEmailAndPassword(email, password).then(auth => {
        reslove(auth);
      });
    });
  }
}
