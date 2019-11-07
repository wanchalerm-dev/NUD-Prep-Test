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
import { BuildingHomeComponent } from '../pages/building/building-home/building-home.component';
import { BuildingCreateComponent } from '../pages/building/building-create/building-create.component';
import { PaymentComponent } from '../pages/payment/payment.component';
import { HomeCommitteeComponent } from '../pages/committee/home-committee/home-committee.component';
import { NewCommitteeComponent } from '../pages/committee/new-committee/new-committee.component';
import { ProjectHomeComponent } from '../pages/project-home/project-home.component';
import { SchoolListComponent } from '../pages/school-list/school-list.component';
import { PaymentListComponent } from '../pages/payment-list/payment-list.component';
import { TestingResultListComponent } from '../pages/testing-result-list/testing-result-list.component';
import { GenerateTesterCodeComponent } from '../pages/generate-tester-code/generate-tester-code.component';
import {} from '../pages/tester-card/tester-card.component';

import { AdminRoleGuard } from '../guard/admin-role.guard';
import { GeneralUserRoleGuard } from '../guard/general-user-role.guard';

const PrepTest_ROUTES: Routes = [
  {
    path: 'Committee',
    component: MainPageComponent,
    canActivateChild: [],
    children: [
      { path: '', component: HomeCommitteeComponent },
      { path: 'Home', component: HomeCommitteeComponent },
      { path: 'NewCommittee/:id', component: NewCommitteeComponent },
      {
        path: 'EditCommittee/:id',
        component: NewCommitteeComponent
      }
    ]
  },
  {
    path: 'Payment',
    component: MainPageComponent,
    canActivateChild: [],
    children: [
      {
        path: '',
        component: PaymentComponent
      }
    ]
  },
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
        },
      ]
  },
  {
    path: 'Building',
    component: MainPageComponent,
    canActivateChild: [],
    children:
      [
        {
          path: '',
          component: BuildingHomeComponent
        },
        {
          path: 'Home',
          component: BuildingHomeComponent
        },
        {
          path: 'NewBuilding',
          component: BuildingCreateComponent
        },
        {
          path: 'EditBuilding/:id',
          component: BuildingCreateComponent
        }
      ]
  },
  {
    path: 'Home',
    component: MainPageComponent,
    canActivate: [GeneralUserRoleGuard],
    canActivateChild: [],
    children:
      [
        {
          path: '',
          component: DashboardPageComponent,
        }
      ]
  },
  {
    path: 'ProjectManagement',
    component: MainPageComponent,
    canActivate:[AdminRoleGuard],
    canActivateChild: [],
    children:
      [
        {
          path: '',
          component: ProjectHomeComponent
        },
        {
          path: 'Schools',
          component: SchoolListComponent
        },
        {
          path: 'Payment',
          component: PaymentListComponent
        },
        {
          path: 'GenerateTester',
          component: GenerateTesterCodeComponent
        },
        {
          path: ' ',
          component: TestingResultListComponent
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
        },
        {
          path: 'createStudent',
          component: StudentCreateComponent
        },
        {
          path: 'editStudent/:id',
          component: StudentCreateComponent
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
