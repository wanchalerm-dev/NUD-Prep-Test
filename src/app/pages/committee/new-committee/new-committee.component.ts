import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../../service/school.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-committee',
  templateUrl: './new-committee.component.html',
  styleUrls: ['./new-committee.component.scss']
})
export class NewCommitteeComponent implements OnInit {

  room = {
    room_name: '',
    building_name: '',
    committee1_prename: '',
    committee1_firstname: '',
    committee1_lastname: '',
    committee2_prename: '',
    committee2_firstname: '',
    committee2_lastname: ''
  };
  id;

  constructor(private schoolService: SchoolService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(param => {
      console.log(param);
      this.id = param.id;
      this.schoolService.getARoomTestInfo(this.id).then(res => {
        console.log(res);
        this.room = res['room'][0];
      });
    });
  }

  saveCommittee(){
    this.schoolService.updateCommittee(this.id, this.room.committee1_prename, this.room.committee1_firstname, this.room.committee1_lastname, this.room.committee2_prename, this.room.committee2_firstname, this.room.committee2_lastname).then(res => {
      console.log(res);
      if(res['operation'] == 'success'){
        this.router.navigateByUrl('/Committee');
      }
    });
  }
}
