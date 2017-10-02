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
var userHttp_service_1 = require("./userHttp.service");
var http_1 = require("@angular/http");
var http_2 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var CvDataService = (function () {
    function CvDataService(http, UserHttpService) {
        this.http = http;
        this.UserHttpService = UserHttpService;
        this.data = {
            fields: [],
            imgHeight: '',
            name: ''
        };
        this.baseUrl = 'http://cvbuilder.web-andryshka.ru/api/web/';
    }
    CvDataService.prototype.getData = function () {
        console.log(this.data);
        return this.data;
    };
    CvDataService.prototype.addData = function (fieldsData, imgHeight, name) {
        if (imgHeight === void 0) { imgHeight = ''; }
        if (name === void 0) { name = ''; }
        this.data.fields = fieldsData;
        this.data.imgHeight = imgHeight;
        this.data.name = name;
    };
    CvDataService.prototype.addImgHeght = function (imgHeight) {
        if (imgHeight === void 0) { imgHeight = 0; }
        this.data.imgHeight = imgHeight;
        console.log(this.data);
    };
    CvDataService.prototype.addName = function (name) {
        if (name === void 0) { name = ''; }
        this.data.name = name;
        console.log(this.data);
    };
    CvDataService.prototype.getImgHeight = function () {
        return this.data.imgHeight;
    };
    CvDataService.prototype.getName = function (name) {
        if (name === void 0) { name = ''; }
        return this.data.name;
    };
    CvDataService.prototype.saveData = function (fieldsData, imgHeight, name) {
        if (imgHeight === void 0) { imgHeight = ''; }
        if (name === void 0) { name = ''; }
        this.data.fields = fieldsData;
        this.data.imgHeight = imgHeight;
        this.data.name = name;
        var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization ': 'Bearer ' + this.UserHttpService.getToken() });
        var params = new http_2.URLSearchParams();
        params.set('fields', fieldsData);
        params.set('imgHeight', imgHeight);
        params.set('name', name);
        params.set('token', this.UserHttpService.getToken());
        return this.http.post(this.baseUrl = 'resumes', params.toString(), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
        ;
    };
    CvDataService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, userHttp_service_1.UserHttpService])
    ], CvDataService);
    return CvDataService;
}());
exports.CvDataService = CvDataService;
//# sourceMappingURL=cv-data.service.js.map