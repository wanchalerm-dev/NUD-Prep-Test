import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Http, Response, Headers, HttpModule } from '@angular/http';
import { MainPageComponent } from '../pages/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { LoginPageComponent } from '../pages/login-page/login-page.component';
import { DashboardPageComponent } from '../pages/dashboard-page/dashboard-page.component';

import { StudentHomeComponent } from '../pages/student/student-home/student-home.component';
import { StudentInfoComponent } from '../pages/student/student-info/student-info.component';
import { StudentCreateComponent } from '../pages/student/student-create/student-create.component';
import { StudentEditComponent } from '../pages/student/student-edit/student-edit.component';
import { StudentRemoveComponent } from '../pages/student/student-remove/student-remove.component';
import { SchoolHomeComponent } from '../pages/school/school-home/school-home.component';
import { SchoolEditComponent } from '../pages/school/school-edit/school-edit.component';


const PrepTest_ROUTES: Routes = [
  {
    path: 'School',
    component: MainPageComponent,
    canActivateChild: [],
    children:
      [
        {
          path: '',
          component: SchoolHomeComponent
        },
        {
          path: 'Home',
          component: SchoolHomeComponent
        },
        {
          path: 'Edit/:id',
          component: SchoolEditComponent
        }
      ]
  },
  {
    path: 'Home',
    component: MainPageComponent,
    canActivateChild: [],
    children:
      [
        {
          path: '',
          component: DashboardPageComponent
        }
      ]
  },
  {
    path: 'Students',
    component: MainPageComponent,
    canActivateChild: [],
    children:
      [
        {
          path: '',
          component: StudentHomeComponent
        },
        {
          path: 'Home',
          component: StudentHomeComponent
        },
        {
          path: 'info/:id',
          component: StudentInfoComponent
        }
      ]
  },
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'prefix' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(PrepTest_ROUTES),
  ],
  providers: [
  ]
})
export class AppRoutesModule {
}
