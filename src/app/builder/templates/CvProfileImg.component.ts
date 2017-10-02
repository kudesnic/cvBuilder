import {Component, Input, ViewChild, ElementRef, ViewEncapsulation, } from '@angular/core';




@Component({
  selector: 'cv-profile-img',
  templateUrl: './cv-profile-img.html',
    styleUrls: ['./cv-profile-img.css'],
    encapsulation: ViewEncapsulation.Emulated
})
export class CvProfileImgComponent    {
    @Input() profileImageSrc : any;
    @ViewChild('profileImage') profileImage:ElementRef;

   public makeImgBigger(){
       this.profileImage.nativeElement.height+=10;
   }
    public makeImgSmaller(){
        this.profileImage.nativeElement.height-=10;
    }
}
