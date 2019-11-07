import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../../service/school.service';

@Component({
  selector: 'app-home-committee',
  templateUrl: './home-committee.component.html',
  styleUrls: ['./home-committee.component.scss']
})
export class HomeCommitteeComponent implements OnInit {

  constructor(private schoolService: SchoolService) { }

  roomTestList = [];

  ngOnInit() {
    this.schoolService.getMyRoomTestList(window.localStorage.getItem('school_id')).then(res => {
      // console.log(res);
      this.roomTestList = res['roomTest'];
    });
  }

}
