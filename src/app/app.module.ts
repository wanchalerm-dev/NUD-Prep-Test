import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {AppComponent} from './app.component';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CustomFormsModule} from 'ng2-validation';
import { NgModule } from '@angular/core';
import {
  CovalentCommonModule,
  CovalentDataTableModule,
  CovalentFileModule,
  CovalentMediaModule,
  CovalentNotificationsModule,
  CovalentPagingModule,
  CovalentSearchModule,
  CovalentStepsModule
} from '@covalent/core';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {SidemenuModule} from './sidemenu/sidemenu.module';
import {ResizeModule} from './resize/resize.module';
import {AppRoutesModule} from './routes/app-routes.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {OverlayModule} from '@angular/cdk/overlay';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  MatExpansionModule
} from '@angular/material';
import {PortalModule} from '@angular/cdk/portal';
import {NgxEchartsModule} from 'ngx-echarts';
import {QuillModule} from 'ngx-quill';
import {CommonModule} from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {};

// AoT requires an exported function for factories for translate module
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { angularFire } from '../environments/environment';
import { StudentHomeComponent } from './pages/student/student-home/student-home.component';
import { StudentCreateComponent } from './pages/student/student-create/student-create.component';
import { StudentInfoComponent } from './pages/student/student-info/student-info.component';
import { StudentEditComponent } from './pages/student/student-edit/student-edit.component';
import { StudentRemoveComponent } from './pages/student/student-remove/student-remove.component';
import { SchoolHomeComponent } from './pages/school/school-home/school-home.component';
import { SchoolEditComponent } from './pages/school/school-edit/school-edit.component';

@NgModule({
  declarations: [
    AppComponent, MainPageComponent,
    LoginPageComponent,
    DashboardPageComponent,
    StudentHomeComponent,
    StudentCreateComponent,
    StudentInfoComponent,
    StudentEditComponent,
    StudentRemoveComponent,
    SchoolHomeComponent,
    SchoolEditComponent,
  
  ],
  entryComponents: [
  ],
  imports: [
    AngularFireModule.initializeApp(angularFire),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    CommonModule,
    QuillModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    MatExpansionModule,
    OverlayModule,
    PortalModule,
    SidemenuModule,
    PerfectScrollbarModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    CustomFormsModule,
    NgxEchartsModule,
    CovalentMediaModule,
    CovalentFileModule,
    CovalentStepsModule,
    CovalentDataTableModule,
    CovalentSearchModule,
    CovalentPagingModule,
    CovalentNotificationsModule,
    CovalentCommonModule,
    ResizeModule,
    HttpClientModule,
    FileUploadModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    RouterModule,
    HttpModule,
    AppRoutesModule
  ],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  },
],
  bootstrap: [AppComponent]
})
export class AppModule {
}
