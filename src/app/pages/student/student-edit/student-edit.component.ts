import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  goToStudentHome() {
    this._router.navigateByUrl('/Students');
  }

}
