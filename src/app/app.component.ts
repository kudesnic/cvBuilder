import { Component, ViewChild, OnInit } from '@angular/core';
import { UserHttpService }          from './services/userHttp.service';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { LoginModalService }          from './services/loginModal.service';



@Component({
  selector: 'my-app',
  templateUrl: './appHtml.html',
    styleUrls:['./app-component.css'],
})
export class AppComponent  implements OnInit    {
  constructor(private UserHttpService: UserHttpService,  private LoginModalService:LoginModalService){}
  name = 'Angular';

    public error:any;
    public regiterErrors:any;
    public isUserLogged:boolean = false;
    @ViewChild('registerModal') public registerModal:any;
    @ViewChild('loginModal') public loginModal:any;
    public loginForm:FormGroup = new FormGroup({
    loginField : new FormControl(),
  passwordField : new FormControl()
  });
    public registerForm:FormGroup = new FormGroup({
    usernameField : new FormControl('', [Validators.required,
        Validators.minLength(6),]),
    emailField : new FormControl('', [Validators.required,
        Validators.minLength(6),]),
  passwordField : new FormControl('', [Validators.required,
      Validators.minLength(6),]),
  passwordRepeatField : new FormControl('', [Validators.required,
      Validators.minLength(6),])
  });

    public ngOnInit(){
        this.LoginModalService.setLoginModal(this.loginModal);
        this.LoginModalService.setRegisterModal(this.registerModal);
        if(this.UserHttpService.isAuthorized()){
            this.isUserLogged = true;
        }
    }



  public login(){
   // console.log(this.loginForm.value);
    this.UserHttpService.login(this.loginForm.value.loginField, this.loginForm.value.passwordField).subscribe((data:any) => {
        if(data.success){
            this.UserHttpService.setUser(data);
            this.isUserLogged = true;
            this.LoginModalService.closeModal();

        }else{
            this.error = data.message;
        }
        console.log(this.UserHttpService.getToken() + ' token'); 

    });

  }


    public register(){
        if(!this.registerForm.valid){
            this.regiterErrors = 'Check your form!';
            return;
        }
        console.log(this.registerForm);
        console.log(this.registerForm.value.usernameField);
        console.log(this.registerForm.value['usernameField']);
        this.UserHttpService.post('login/registration', {'username':this.registerForm.value.usernameField,
            'email':this.registerForm.value.emailField, 'password':this.registerForm.value.passwordField})
            .subscribe((data : any) => {
            console.log(data);
            if(data.success){
                this.UserHttpService.setUser(data);
                this.isUserLogged = true;
                this.LoginModalService.closeModal();

            }else{
                this.regiterErrors = data.message;
            }

        });
    }
  public comparePasswords(){
      console.log('compare');
      if(this.registerForm.value['passwordField']!=this.registerForm.value['passwordRepeatField'])
          this.regiterErrors = 'Paswwords not compatible';
      else this.regiterErrors = false;
  }

    public logout(){
        this.UserHttpService.post('login/logout', {'token':this.UserHttpService.getToken()}, false).subscribe((data : any) => {
            this.UserHttpService.logout();
            if(data == true)
                this.isUserLogged = false;
        });

    }


}
