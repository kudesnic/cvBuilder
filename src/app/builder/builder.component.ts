import {Component, OnInit, ViewChild, Input, AfterContentChecked} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import { Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CvDataService }          from './../services/cv-data.service';
import { UserHttpService }          from './../services/userHttp.service';
import { LoginModalService }          from './../services/loginModal.service';
import * as html2canvas from '../../../node_modules/html2canvas/dist/html2canvas.js'
import * as jsPDF from '../../../node_modules/jspdf-fixed/dist/jspdf.min.js'
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';



@Component({
  selector: 'builder',
  templateUrl: './builderHtml.html',
    providers:[CvDataService],
})
export class BuilderComponent implements OnInit, AfterContentChecked  {

    private resumeId:number;
    private subscription: Subscription;
     noCustomBlocks:boolean = true;
     noWorks:boolean = true;
     noStudies:boolean = true;
     noLanguages:boolean = true;
    showTemplateView:boolean = false;
    showBuilder:boolean = false;
    showCropper:boolean = false;
    public profileImageSrc:any;
    public photoFile:File;
    public couldEdit:boolean = false;
    cropperSettings:CropperSettings;
    croppedWidth:number;
    croppedHeight:number;
    newImg:any;
    @ViewChild("registerModal ") registerModal:any;
    @ViewChild("workss")
        workss: any;
    @ViewChild("CvTpl")
    CvTpl: any;


    @ViewChild("profileImage")
    profileImage: any;
    @ViewChild('cropper', undefined) cropper:ImageCropperComponent;





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

        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 200;
        this.cropperSettings.height = 200;

        this.cropperSettings.croppedWidth = 200;
        this.cropperSettings.croppedHeight = 200;

        /*  this.cropperSettings.canvasWidth = 500;
            this.cropperSettings.canvasHeight = 300;
        */
        this.cropperSettings.minWidth = 10;
        this.cropperSettings.minHeight = 10;

        this.cropperSettings.rounded = false;
        this.cropperSettings.keepAspect = false;
        this.cropperSettings.noFileInput = true;

        this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
        this.newImg = {};

        this.subscription = activateRoute.paramMap.subscribe(ParamsAsMap =>{
            this.resumeId = parseInt(ParamsAsMap.get('id'));
        });
        if(this.resumeId){

            this.UserHttpService.get('resumes/' +  this.resumeId ).subscribe((data : any) => {
                console.log(data);

                var obj =JSON.parse(data.data);
                obj.image = data.img;
                this.profileImageSrc = this.UserHttpService.rootUrl + data.img;

                for(let param in obj){
                    if(typeof  obj[param] != 'string')
                        for(var i=0; i<obj[param].length; i++)
                            this.addFields(param);
                }
                this.documentForm.setValue(obj);
                if(this.documentForm.value.works.length)
                    for(var i = 0; i<this.documentForm.value.works.length; i++){
                        console.log(this.documentForm.value.works[i].companyDateStart);
                        this.documentForm.value.works[i].companyDateStart = new Date(this.documentForm.value.works[i].companyDateStart);
                        this.documentForm.value.works[i].companyDateEnd = new Date(this.documentForm.value.works[i].companyDateEnd);
                    }
                if(this.documentForm.value.studies.length)
                    for(var i = 0; i<this.documentForm.value.studies.length; i++){
                        console.log(this.documentForm.value.studies[i].companyDateStart);
                        this.documentForm.value.studies[i].universityDateStart = new Date(this.documentForm.value.studies[i].universityDateStart);
                        this.documentForm.value.studies[i].universityDateEnd = new Date(this.documentForm.value.studies[i].universityDateEnd);
                    }
                this.fieldsData = this.documentForm.value;
                this.showTemplateView = true;
                if(this.UserHttpService.isAuthorized() && this.UserHttpService.getUserId() == data.user_id )
                {

                    this.couldEdit = true;
                    console.log('I can  edit', this.documentForm);
                }
            });

        }
        else {
            this.showBuilder = true;
            this.couldEdit = true;
            this.documentForm.value.template = 1;
        }

    }
    cropped(bounds:Bounds) {
        this.croppedHeight =bounds.bottom-bounds.top;
        this.croppedWidth = bounds.right-bounds.left;
        this.profileImageSrc = this.newImg.image;
        this.photoFile = this.dataURLtoFile(this.profileImageSrc , Math.random().toString(36).substring(2, 13)
            + this.documentForm.value.name + this.documentForm.value.surName + '.jpg' );
        console.log(this.photoFile, 'file22222222');


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
        console.log(this.photoFile, 'file11111');
        reader.readAsDataURL(event.target.files[0]);
        reader.onloadend = (e) => {
            this.showCropper = true;
            var image = new Image();
            image.src = reader.result;
            this.cropper.setImage(image);
            this.profileImageSrc = reader.result;
            this.profileImage.nativeElement.src=this.profileImageSrc;
        }

    }
    private dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:'image/jpeg'});
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
           if(this.photoFile) {
               if (this.photoFile.size > 10485760)
                   throw 'The pho is to large!!!';
               formData.append('img', this.photoFile);
           }
           formData.append('data', JSON.stringify(this.fieldsData));
           formData.append('position', this.fieldsData.positions);
           //console.log(formData);
           console.log('fields data ', this.fieldsData);
           //  this.fieldsData = this.documentForm.value;
           //  this.showTemplateView = true;
           this.UserHttpService.post('resumes',formData, true).subscribe((data : any) => {console.log(data)});

    });
    }
    else {
        if(!this.documentForm.value.template)
            this.documentForm.value.template = 1;
        this.fieldsData = this.documentForm.value;
        let formData = new FormData();
        if(this.photoFile) {
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

    ngAfterContentChecked() {

    }
    ngOnInit(){


    }
    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

}
