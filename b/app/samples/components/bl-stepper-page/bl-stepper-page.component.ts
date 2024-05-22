import { Component , OnInit} from '@angular/core';
import { BlBasicObject } from '@esedit-md/shared-ui';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'bl-stepper-page',
  templateUrl: './bl-stepper-page.component.html'
})
export class BlStepperPageComponent implements OnInit{

  public tabInputComponent: BlBasicObject[] = [];
  public tabOutputComponent: BlBasicObject[] = [];

  constructor(public translateService: TranslateService) {
  }

  ngOnInit(){
    this.initInputs();
  }


  initInputs() {
          this.tabInputComponent.push({
              id: '',
              code: 'editable',
              label: this.translateService.instant('pages.bl-stepper.input.editable')
          });
          this.tabInputComponent.push({
            id: '',
            code: 'testLabelValue',
            label: this.translateService.instant('pages.bl-stepper.input.testLabelValue')
          });
         
          this.tabInputComponent.push({
            id: '',
            code: '- bl-step',
            label: ''
          });
          this.tabInputComponent.push({
            id: '',
            code: 'title',
            label: this.translateService.instant('pages.bl-stepper.bl-step.input.title')
          }); 
          this.tabInputComponent.push({
            id: '',
            code: 'stepForm',
            label: this.translateService.instant('pages.bl-stepper.bl-step.input.stepForm')
          }); 
          this.tabInputComponent.push({
            id: '',
            code: 'testLabelValue',
            label: this.translateService.instant('pages.bl-stepper.bl-step.input.testLabelValue')
          });
  }

    
}
