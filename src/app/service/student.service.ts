import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';
import { first } from 'rxjs/operators';
import { Http, Response, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  getStudentList(school_id){
    const param = {
      school_id: school_id
    };
    return this._post(param, 'getMyStudentList');
  }

  createAStudent(student){
    const param = student;
    return this._post(param, 'createAStudent');
  }

  private _host;

  constructor(private _http: Http) {
    this._host = 'http://www.satit.nu.ac.th/node/nudPrepTest';
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
        // console.log(json);
        return json;
      })).subscribe((data) => {
        resolve(data);
      }, error => {
        return reject(error);
      });
    });
  }
}
