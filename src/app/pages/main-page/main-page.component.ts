import { AfterViewInit, Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { ResizeService } from '../../resize/resize.service';
import { routerAnimation } from '../../utils/page.animation';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  animations: [routerAnimation]
})
export class MainPageComponent implements OnInit, AfterViewInit {
  @HostBinding('@routerAnimation') routerAnimation = true;
  @HostBinding('class.dark-theme') darkTheme = false;

  _sidenavMode = 'side';
  _boxedLayout = false;
  sideNavOpened = false;
  fullname: any;
  myPosition: any;
  school_name: any;
  user_image: any;
  role: any;
  testerCardLink: any;

  constructor(public resizeService: ResizeService, private router: Router) {
    this.onResize();
  }

  ngOnInit() {
    this.school_name = window.localStorage.getItem('school_name');
    this.role = window.localStorage.getItem('role');
    this.testerCardLink = 'http://www.satit.nu.ac.th/PrepTesting/TesterCard.php?school_code=' + btoa(window.localStorage.getItem('school_code'));
  }

  gotoDashboard() {
    this.router.navigateByUrl('/authorities/dashboard');
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.resizeService.resizeInformer$.next(), 500);
    setTimeout(() => {
      this.sideNavOpened = false;
      this._sidenavMode = 'push';
    }, 0);
  }

  set sidenavMode(val) {
    this._sidenavMode = val;
    setTimeout(() => this.resizeService.resizeInformer$.next(), 500);
  }

  get sidenavMode() {
    return this._sidenavMode;
  }

  set boxedLayout(val) {
    this._boxedLayout = val;
    setTimeout(() => this.resizeService.resizeInformer$.next(), 500);
  }

  get boxedLayout() {
    return this._boxedLayout;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (window.innerWidth < 800) {
      this.sideNavOpened = false;
      this._sidenavMode = 'over';
    }
  }

  logout() {
    window.localStorage.clear();
    window.sessionStorage.clear();
    this.gotoLoginPage();
  }

  login() {
    this.router.navigate(['./login']);
  }

  gotoLoginPage() {
    this.router.navigateByUrl('/login');
  }

}
