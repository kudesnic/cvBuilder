import {Injectable} from '@angular/core';
import { UserHttpService }          from './userHttp.service';
import {Http} from '@angular/http';
import {Response, Headers, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class CvDataService{
    constructor(private http: Http, private UserHttpService:UserHttpService){ }
  private data: any = {
   fields:[],
    imgHeight:'',
    name:''
  };
    public baseUrl = 'http://cvbuilder.web-andryshka.ru/api/web/';
  getData() {
    console.log(this.data);
    return this.data;
  }
  addData(fieldsData:any, imgHeight:any = '', name:string = '' ){
    this.data.fields = fieldsData;
    this.data.imgHeight = imgHeight;
    this.data.name = name;
  }
    addImgHeght(imgHeight:any = 0 ){
        this.data.imgHeight = imgHeight;
        console.log(this.data);
    }

    addName(name:string = '' ){
        this.data.name = name;
        console.log(this.data);
    }
    getImgHeight(){
     return   this.data.imgHeight
    }

    getName(name:string = '' ){
       return this.data.name ;
    }




    saveData(fieldsData:any, imgHeight:any = '', name:string = ''){
        this.data.fields = fieldsData;
        this.data.imgHeight = imgHeight;
        this.data.name = name;

        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization ': 'Bearer '+this.UserHttpService.getToken() });
        var params = new URLSearchParams();
        params.set('fields', fieldsData);
        params.set('imgHeight', imgHeight);
        params.set('name', name);
        params.set('token', this.UserHttpService.getToken());
        return this.http.post(this.baseUrl = 'resumes', params.toString(), { headers: headers })
            .map(res => res.json())
            .catch((error:any) =>{return Observable.throw(error);});;
    }

}