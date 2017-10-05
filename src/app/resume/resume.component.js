"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var cv_data_service_1 = require("../services/cv-data.service");
var userHttp_service_1 = require("../services/userHttp.service");
var ResumeComponent = (function () {
    function ResumeComponent(UserHttpService, CvDataService) {
        this.UserHttpService = UserHttpService;
        this.CvDataService = CvDataService;
    }
    ResumeComponent.prototype.getMyResumes = function (page, id) {
        var _this = this;
        if (page === void 0) { page = null; }
        if (id === void 0) { id = null; }
        this.UserHttpService.get('resumes/all-my-resumes', id).subscribe(function (data) { _this.myResumes = data; console.log(data); });
    };
    ResumeComponent.prototype.getAllResumes = function (page, id) {
        var _this = this;
        if (page === void 0) { page = null; }
        if (id === void 0) { id = null; }
        this.UserHttpService.get('resumes/all-resumes', page, id).subscribe(function (data) { _this.allResumes = data; console.log(data); });
    };
    ResumeComponent.prototype.ngOnInit = function () {
        this.getMyResumes();
        this.getAllResumes();
    };
    ResumeComponent.prototype.copyCVLink = function () { };
    ResumeComponent.prototype.deleteCv = function () { };
    ResumeComponent.prototype.editCV = function () { };
    ResumeComponent = __decorate([
        core_1.Component({
            selector: 'resume',
            templateUrl: 'app/resume/resumeHtml.html',
            providers: [userHttp_service_1.UserHttpService, cv_data_service_1.CvDataService],
        }),
        __metadata("design:paramtypes", [userHttp_service_1.UserHttpService, cv_data_service_1.CvDataService])
    ], ResumeComponent);
    return ResumeComponent;
}());
exports.ResumeComponent = ResumeComponent;
//# sourceMappingURL=resume.component.js.map