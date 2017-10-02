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
var CvProfileImgComponent = (function () {
    function CvProfileImgComponent() {
    }
    CvProfileImgComponent.prototype.makeImgBigger = function () {
        this.profileImage.nativeElement;
    };
    CvProfileImgComponent.prototype.makeImgSmaller = function () {
        this.profileImage.nativeElement;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CvProfileImgComponent.prototype, "profileImageSrc", void 0);
    __decorate([
        core_1.ViewChild('profileImage'),
        __metadata("design:type", core_1.ElementRef)
    ], CvProfileImgComponent.prototype, "profileImage", void 0);
    CvProfileImgComponent = __decorate([
        core_1.Component({
            selector: 'cv-profile-img',
            template: 'cv-profile-img.html',
        })
    ], CvProfileImgComponent);
    return CvProfileImgComponent;
}());
exports.CvProfileImgComponent = CvProfileImgComponent;
//# sourceMappingURL=mainTemplate.component.js.map