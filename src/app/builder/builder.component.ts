import {Component, OnInit, ViewChild, Input} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import { Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CvDataService }          from './../services/cv-data.service';
import { UserHttpService }          from './../services/userHttp.service';
import { LoginModalService }          from './../services/loginModal.service';
import * as html2canvas from '../../../node_modules/html2canvas/dist/html2canvas.js'
import * as jsPDF from '../../../node_modules/jspdf-fixed/dist/jspdf.min.js'

@Component({
  selector: 'builder',
  templateUrl: './builderHtml.html',
    providers:[CvDataService],
})
export class BuilderComponent implements OnInit  {

    private resumeId:number;
    private subscription: Subscription;
     noCustomBlocks:boolean = true;
     noWorks:boolean = true;
     noStudies:boolean = true;
     noLanguages:boolean = true;
    showTemplateView:boolean = false;
    public profileImageSrc:any;
    public photoFile:File;

    @ViewChild("registerModal ") registerModal:any;
    @ViewChild("workss")
        workss: any;
    @ViewChild("CvTpl")
    CvTpl: any;


    @ViewChild("profileImage")
    profileImage: any;






public fieldsData: any;
    public documentForm:FormGroup ;
    constructor(private CvDataService: CvDataService, private UserHttpService:UserHttpService,
                public LoginModalService:LoginModalService,private activateRoute: ActivatedRoute )
    {
        this.documentForm =  new FormGroup({
            name: new FormControl(''),
            secName: new FormControl(''),
            surName: new FormControl(''),
            positions: new FormControl(''),
            image: new FormControl(''),
            email:new FormControl(''),
            facebook:new FormControl(''),
            twitter:new FormControl(''),
            phone:new FormControl(''),
            phone2:new FormControl(''),
            skype:new FormControl(''),
            address:new FormControl(''),
            whoIAm:new FormControl(''),
            works:new FormArray([]),
            studies:new FormArray([]),
            lastWorks: new FormArray([]),
            languages: new FormArray([]),
            hobbies: new FormControl(''),
            whyI:new FormControl('') ,
            customBlocks:new FormArray([]),
            agreement:new FormControl(''),
            template:new FormControl('')
        });
        this.subscription = activateRoute.paramMap.subscribe(ParamsAsMap =>{this.resumeId = parseInt(ParamsAsMap.get('id')); console.log(parseInt(ParamsAsMap.get('id')) )});
        this.UserHttpService.get('resumes/' +  this.resumeId ).subscribe((data : any) => {
            console.log(data);
            console.log(this.documentForm);
            console.log( 'img',           this.documentForm.value.image);
            var obj =JSON.parse(data.data);
            console.log(obj.works);
            if(obj.works.length){
                console.log('llllength');
                for(let i=0; i<obj.works.length; i++)
                    this.addFields('works');
            }
            obj.image = '';
            obj.positions = data.positions;
            this.documentForm.setValue(obj);
            console.log( 'img',           this.documentForm.value.image);


            this.fieldsData = this.documentForm.value;


        });

    }
    public addFields(fieldsBlockName:string): void {
        var fields;
        switch(fieldsBlockName){
                case 'works': {
                    console.log('add fields');
                    fields = {companyName: new FormControl(''),
                        companyEmail: new FormControl(''),
                        companyPhone: new FormControl(''),
                        companyAddress: new FormControl(''),
                        workDuties: new FormControl(''),
                        companyDateStart:new FormControl(''),
                        companyDateEnd:new FormControl(''),
                    };
                    this.noWorks = false;
                    break;
                }
                case 'studies': {
                    fields = {universityName: new FormControl(''),
                        universityDirection: new FormControl(''),
                        universityDegree: new FormControl(''),
                        universityDateStart:new FormControl(''),
                        universityDateEnd:new FormControl('')
                    };
                    this.noStudies = false;
                    break;
                }
                case 'lastWorks': {
                    fields = {	lastWorkName: new FormControl(),
                        lastWorkLink: new FormControl('')
                    };
                    break;
                }
                case 'customBlocks': {
                    fields = {	customBlockName: new FormControl(''),
                        customBlockText: new FormControl('')
                    };
                    this.noCustomBlocks = false;
                    break;
                }
            case 'languages': {
                fields = {	language: new FormControl(''),
                    languageLevel: new FormControl('')
                };
                this.noLanguages = false;
                break;
            }
            }
        (<FormArray>this.documentForm.get(fieldsBlockName)).push(
            new FormGroup(fields)
        );
    }
    public removeFields( fieldsBlockName:string, i: number): void {
        (<FormArray>this.documentForm.get(fieldsBlockName)).removeAt(i);

        //console.log(Array.from(this.workss.nativeElement.children).filter(className => fieldsBlockName + '-form'));
      //  console.log(this.workss.nativeElement.childNodesAsList());


        if(!<FormArray>this.documentForm.get(fieldsBlockName).value.length) {
          switch(fieldsBlockName){
              case 'works':{
                  this.noWorks = true;
                  break;
              }
              case 'customBlocks':{
                  this.noCustomBlocks = true;
                  break;
              }

              case 'studies':{
                  this.noStudies = true;
                  break;
              }

              case 'languages':{
                  this.noLanguages = true;
                  break;
              }

            }
        }
    }
    public imageChoosed(event:any){
        let reader  = new FileReader();
        this.photoFile = event.target.files[0];
        reader.readAsDataURL(event.target.files[0]);
        reader.onloadend = (e) => {
            console.log('event');
            this.profileImageSrc = reader.result;
            this.profileImage.nativeElement.src=this.profileImageSrc;
        }
}
    public saveForm(event:any){
    if(!this.UserHttpService.isAuthorized()){
        this.LoginModalService.setNeedLogin(true);
        this.LoginModalService.openLoginModal();
       this.UserHttpService.isAuthorizedObservable().subscribe((data) => {

           if(!this.documentForm.value.template)
               this.documentForm.value.template = 1;
           this.fieldsData = this.documentForm.value;

           let formData = new FormData();
           if(this.photoFile.size > 10485760)
               throw 'The pho is to large!!!';
           formData.append('img', this.photoFile);
           formData.append('data', this.fieldsData);
           formData.append('position', this.fieldsData.positions);

        this.showTemplateView = true;
        this.UserHttpService.post('resumes',formData, true).subscribe((data : any) => {console.log(data)});
        //this.CvDataService.addData(this.fieldsData, '', 'MyOriginalCv');

    });
    }
    else {
        if(!this.documentForm.value.template)
            this.documentForm.value.template = 1;
        this.fieldsData = this.documentForm.value;
console.log(typeof  this.photoFile);
        let formData = new FormData();
        if(this.photoFile) {
            console.log(this.photoFile);
            if (this.photoFile.size > 10485760)
                throw 'The pho is to large!!!';
            formData.append('img', this.photoFile);
        }
        formData.append('data', JSON.stringify(this.fieldsData));
        formData.append('position', this.fieldsData.positions);
        //console.log(formData);
        console.log('fields data ', this.fieldsData);
       // console.log('img ', formData.get('img'));

      //  this.fieldsData = this.documentForm.value;
      //  this.showTemplateView = true;
        this.UserHttpService.post('resumes',formData, true).subscribe((data : any) => {console.log(data)});

    }

}
    public savePDF(event:any){
    var doc = new jsPDF('p', 'px','a4');
    // We'll make our own renderer to skip this editor
    doc.internal.scaleFactor = 14.24;
        var    element = this.CvTpl.nativeElement;



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

    let options = {
        pagesplit: true,
        
    };

    console.log(1111);
    doc.addHTML(element, 0, 0, options, () => {
        doc.save("test.pdf");
    });
}

    ngOnInit() {
       // this.addFields('works'); this.addFields('studies'); this.addFields('lastWorks');this.addFields('customBlocks');
    }
    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

}
