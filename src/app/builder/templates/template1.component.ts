import {Component,ViewEncapsulation} from '@angular/core';
import {MainTemplateComponent} from './main-template.component';





@Component({
  selector:'cv-tpl-1',
  templateUrl: './1.html',
  styleUrls:['./template1.component.css',],
  encapsulation: ViewEncapsulation.Emulated // <------
})
export class Template1Component   extends MainTemplateComponent  {

}
