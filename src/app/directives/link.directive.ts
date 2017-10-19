/**
 * Created by Андрей on 03.10.2017.
 */
import {Directive, ElementRef} from '@angular/core';
@Directive({
    selector : '[href]',
    host : {
        '(click)' : 'checkLink($event)'
    }
})
export class LinkDirective {
   // @Input() href: string;
    constructor(private elementRef: ElementRef){}
    checkLink(event) {
        if (this.elementRef.nativeElement.href.indexOf('#') > 0) {
            event.preventDefault();
            if (this.elementRef.nativeElement.classList.contains('nav-link') || this.elementRef.nativeElement.classList.contains('nav-tabs')) {
                var elements = document.querySelectorAll('.tab-content>.tab-pane');

                for (var i = 0; i < elements.length; i++) {
                    elements[i].classList.remove("active");
                }
                elements = document.querySelectorAll('.nav-link.active')
                for (var i = 0; i < elements.length; i++) {
                    elements[i].classList.remove("active");
                }
                document.getElementById(this.elementRef.nativeElement.dataset.ellink).classList.add("active");
                this.elementRef.nativeElement.classList.add("active")
            }
            else {

                const element = document.querySelector(this.elementRef.nativeElement.href
                    .substr(this.elementRef.nativeElement.href.indexOf('#'), this.elementRef.nativeElement.href.length));
                if (element) {
                    element.scrollIntoView(element);
                }

            }
        }
    }

}
