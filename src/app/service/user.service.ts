import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';
import { first } from 'rxjs/operators';
import { Http, Response, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _host;

  constructor(private fireAuth: AngularFireAuth, private _http: Http) {
    this._host = 'https://www.satit.nu.ac.th/node/nudPrepTest';
  }

  private packParameter(param) {
    var _parameter = Object.keys(param).map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(param[key]);
    }).join('&');
    return _parameter;
  }

  private _post(param, action) {
    return new Promise((resolve, reject) => {
      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return this._http.post(this._host + '/' + action, this.packParameter(param), { headers: headers }).pipe(map((res: Response) => {
        let json;
        try {
          json = res.json();
        } catch (error) {

        }
        console.log(json);
        return json;
      })).subscribe((data) => {
        resolve(data);
      }, error => {
        return reject(error);
      });
    });
  }

  userSignOut() {
    return new Promise((reslove, reject) => {
      this.fireAuth.auth.signOut();
      reslove({ operation: 'loged out' });
    });
  }

  isLogin() {
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

  userLogin(email, password) {
    // return new Promise((resolve, reject) => {
    //   return this.fireAuth.auth.signInWithEmailAndPassword(email, password).then( sign => {
    //     resolve(sign);
    //   }).catch(error => {
    //     resolve(error);
    //   });
    // });
    const param = {
      username: email,
      password: password
    };
    return this._post(param, 'login');
  }

  userRegiste(email, password) {
    return new Promise((reslove, reject) => {
      return this.fireAuth.auth.createUserWithEmailAndPassword(email, password).then(auth => {
        reslove(auth);
      });
    });
  }
}
