import { Component,EventEmitter,OnInit } from '@angular/core';
import { BlAction } from '@esedit-md/shared-ui';


@Component({
  selector: 'bl-tab-group-sample',
  templateUrl: './bl-tab-group-sample.component.html',
  styleUrls: ['./bl-tab-group-sample.component.scss'],
})
export class BlTabGroupSampleComponent implements OnInit {
public actionsList : BlAction[] = [];

  ngOnInit(){
     // bl tab Actions
     let emitEventSave = new EventEmitter<any>();
     let emitEventCancel = new EventEmitter<any>();

     let button_save: BlAction = {
       idAction: '',
       eventEmitter: emitEventSave,
       label: 'Button métier',
       idSelector: 'btn_save',
       primary: true,
       buttonType: 'mat-stroked-button',
       componentType: 'bl-button',
       testLabelValue: 'btn_save'
     };

     let button_cancel: BlAction = {
      idAction: '',
      eventEmitter: emitEventCancel,
      label: 'Button métier',
      idSelector: 'btn_cancel',
      primary: false,
      buttonType: 'mat-stroked-button',
      componentType: 'bl-button',
      testLabelValue: 'btn_cancel'
    };

     emitEventSave.subscribe((event) => {
       this.onSubmitForm(event);
     });
     emitEventCancel.subscribe((event) => {
      this.onCancelForm(event);
    });
     this.actionsList.push(button_save,button_cancel);
  }

  onCancelForm(event: any) {

  }

  onSubmitForm(event){

  }

  selectedTabChange(index: number){

  }

}
