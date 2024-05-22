import { Component } from '@angular/core';
import { ToasterService } from '@bl/shared';
import { IconClassEnum } from '@esedit-md/shared-ui';

@Component({
  selector: 'bl-button-sample',
  templateUrl: './bl-button-sample.component.html',
  styleUrls: ['bl-button-sample.component.scss'],
})
export class BlButtonSampleComponent {
  public classValidate = IconClassEnum.check;
  public classDelete = IconClassEnum.delete;
  public classRollback = IconClassEnum.rollback;

  public constructor(public toasterService: ToasterService) {}

  public doOnClickValidate(): void {
    this.toasterService.success('sample.datatable.event.validate');
  }

  public doOnClickRollback(): void {
    this.toasterService.success('sample.datatable.event.rollback');
  }

  public doOnClickDelete(): void {
    this.toasterService.success('sample.datatable.event.delete');
  }
}
