import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent }  from './app.component';
import { LinkDirective }  from './directives/link.directive';
import { HomeComponent } from './home/home.component';
import { BuilderComponent } from './builder/builder.component';
import { ResumeComponent } from './resume/resume.component';
import { NewsComponent } from './news/news.component';
import { MainTemplateComponent }     from './builder/templates/main-template.component';
import { CvProfileImgComponent }          from './builder/templates/CvProfileImg.component';
import { Template1Component }          from './builder/templates/template1.component';
import { Template2Component }          from './builder/templates/template2.component';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdInputModule, MdCheckboxModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpModule }   from '@angular/http';
import { UserHttpService }          from './services/userHttp.service';
import { LoginModalService }          from './services/loginModal.service';
import {ImageCropperComponent} from 'ng2-img-cropper';
import {ShareModule} from 'ng2share/share.module'

const appRoutes: Routes =[
  { path: '', component: HomeComponent},
  { path: 'builder', component: BuilderComponent},
  { path: 'resume/:id', component: BuilderComponent},
  { path: 'resumes', component: ResumeComponent},
  { path: 'news', component: NewsComponent},
  { path: 'news/:id', component: NewsComponent}
];

@NgModule({
  imports:      [  NgbModule.forRoot() , BrowserModule , RouterModule.forRoot(appRoutes),
     ReactiveFormsModule,
    FormsModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdInputModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdIconModule,
    MdDatepickerModule,
    MdNativeDateModule,
    BrowserAnimationsModule,
    QuillModule,
    HttpModule,
    ShareModule


  ],
  declarations: [ AppComponent, HomeComponent, BuilderComponent, ResumeComponent, NewsComponent, Template1Component, Template2Component,
    MainTemplateComponent, CvProfileImgComponent, LinkDirective, ImageCropperComponent ],
    entryComponents: [],
  bootstrap:    [ AppComponent ],
  providers:[UserHttpService, LoginModalService]
})
export class AppModule {

}
