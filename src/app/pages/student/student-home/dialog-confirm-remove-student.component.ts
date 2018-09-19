import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
    student: any;
  }

@Component({
    selector: 'app-dialog-confirm-remove-student.component',
    templateUrl: './dialog-confirm-remove-student.component.html'
  })
  export class DialogConfirmRemoveStudentComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<DialogConfirmRemoveStudentComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    ngOnInit() {
    }
  
  }