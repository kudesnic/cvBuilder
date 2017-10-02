import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent }  from './app.component';
import { HomeComponent } from './home/home.component';
import { BuilderComponent } from './builder/builder.component';
import { ResumeComponent } from './resume/resume.component';
import { MainTemplateComponent }     from './builder/templates/main-template.component';
import { CvProfileImgComponent }          from './builder/templates/CvProfileImg.component';
import { Template1Component }          from './builder/templates/template1.component';
import { Template2Component }          from './builder/templates/template2.component';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdInputModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule }   from '@angular/http';
import { UserHttpService }          from './services/userHttp.service';
import { LoginModalService }          from './services/loginModal.service';

const appRoutes: Routes =[
  { path: '', component: HomeComponent},
  { path: 'builder', component: BuilderComponent},
  { path: 'resume', component: ResumeComponent}
];

@NgModule({
  imports:      [  NgbModule.forRoot() , BrowserModule , RouterModule.forRoot(appRoutes),
     ReactiveFormsModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdInputModule,
    MdToolbarModule,
    MdIconModule,
    MdDatepickerModule,
    MdNativeDateModule,
    BrowserAnimationsModule,
    QuillModule,
    HttpModule,

  ],
  declarations: [ AppComponent, HomeComponent, BuilderComponent, ResumeComponent, Template1Component, Template2Component, MainTemplateComponent, CvProfileImgComponent ],
    entryComponents: [],
  bootstrap:    [ AppComponent ],
  providers:[UserHttpService, LoginModalService]
})
export class AppModule {

}
