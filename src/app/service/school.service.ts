import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';
import { first } from 'rxjs/operators';
import { Http, Response, Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private _host;

  constructor(private _http: Http) {
    this._host = 'https://www.satit.nu.ac.th/node/nudPrepTest';
  }

  schoolInfo(schoolId){
    const param = {
      school_id: schoolId
    };
    return this._post(param, 'getSchoolInfo');
  }

  updateSchoolInfo(school){
    const param = school;
    return this._post(param, 'updateSchoolData');
  }

  createRoomTest(room){
    const param = room;
    return this._post(param, 'createRoomTest');
  }

  getMyRoomTestList(school_id){
    const param = {
      school_id: school_id
    };
    return this._post(param, 'getRoomTestListBySchool')
  }

  removeRoomTest(room){
    const param = room;
    return this._post(param, 'removeRoomTest');
  }

  getARoomTestInfo(id){
    const param = {
      id: id
    };
    return this._post(param, 'getARoomTestInfo');
  }

  editRoomTest(room){
    const param = room;
    return this._post(param, 'editRoomTest');
  }

  getNameSchoolGroup(id){
    const param = {
      school_id: id
    };
    return this._post(param, 'getNameSchoolGroup');
  }

  getNumberStudentGroupByLevel(id){
    const param = {
      school_id: id
    };
    return this._post(param, 'getCountGroupStudentLevel');
  }

  getCountSchool(school_id){
    const param = {
      school_id: school_id
    };
    return this._post(param, 'getCountSchool');
  }

  getPaymentInfoBySchool(school_id){
    const param = {
      school_id: school_id
    };
    return this._post(param, 'getPaymentInfoBySchool');
  }

  getCountMember(){
    const param = {
    };
    return this._post(param, 'getCountMember');
  }

  newPayment(school_id, image, amount, date){
    const param = {
      school_id: school_id,
      image: image,
      amount: amount,
      date: date
    };
    return this._post(param, 'insertPayment');
  }

  updateCommittee(room_id, committee1_prename, committee1_firstname, committee1_lastname, committee2_prename, committee2_firstname, committee2_lastname){
    const param = {
      room_id: room_id,
      committee1_prename: committee1_prename,
      committee1_firstname: committee1_firstname,
      committee1_lastname: committee1_lastname,
      committee2_prename: committee2_prename,
      committee2_firstname: committee2_firstname,
      committee2_lastname: committee2_lastname
    };
    return this._post(param, 'updateCommittee');
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
