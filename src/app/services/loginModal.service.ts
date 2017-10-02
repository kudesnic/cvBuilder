import {Injectable} from '@angular/core';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class LoginModalService{
    constructor( public modalService: NgbModal){}
    private registerModal:any;
    private loginModal:any;
    private currentModalRef:any;
    public needLoggin:boolean = false;
    getRegisterModal(){
        return this.registerModal;
    }
    getLoginModal(){
        return this.loginModal;
    }
    setRegisterModal(data:any){
        this.registerModal  = data;
    }
    setLoginModal(data:any){
        this.loginModal  = data;
    }
    openLoginModal(){
        this.closeModal();

        this.currentModalRef = this.modalService.open(this.loginModal);
    }
    openRegisterModal(){

            this.closeModal();
        this.currentModalRef = this.modalService.open(this.registerModal);
    }
    setNeedLogin(data:boolean){
        this.needLoggin = data;
    }
    getNeedLogin(){
        return   this.needLoggin;
    }
    closeModal(){
        if(this.currentModalRef){
            this.currentModalRef.close();
            this.setNeedLogin(false);
        }

    }


}