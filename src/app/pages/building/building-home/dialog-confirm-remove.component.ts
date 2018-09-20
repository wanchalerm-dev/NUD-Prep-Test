import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
    room: any;
  }

@Component({
    selector: 'dialog-confirm-remove.component',
    templateUrl: './dialog-confirm-remove.component.html'
  })
  export class DialogConfirmRemoveComponent implements OnInit {

    roomName;
    buildingName;

    constructor(public dialogRef: MatDialogRef<DialogConfirmRemoveComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    ngOnInit() {
      console.log(this.data);
      this.roomName = this.data['roomName'];
      this.buildingName = this.data['buildingName'];
    }

    
  
  }