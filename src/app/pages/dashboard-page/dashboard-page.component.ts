import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {TdDataTableService} from '@covalent/core';
import {ResizeService} from '../../resize/resize.service';
import {routerAnimation} from '../../utils/page.animation';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  animations: [routerAnimation]
})
export class DashboardPageComponent implements OnInit {
  
  @HostBinding('@routerAnimation') routerAnimation = true;


  constructor() {

  }

  ngOnInit(): void {
  }

}
