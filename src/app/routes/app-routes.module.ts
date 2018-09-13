import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Http, Response, Headers, HttpModule } from '@angular/http';
import { MainPageComponent } from '../pages/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { LoginPageComponent } from '../pages/login-page/login-page.component';
import { DashboardPageComponent } from '../pages/dashboard-page/dashboard-page.component';

const PrepTest_ROUTES: Routes = [
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
  { path: 'login', component: LoginPageComponent },
  // { path: '', redirectTo: 'Home', pathMatch: 'full' },
  // { path: '**', redirectTo: 'Home', pathMatch: 'prefix' }
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
