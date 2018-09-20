import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../../service/school.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-building-create',
  templateUrl: './building-create.component.html',
  styleUrls: ['./building-create.component.scss']
})
export class BuildingCreateComponent implements OnInit {

  buildingName;
  roomName;
  roomCapacity;
  roomType = '0';
  id;

  action = 'create';

  constructor(private schoolService: SchoolService, private router: Router, private activeRoute: ActivatedRoute) {
    
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(param => {
      // console.log(param);
      this.id = atob(param.id);
      this.schoolService.getARoomTestInfo(this.id).then(resRoom => {
        let myRoom = resRoom['room'][0];
        this.buildingName = myRoom['building_name'];
        this.roomName = myRoom['room_name'];
        this.roomCapacity = myRoom['room_capacity'];
        this.roomType = myRoom['room_type'];
        this.action = 'edit';
      })
    });
  }

  createNewRoom() {
    const roomTest = {
      buildingName: this.buildingName,
      roomName: this.roomName,
      roomCapacity: this.roomCapacity,
      roomType: this.roomType,
      schoolTestId: window.localStorage.getItem('school_id')
    };
    console.log(roomTest);
    this.schoolService.createRoomTest(roomTest).then(res => {
      console.log(res);
      if(res['operation'] == 'success'){
        this.router.navigateByUrl('/Building');
      }else{
        alert('มีบางอย่างผิดพลาดโปรดติดต่อผู้ดูแลระบบ');
      }
    });
  }

  editRoom(){
    const room = {
      id: this.id,
      building_name: this.buildingName,
      room_name: this.roomName,
      room_capacity: this.roomCapacity,
      room_type: this.roomType
    }
    this.schoolService.editRoomTest(room).then(res => {
      if(res['operation'] == 'success'){
        this.router.navigateByUrl('/Building');
      }
    })
  }

}
