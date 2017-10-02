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
var forms_1 = require("@angular/forms");
var cv_data_service_1 = require("./../services/cv-data.service");
var jsPDF = require("jspdf");
var BuilderComponent = (function () {
    function BuilderComponent(CvDataService) {
        this.CvDataService = CvDataService;
        this.noCustomBlocks = true;
        this.noWorks = true;
        this.noStudies = true;
        this.noLanguages = true;
        this.showTemplateView = false;
        this.documentForm = new forms_1.FormGroup({
            name: new forms_1.FormControl(''),
            secName: new forms_1.FormControl(''),
            surName: new forms_1.FormControl(''),
            image: new forms_1.FormControl(''),
            email: new forms_1.FormControl(''),
            facebook: new forms_1.FormControl(''),
            twitter: new forms_1.FormControl(''),
            phone: new forms_1.FormControl(''),
            phone2: new forms_1.FormControl(''),
            skype: new forms_1.FormControl(''),
            address: new forms_1.FormControl(''),
            whoIAm: new forms_1.FormControl(''),
            works: new forms_1.FormArray([]),
            studies: new forms_1.FormArray([]),
            lastWorks: new forms_1.FormArray([]),
            languages: new forms_1.FormArray([]),
            hobbies: new forms_1.FormControl(''),
            whyI: new forms_1.FormControl(''),
            customBlocks: new forms_1.FormArray([]),
            agreement: new forms_1.FormControl(''),
            template: new forms_1.FormControl('')
        });
    }
    BuilderComponent.prototype.addFields = function (fieldsBlockName) {
        var fields;
        switch (fieldsBlockName) {
            case 'works': {
                console.log('add fields');
                fields = { companyName: new forms_1.FormControl(''),
                    companyEmail: new forms_1.FormControl(''),
                    companyPhone: new forms_1.FormControl(''),
                    companyAddress: new forms_1.FormControl(''),
                    workDuties: new forms_1.FormControl(''),
                    companyDateStart: new forms_1.FormControl(''),
                    companyDateEnd: new forms_1.FormControl(''),
                };
                this.noWorks = false;
                break;
            }
            case 'studies': {
                fields = { universityName: new forms_1.FormControl(''),
                    universityDirection: new forms_1.FormControl(''),
                    universityDegree: new forms_1.FormControl(''),
                    universityDateStart: new forms_1.FormControl(''),
                    universityDateEnd: new forms_1.FormControl('')
                };
                this.noStudies = false;
                break;
            }
            case 'lastWorks': {
                fields = { lastWorkName: new forms_1.FormControl(),
                    lastWorkLink: new forms_1.FormControl('')
                };
                break;
            }
            case 'customBlocks': {
                fields = { customBlockName: new forms_1.FormControl(''),
                    customBlockText: new forms_1.FormControl('')
                };
                this.noCustomBlocks = false;
                break;
            }
            case 'languages': {
                fields = { language: new forms_1.FormControl(''),
                    languageLevel: new forms_1.FormControl('')
                };
                this.noLanguages = false;
                break;
            }
        }
        this.documentForm.get(fieldsBlockName).push(new forms_1.FormGroup(fields));
    };
    BuilderComponent.prototype.removeFields = function (fieldsBlockName, i) {
        this.documentForm.get(fieldsBlockName).removeAt(i);
        //console.log(Array.from(this.workss.nativeElement.children).filter(className => fieldsBlockName + '-form'));
        //  console.log(this.workss.nativeElement.childNodesAsList());
        if (!this.documentForm.get(fieldsBlockName).value.length) {
            switch (fieldsBlockName) {
                case 'works': {
                    this.noWorks = true;
                    break;
                }
                case 'customBlocks': {
                    this.noCustomBlocks = true;
                    break;
                }
                case 'studies': {
                    this.noStudies = true;
                    break;
                }
                case 'languages': {
                    this.noLanguages = true;
                    break;
                }
            }
        }
    };
    BuilderComponent.prototype.imageChoosed = function (event) {
        var _this = this;
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onloadend = function (e) {
            console.log('event');
            _this.profileImageSrc = reader.result;
            _this.profileImage.nativeElement.src = _this.profileImageSrc;
        };
        /*  reader.onload = (e) => {
              // this 'text' is the content of the file
              console.log('event2');
              console.log(reader.result);
          }*/
    };
    BuilderComponent.prototype.saveForm = function (event) {
        console.log(this.documentForm);
        console.log(this.documentForm.value);
        this.fieldsData = this.documentForm.value;
        this.showTemplateView = true;
        this.CvDataService.addData(this.fieldsData, '', 'MyOriginalCv');
    };
    BuilderComponent.prototype.savePDF = function (event) {
        var doc = new jsPDF('p', 'px', 'a4');
        // We'll make our own renderer to skip this editor
        doc.internal.scaleFactor = 14.24;
        var element = this.CvTpl.nativeElement;
        console.log(this.CvTpl.nativeElement);
        var w = element.clientWidth;
        var h = element.clientHeight;
        var newCanvas = document.createElement('canvas');
        newCanvas.width = w * 2;
        newCanvas.height = h * 2;
        newCanvas.style.width = w + 'px';
        newCanvas.style.height = h + 'px';
        var context = newCanvas.getContext('2d');
        context.scale(2, 2);
        var options = {
            pagesplit: true,
        };
        console.log(1111);
        doc.addHTML(element, 0, 0, options, function () {
            doc.save("test.pdf");
        });
    };
    BuilderComponent.prototype.ngOnInit = function () {
        // this.addFields('works'); this.addFields('studies'); this.addFields('lastWorks');this.addFields('customBlocks');
    };
    __decorate([
        core_1.ViewChild("workss"),
        __metadata("design:type", Object)
    ], BuilderComponent.prototype, "workss", void 0);
    __decorate([
        core_1.ViewChild("CvTpl"),
        __metadata("design:type", Object)
    ], BuilderComponent.prototype, "CvTpl", void 0);
    __decorate([
        core_1.ViewChild("profileImage"),
        __metadata("design:type", Object)
    ], BuilderComponent.prototype, "profileImage", void 0);
    BuilderComponent = __decorate([
        core_1.Component({
            selector: 'builder',
            templateUrl: 'app/builder/builderHtml.html',
            providers: [cv_data_service_1.CvDataService],
        }),
        __metadata("design:paramtypes", [cv_data_service_1.CvDataService])
    ], BuilderComponent);
    return BuilderComponent;
}());
exports.BuilderComponent = BuilderComponent;
//# sourceMappingURL=builder.component.js.map