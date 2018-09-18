import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SchoolService } from '../../../service/school.service';

@Component({
  selector: 'app-school-edit',
  templateUrl: './school-edit.component.html',
  styleUrls: ['./school-edit.component.scss']
})
export class SchoolEditComponent implements OnInit {

  schoolInfo: any;
  name: any;
  ads_alley: any;
  ads_city: any;
  ads_district: any;
  ads_fax: any;
  ads_number: any;
  ads_phone: any;
  ads_road: any;
  ads_subdistrict: any;
  ads_village: any;
  ads_zipcode: any;
  code: any;
  logo_url: any;
  website: any;
  address: any;
  type: any = false;

  constructor(private _router: Router, private school: SchoolService, ) { }

  ngOnInit() {
    this.school.schoolInfo(
      window.localStorage.getItem('school_id')
    ).then(data => {
      // console.log(data);
      this.schoolInfo = data['school'][0];
      // console.log(this.schoolInfo);
    });
  }

  updateSchoolInfo() {
    this.school.updateSchoolInfo(this.schoolInfo).then(res => {
      // console.log(res);
      if (res['operation'] == "success") {
        this._router.navigateByUrl('/School/Home');
      } else {
        alert("มีบางอย่างผิดพลาดโปรดติดต่อผู้ดูแลระบบ");
      }
    });
  }

  gotoBack() {
    this._router.navigateByUrl('/School/Home');
  }


}
