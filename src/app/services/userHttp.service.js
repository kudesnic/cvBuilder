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
var http_1 = require("@angular/http");
var http_2 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var UserHttpService = (function () {
    function UserHttpService(http) {
        this.http = http;
        this.baseUrl = 'http://cvbuilder.web-andryshka.ru/api/web/';
    }
    UserHttpService.prototype.setUser = function (userData) {
        sessionStorage.setItem('token', userData.token);
        sessionStorage.setItem('username', userData.username);
    };
    UserHttpService.prototype.getUsername = function () {
        return sessionStorage.getItem('username');
    };
    UserHttpService.prototype.getToken = function () {
        var result = sessionStorage.getItem('token');
        if (result != 'undefined')
            return result;
    };
    UserHttpService.prototype.isAuthorized = function () {
        console.log(sessionStorage.getItem('token') + ' - token');
        if (sessionStorage.getItem('token'))
            return true;
        else
            return false;
    };
    UserHttpService.prototype.login = function (login, password) {
        var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var params = new http_2.URLSearchParams();
        params.set('login', login);
        params.set('password', password);
        var result = this.http.post(this.baseUrl + 'login', params.toString(), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
        return result;
    };
    UserHttpService.prototype.get = function (urlPath, page, id) {
        if (page === void 0) { page = null; }
        if (id === void 0) { id = null; }
        var params = new http_2.URLSearchParams();
        if (id) {
            params.set('id', id);
        }
        if (page) {
            params.set('id', id);
        }
        var result = this.http.get(this.baseUrl + urlPath, { headers: this.generateHeaders(), params: params })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
        return result;
    };
    UserHttpService.prototype.delete = function (urlPath, id) {
        var result = this.http.delete(this.baseUrl + urlPath, new http_2.RequestOptions({
            search: new http_2.URLSearchParams('id=' + id),
            headers: this.generateHeaders()
        }))
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
        return result;
    };
    UserHttpService.prototype.put = function (urlPath, id, data) {
        var params = new http_2.URLSearchParams();
        for (var key in data) {
            console.log(key);
            params.set(key, data[key]);
        }
        var result = this.http.put(this.baseUrl + urlPath, params.toString(), new http_2.RequestOptions({
            search: new http_2.URLSearchParams('id=' + id),
            headers: this.generateHeaders()
        }))
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
        return result;
    };
    UserHttpService.prototype.post = function (urlPath, data, useAuthorization) {
        if (useAuthorization === void 0) { useAuthorization = true; }
        var params = new http_2.URLSearchParams();
        for (var index in data) {
            if (!data.hasOwnProperty(index)) {
                continue;
            }
            params.set(index, data[index]);
        }
        var result = this.http.post(this.baseUrl + urlPath, params.toString(), new http_2.RequestOptions({
            headers: this.generateHeaders(useAuthorization)
        }))
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error); });
        return result;
    };
    UserHttpService.prototype.generateHeaders = function (useAuthorization) {
        if (useAuthorization === void 0) { useAuthorization = true; }
        var headers;
        headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        if (this.isAuthorized() && useAuthorization)
            headers.append('Authorization', 'Bearer ' + this.getToken());
        return headers;
    };
    UserHttpService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], UserHttpService);
    return UserHttpService;
}());
exports.UserHttpService = UserHttpService;
//# sourceMappingURL=userHttp.service.js.map