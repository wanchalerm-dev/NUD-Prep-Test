import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { StudentService } from '../../../service/student.service';
import { SchoolService } from '../../../service/school.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss']
})
export class StudentCreateComponent implements OnInit {

  stateCtrl: FormControl;
  filteredStates: any;
  schoolGroupList = [];
  student = {
    id: '',
    personal_id: '',
    prename: '',
    firstname: '',
    lastname: '',
    school_name: '',
    school_test_id: window.localStorage.getItem('school_id'),
    level: 'ป.6',
    room: '',
    number: '',
    phone: ''
  };
  school_name: any;
  school_id: any;

  action: any;

  _sliderTickInterval = 1;
  sliderAutoTicks = false;
  sliderShowTicks = false;
  states = ['เด็กชาย', 'เด็กหญิง'];
  auto: any;

  constructor(private studentService: StudentService, private _router: Router, private activeRoute: ActivatedRoute, private schoolService: SchoolService) {
    this.schoolService.getNameSchoolGroup(window.localStorage.getItem('school_id')).then(resReturn => {
      console.log(resReturn);
    });
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(null),
      map(name => this.filterStates(name)));
    this.school_name = window.localStorage.getItem('school_name');
    this.school_id = window.localStorage.getItem('school_id');
    this.activeRoute.params.subscribe(p => {
      if(p.id == undefined){
        this.action = true;
      }else{
        this.action = false;
        let id = atob(p.id);
        // console.log(id);
        this.studentService.getAstudentInfo(id).then(stdInfo => {
          // console.log(stdInfo);
          this.student.id = stdInfo['student'][0]['id'];
          this.student.personal_id = stdInfo['student'][0]['personal_id'];
          this.student.prename = stdInfo['student'][0]['prename'];
          this.student.firstname = stdInfo['student'][0]['firstname'];
          this.student.lastname = stdInfo['student'][0]['lastname'];
          this.student.school_name = stdInfo['student'][0]['school_name'];
          this.student.school_test_id = window.localStorage.getItem('school_id');
          this.student.level = stdInfo['student'][0]['level'];
          this.student.room = stdInfo['student'][0]['room'];
          this.student.number = stdInfo['student'][0]['number'];
          this.student.phone = stdInfo['student'][0]['phone'];
        });
      }
    });

    
  }

  ngOnInit() {
  }

  filterStates(val: string) {
    return val ? this.states.filter((s) => new RegExp(val, 'gu').test(s)) : this.states;
  }

  get sliderTickInterval(): number | 'auto' {
    return this.sliderShowTicks ? (this.sliderAutoTicks ? 'auto' : this._sliderTickInterval) : null;
  }

  set sliderTickInterval(v) {
    this._sliderTickInterval = Number(v);
  }

  createStudent() {
    this.studentService.createAStudent(this.student).then(res => {
      // console.log(res);
      if (res['operation'] == 'success') {
        this._router.navigateByUrl('/Students');
      } else {
        alert('มีบางอย่างผิดพลาดโปรดติดต่อผู้ดูแลระบบ');
      }
    });
  }

  editStudent(){
    this.studentService.editStudent(this.student).then(res => {
      // console.log(res);
      this._router.navigateByUrl('/Students');
    });
  }

  gotoBack(){
    this._router.navigateByUrl('/Students');
  }
}
