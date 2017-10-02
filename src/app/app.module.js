"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var app_component_1 = require("./app.component");
var home_component_1 = require("./home/home.component");
var builder_component_1 = require("./builder/builder.component");
var resume_component_1 = require("./resume/resume.component");
var main_template_component_1 = require("./builder/templates/main-template.component");
var CvProfileImg_component_1 = require("./builder/templates/CvProfileImg.component");
var template1_component_1 = require("./builder/templates/template1.component");
var template2_component_1 = require("./builder/templates/template2.component");
var material_1 = require("@angular/material");
var animations_1 = require("@angular/platform-browser/animations");
var ngx_quill_1 = require("ngx-quill");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var userHttp_service_1 = require("./services/userHttp.service");
var appRoutes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'builder', component: builder_component_1.BuilderComponent },
    { path: 'resume', component: resume_component_1.ResumeComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [ng_bootstrap_1.NgbModule.forRoot(), platform_browser_1.BrowserModule, router_1.RouterModule.forRoot(appRoutes),
                forms_1.ReactiveFormsModule,
                material_1.MdButtonModule,
                material_1.MdMenuModule,
                material_1.MdCardModule,
                material_1.MdInputModule,
                material_1.MdToolbarModule,
                material_1.MdIconModule,
                material_1.MdDatepickerModule,
                material_1.MdNativeDateModule,
                animations_1.BrowserAnimationsModule,
                ngx_quill_1.QuillModule,
                http_1.HttpModule,
            ],
            declarations: [app_component_1.AppComponent, home_component_1.HomeComponent, builder_component_1.BuilderComponent, resume_component_1.ResumeComponent, template1_component_1.Template1Component, template2_component_1.Template2Component, main_template_component_1.MainTemplateComponent, CvProfileImg_component_1.CvProfileImgComponent],
            entryComponents: [],
            bootstrap: [app_component_1.AppComponent],
            providers: [userHttp_service_1.UserHttpService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map