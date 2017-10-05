import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Response, Headers, URLSearchParams, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {User} from '../user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class UserHttpService{

    public baseUrl = 'http://cvbuilder.web-andryshka.ru/api/web/';
    public isAuthorizedObsSubject:BehaviorSubject<boolean> ;
    constructor(private http: Http){
        if(!sessionStorage.getItem('token'))
            this.isAuthorizedObsSubject = new BehaviorSubject(false);
    }

    setUser(userData:any){
        this.isAuthorizedObsSubject.next(true);
        sessionStorage.setItem('token', userData.token);
        sessionStorage.setItem('username', userData.username);
    }
    getUsername(){
       return sessionStorage.getItem('username') ;
    }

    getToken(){
        let result = sessionStorage.getItem('token');
        if(result!='undefined')
            return result;
    }
    isAuthorized(){
        if( sessionStorage.getItem('token'))
            return true
        else
            return false;
    }
    logout(){
        sessionStorage.clear();
        this.isAuthorizedObsSubject.next(false);
       // sessionStorage.setItem('token', userData.token);
       // sessionStorage.setItem('username', userData.username);
    }
    isAuthorizedObservable():Observable<any> {
        return this.isAuthorizedObsSubject;
    }
        login(login:string, password:string){


        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var params = new URLSearchParams();
        params.set('login', login);
        params.set('password', password);
        var result = this.http.post(this.baseUrl + 'login', params.toString(), { headers: headers })
            .map(res => res.json())
            .catch((error:any) =>{  return Observable.throw(error);});

        return result;
    }




    get(urlPath:string,id:any = null, page:any = null,  ){

        var params = new URLSearchParams();
        if(id){
            params.set('id', id);
        }
        if(page){
            params.set('page', page);
        }
        var result = this.http.get(this.baseUrl + urlPath, { headers: this.generateHeaders(), params:params })
            .map(res => res.json())
            .catch((error:any) =>{  return Observable.throw(error);});
        return result;
    }


    delete(urlPath:string, id:number = null){
        if(id)
           var searchParams = new URLSearchParams('id=' + id);
        var result = this.http.delete(this.baseUrl + urlPath, new RequestOptions({
            search: searchParams,
            headers : this.generateHeaders()
        }))
            .map(res => res.json())
            .catch((error:any) =>{  return Observable.throw(error);});
        return result;
    }
    put(urlPath:string, id:string, data:any){

        var params = new URLSearchParams();
        for (var key in data) {
            console.log(key);
            params.set(key, data[key]);
        }
        var result = this.http.put(this.baseUrl + urlPath,params.toString(), new RequestOptions({
            search: new URLSearchParams('id=' + id),
            headers : this.generateHeaders()
        }))
            .map(res => res.json())
            .catch((error:any) =>{  return Observable.throw(error);});
        return result;
    }
    post(urlPath:string, data:any, useAuthorization:boolean = true, headers:any = null){

let parameters;
        if(data.constructor.name != 'FormData'){

            var params = new URLSearchParams();
            for (var index in data) {
                if (!data.hasOwnProperty(index)) {
                    continue;
                }
                params.set(index, data[index]);

            }
            parameters = params.toString();
        }
        else
            parameters = data;

       // console.log(params);
        var result = this.http.post(this.baseUrl + urlPath, parameters, new RequestOptions({
            headers : this.generateHeaders(useAuthorization, headers)
        }))
            .map(res => res.json())
            .catch((error:any) =>{  return Observable.throw(error);});
        return result;
    }

    private generateHeaders(useAuthorization:boolean = true, additionalHeaders:any = null){
        let headers : any;
        headers= new Headers();
        if(additionalHeaders != null)
        {
            if(!additionalHeaders.hasOwnProperty('Content-Type'))
                headers.append('Content-Type', 'application/x-www-form-urlencoded');
            for (var index in additionalHeaders) {
                if (!additionalHeaders.hasOwnProperty(index)) {
                    continue;
                }
                headers.append( index, additionalHeaders[index]);
                console.log(index, additionalHeaders[index]);

            }

        }

        if(this.isAuthorized() && useAuthorization)
            headers.append('Authorization', 'Bearer ' + this.getToken());
        return headers;
    }

}