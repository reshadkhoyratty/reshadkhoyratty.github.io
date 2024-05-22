import {Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToasterService} from '@bl/shared';
import {BlDialogService, BlGenericDialogComponent} from '@esedit-md/shared-ui';
import {TranslateService} from '@ngx-translate/core';
import {timer} from 'rxjs';

@Component({
    selector: 'bl-generic-dialog-sample-2',
    templateUrl: './bl-generic-dialog-sample-2.component.html',
    styleUrls: ['./bl-generic-dialog-sample-2.component.scss'],
})
export class BlGenericDialogSample2Component {
    @ViewChild('dialog', {static: true}) dialog: BlGenericDialogComponent;

    message = this.translateService.instant('sample.generic-dialog.message2')
    formGroup = new FormGroup({
        label1: new FormControl({value: '', disabled: false}, Validators.required),
    });

    constructor(
        private blDialogService: BlDialogService,
        private ts: ToasterService,
        private translateService: TranslateService
    ) {
    }

    validateForm = (args: any): boolean => {
        if (this.formGroup.valid) {
            return true;
        } else {
            this.formGroup.markAllAsTouched();
            return false;
        }
    }

    event(code: string) {
        const duration = Number(this.formGroup.controls['label1'].value);
        timer(1)
            .subscribe(i => {
                this.blDialogService.closeGenericDialog('{duration: ' + duration + '}');
            });
    }

}
