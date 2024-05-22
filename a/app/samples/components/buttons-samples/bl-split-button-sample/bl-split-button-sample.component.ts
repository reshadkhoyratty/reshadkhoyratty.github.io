import { Component, EventEmitter, OnInit } from '@angular/core';
import { ToasterService } from '@bl/shared';
import { BlAction, IconClassEnum } from '@esedit-md/shared-ui';
import {
  ACTION_SAVE,
  ACTION_SAVE_AS,
  ACTION_SAVE_COPY,
  ACTION_SAVE_AS_PDF,
} from "../../tables-samples/bl-datatable-sample/bl-factory-action-button";

@Component({
  selector: 'bl-split-button-sample',
  templateUrl: './bl-split-button-sample.component.html',
  styleUrls: ['bl-split-button-sample.component.scss'],
})
export class BlSplitButtonSampleComponent implements OnInit {
  public buttonActions: BlAction[] = [];
  public buttonActions2: BlAction[] = [];
  public saveEvent = new EventEmitter();
  public saveAsEvent = new EventEmitter();
  public saveCopyEvent = new EventEmitter();
  public saveAsPdfEvent = new EventEmitter();

  public constructor(private toasterService: ToasterService) {}

  ngOnInit(): void {
    this.saveEvent.subscribe(() => {
      this.toasterService.success('sample.split-button.event.save');
    });
    this.saveAsEvent.subscribe(() => {
      this.toasterService.success('sample.split-button.event.save-as');
    });
    this.saveCopyEvent.subscribe(() => {
      this.toasterService.success('sample.split-button.event.save-copy');
    });
    this.saveAsPdfEvent.subscribe(() => {
      this.toasterService.success('sample.split-button.event.save-as-pdf');
    });
    this.initButtonActions();
    this.initButtonActions2();
  }

  private initButtonActions2(): void {
    this.buttonActions2.push({
      label: ACTION_SAVE.label,
      eventEmitter: this.saveEvent,
      icon: {
        icon: IconClassEnum.plus,
        tooltip: 'sample.datatable.action.add',
      },
    });
    this.buttonActions2.push({
      label: ACTION_SAVE_AS.label,
      eventEmitter: this.saveAsEvent,
    });
    this.buttonActions2.push({
      label: ACTION_SAVE_COPY.label,
      eventEmitter: this.saveCopyEvent,
    });
    this.buttonActions2.push({
      label: ACTION_SAVE_AS_PDF.label,
      eventEmitter: this.saveAsPdfEvent,
    });
  }

  private initButtonActions(): void {
    this.buttonActions.push({
      label: ACTION_SAVE.label,
      eventEmitter: this.saveEvent,
    });
    this.buttonActions.push({
      label: ACTION_SAVE_AS.label,
      eventEmitter: this.saveAsEvent,
    });
    this.buttonActions.push({
      label: ACTION_SAVE_COPY.label,
      eventEmitter: this.saveCopyEvent,
    });
    this.buttonActions.push({
      label: ACTION_SAVE_AS_PDF.label,
      eventEmitter: this.saveAsPdfEvent,
    });
  }
}
