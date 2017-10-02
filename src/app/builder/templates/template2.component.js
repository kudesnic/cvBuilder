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
var Template2Component = (function (_super) {
    __extends(Template2Component, _super);
    function Template2Component() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Template2Component = __decorate([
        core_1.Component({
            selector: 'cv-tpl-2',
            templateUrl: 'app/builder/templates/2.html',
            styleUrls: ['app/builder/templates/template1.component.css', './template2.component.css'],
            encapsulation: core_1.ViewEncapsulation.Emulated // <------
        })
    ], Template2Component);
    return Template2Component;
}(main_template_component_1.MainTemplateComponent));
exports.Template2Component = Template2Component;
//# sourceMappingURL=template2.component.js.map