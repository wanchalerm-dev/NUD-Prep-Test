import { Component, OnInit, HostBinding } from '@angular/core';
import { SchoolService } from '../../../service/school.service';
import { DialogConfirmRemoveComponent } from './dialog-confirm-remove.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-building-home',
  templateUrl: './building-home.component.html',
  styleUrls: ['./building-home.component.scss']
})
export class BuildingHomeComponent implements OnInit {
  @HostBinding('@routerAnimation') routerAnimation = true;
  roomTestLis = [];
  roomLength = 0;
  testerCapacity: number = 0;
  schoolName = window.localStorage.getItem('school_name');

  constructor(private schoolService: SchoolService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.schoolService.getMyRoomTestList(window.localStorage.getItem('school_id')).then(res => {
      // console.log(res['roomTest']);
      this.roomTestLis = res['roomTest'];
      this.roomLength = this.roomTestLis.length;
      this.roomTestLis.forEach(element=> {
        this.testerCapacity += Number(element['room_capacity']);
      })
    });
  }

  openDialogConfirmRemoveRoom(room){
    let dialogRef = this.dialog.open(DialogConfirmRemoveComponent, {
      data: {
        roomName: room.room_name,
        buildingName: room.building_name
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result == 'YES') {
        this.schoolService.removeRoomTest(room).then(resRemove => {
          // console.log(resRemove);
          if(resRemove['operation'] == 'success'){
            this.ngOnInit();
          }
        });
      } else if (result == 'NO') {

      } else {

      }
    });
  }

  gotoEdit(id){
    this.router.navigateByUrl('/Building/EditBuilding/' + btoa(id));
  }

}
