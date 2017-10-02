import {Component, ViewEncapsulation} from '@angular/core';
import {MainTemplateComponent} from './main-template.component';




@Component({
  selector:'cv-tpl-2',
  templateUrl: './2.html',
  styleUrls:['./template1.component.css', './template2.component.css'],
  encapsulation: ViewEncapsulation.Emulated // <------
})
export class Template2Component extends MainTemplateComponent  {


}
