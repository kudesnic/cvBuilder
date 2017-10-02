"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var main_template_component_1 = require("./main-template.component");
var Template1Component = (function (_super) {
    __extends(Template1Component, _super);
    function Template1Component() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Template1Component = __decorate([
        core_1.Component({
            selector: 'cv-tpl-1',
            templateUrl: 'app/builder/templates/1.html',
            styleUrls: ['app/builder/templates/template1.component.css',],
            encapsulation: core_1.ViewEncapsulation.Emulated // <------
        })
    ], Template1Component);
    return Template1Component;
}(main_template_component_1.MainTemplateComponent));
exports.Template1Component = Template1Component;
//# sourceMappingURL=template1.component.js.map