import {Injectable} from '@angular/core';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class LoginModalService{
    constructor( public modalService: NgbModal){}
    private registerModal:any;
    private loginModal:any;
    private infoModal:any;
    private infoModalText:string;
    private infoModalNoErrors:boolean = true;
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
    setInfoModal(data:any){
        this.infoModal  = data;
    }
    openLoginModal(){
        this.closeModal();

        this.currentModalRef = this.modalService.open(this.loginModal);
    }

    openInfoModal(infoModalText:string, infoModalNoErrors:boolean = null){
        this.closeModal();
        if(infoModalNoErrors)
            this.infoModalNoErrors = infoModalNoErrors;
        this.infoModalText = infoModalText;
        this.currentModalRef = this.modalService.open(this.infoModal);
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
            this.infoModalNoErrors = true;
            this.currentModalRef.close();
            this.setNeedLogin(false);
        }

    }


}