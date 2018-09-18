import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { StudentService } from '../../../service/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss']
})
export class StudentCreateComponent implements OnInit {

  stateCtrl: FormControl;
  filteredStates: any;
  student = {
    personal_id: '',
    prename: '',
    firstname: '',
    lastname: '',
    school_name: '',
    school_test_id: window.localStorage.getItem('school_id'),
    level: '',
    room: '',
    number: '',
    phone: ''
  };
  school_name: any;
  school_id: any;

  _sliderTickInterval = 1;
  sliderAutoTicks = false;
  sliderShowTicks = false;
  states = [ 'เด็กชาย', 'เด็กหญิง' ];
  auto: any;

  constructor(private studentService: StudentService, private _router: Router) { 
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges.pipe(
      startWith(null),
      map(name => this.filterStates(name)));
      this.school_name = window.localStorage.getItem('school_name');
      this.school_id = window.localStorage.getItem('school_id');
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

  createStudent(){
    this.studentService.createAStudent(this.student).then(res => {
      console.log(res);
      if(res['operation'] == 'success'){
        this._router.navigateByUrl('/Students')
      }else{
        alert('มีบางอย่างผิดพลาดโปรดติดต่อผู้ดูแลระบบ');
      }
    });
  }
}
