import { Component, OnInit, HostBinding } from '@angular/core';
import { StudentService } from '../../../service/student.service';
import { DialogConfirmRemoveStudentComponent } from './dialog-confirm-remove-student.component';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {
  @HostBinding('@routerAnimation') routerAnimation = true;
  studentList = [];
  selectedOption: string;
  totalStudent: any;

  constructor(private studentService: StudentService, public dialog: MatDialog, public router: Router) { }

  ngOnInit() {
    this.showStudentList(window.localStorage.getItem('school_id'));
  }

  showStudentList(school_id) {
    this.studentService.getStudentList(school_id).then(resStudent => {
      // console.log(resStudent);
      this.studentList = resStudent['students'];
      this.totalStudent = this.studentList.length;
    });
  }

  deleteStudent(std) {
    // console.log(std);
    this.openDialog(std);
  }

  openDialog(std) {

    let dialogRef = this.dialog.open(DialogConfirmRemoveStudentComponent, {
      data: { student: std }
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result == 'YES') {
        this.studentService.removeStudent(std).then(res => {
          this.showStudentList(window.localStorage.getItem('school_id'));
        });
      } else if (result == 'NO') {

      } else {

      }
    });
  }

  editStudent(id){
    this.router.navigateByUrl('/Students/editStudent/' + btoa(id));
  }

}
