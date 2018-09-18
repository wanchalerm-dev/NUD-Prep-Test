import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../../service/school.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-school-home',
  templateUrl: './school-home.component.html',
  styleUrls: ['./school-home.component.scss']
})
export class SchoolHomeComponent implements OnInit {

  constructor(private school: SchoolService, private _router: Router) { }
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
  type:any = false;

  ngOnInit() {
    this.school.schoolInfo(
      window.localStorage.getItem('school_id')
    ).then(data => {
      this.name = data['school'][0]['name'];
      this.type = (data['school'][0]['type'] == "1")? true: false;
      
      this.address = "";
      if (data['school'][0]['ads_number'] != '') {
        this.address += 'เลขที่' + data['school'][0]['ads_number'];
      } if (data['school'][0]['ads_village'] != '') {
        this.address += ' หมู่' + data['school'][0]['ads_village'];
      } if (data['school'][0]['ads_alley'] != '') {
        this.address += ' ซอย' + data['school'][0]['ads_alley'];
      } if (data['school'][0]['ads_road'] != '') {
        this.address += ' ถนน' + data['school'][0]['ads_road'];
      } if (data['school'][0]['ads_subdistrict'] != '') {
        this.address += ' ตำบล' + data['school'][0]['ads_subdistrict'];
      } if (data['school'][0]['ads_district'] != '') {
        this.address += ' อำเภอ' + data['school'][0]['ads_district'];
      } if (data['school'][0]['ads_city'] != '') {
        this.address += ' จังหวัด' + data['school'][0]['ads_city'];
      } if (data['school'][0]['ads_zipcode'] != '') {
        this.address += ' รหัสไปรษณีย์ ' + data['school'][0]['ads_zipcode'];
      } 
      this.ads_phone = data['school'][0]['ads_phone'];
      this.ads_fax = data['school'][0]['ads_fax'];
    });

  }

  gotoEdit(){
    this._router.navigateByUrl('/School/Edit/' + window.localStorage.getItem('school_id'));
  }

}
