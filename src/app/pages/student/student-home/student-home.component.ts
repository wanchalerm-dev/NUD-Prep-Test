import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../service/student.service';


@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {

  studentList = [];

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.showStudentList(window.localStorage.getItem('school_id'));
  }

  showStudentList(school_id){
    this.studentService.getStudentList(school_id).then(resStudent => {
      console.log(resStudent);
      this.studentList = resStudent['students'];
    });
  }

}
