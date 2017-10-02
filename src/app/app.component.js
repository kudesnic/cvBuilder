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
var userHttp_service_1 = require("./services/userHttp.service");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var forms_1 = require("@angular/forms");
var AppComponent = (function () {
    function AppComponent(UserHttpService, modalService) {
        this.UserHttpService = UserHttpService;
        this.modalService = modalService;
        this.name = 'Angular';
        this.isUserLogged = false;
        this.loginForm = new forms_1.FormGroup({
            loginField: new forms_1.FormControl(),
            passwordField: new forms_1.FormControl()
        });
        this.registerForm = new forms_1.FormGroup({
            usernameField: new forms_1.FormControl('', [forms_1.Validators.required,
                forms_1.Validators.minLength(6),]),
            emailField: new forms_1.FormControl('', [forms_1.Validators.required,
                forms_1.Validators.minLength(6),]),
            passwordField: new forms_1.FormControl('', [forms_1.Validators.required,
                forms_1.Validators.minLength(6),]),
            passwordRepeatField: new forms_1.FormControl('', [forms_1.Validators.required,
                forms_1.Validators.minLength(6),])
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        if (this.UserHttpService.isAuthorized()) {
            this.isUserLogged = true;
        }
    };
    AppComponent.prototype.openModal = function (content) {
        this.modalRef = this.modalService.open(content);
    };
    AppComponent.prototype.login = function () {
        var _this = this;
        // console.log(this.loginForm.value);
        this.UserHttpService.login(this.loginForm.value.loginField, this.loginForm.value.passwordField).subscribe(function (data) {
            if (data.success) {
                _this.UserHttpService.setUser(data);
                _this.isUserLogged = true;
                _this.modalRef.close();
            }
            else {
                _this.error = data.message;
            }
            console.log(_this.UserHttpService.getToken() + ' token');
        });
    };
    AppComponent.prototype.register = function () {
        var _this = this;
        if (!this.registerForm.valid) {
            this.regiterErrors = 'Check your form!';
            return;
        }
        console.log(this.registerForm);
        console.log(this.registerForm.value.usernameField);
        console.log(this.registerForm.value['usernameField']);
        this.UserHttpService.post('login/registration', { 'username': this.registerForm.value.usernameField,
            'email': this.registerForm.value.emailField, 'password': this.registerForm.value.passwordField })
            .subscribe(function (data) {
            console.log(data);
            if (data.success) {
                _this.UserHttpService.setUser(data);
                _this.isUserLogged = true;
                _this.modalRef.close();
            }
            else {
                _this.regiterErrors = data.message;
            }
        });
    };
    AppComponent.prototype.comparePasswords = function () {
        console.log('compare');
        if (this.registerForm.value['passwordField'] != this.registerForm.value['passwordRepeatField'])
            this.regiterErrors = 'Paswwords not compatible';
        else
            this.regiterErrors = false;
    };
    AppComponent.prototype.logout = function () {
        var _this = this;
        this.UserHttpService.post('login/logout', { 'token': this.UserHttpService.getToken() }, false).subscribe(function (data) {
            if (data == true)
                _this.isUserLogged = false;
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/appHtml.html',
            styleUrls: ['./app-component.css'],
            providers: [userHttp_service_1.UserHttpService]
        }),
        __metadata("design:paramtypes", [userHttp_service_1.UserHttpService, ng_bootstrap_1.NgbModal])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map