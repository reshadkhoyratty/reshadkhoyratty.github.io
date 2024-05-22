import {Component} from '@angular/core';
import {ToasterService} from '@bl/shared';
import {IconClassEnum} from '@esedit-md/shared-ui';

@Component({selector:'bl-image-with-content-sample',
    templateUrl:'bl-image-with-content-sample.component.html'
},)
export class BlImageWithContentSampleComponent{
    public classValidate = IconClassEnum.check;
    public classDelete = IconClassEnum.delete;
    public classRollback = IconClassEnum.rollback;
    imageClass;

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
