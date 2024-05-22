import {Component, EventEmitter} from '@angular/core';
import {ToasterService} from '@bl/shared';
import {BlDialogService, WaitDialogConfigModel} from '@esedit-md/shared-ui';
import {TranslateService} from '@ngx-translate/core';
import {
    BlGenericDialogConfig
} from '../../../../../../../libs/shared-ui/src/lib/components/abstract/bl-generic-dialog/bl-generic-dialog-config';
import {
    BlGenericDialogSizeConfig
} from '../../../../../../../libs/shared-ui/src/lib/components/abstract/bl-generic-dialog/bl-generic-dialog-size-config';
import {BlGenericDialogSample1Component} from './bl-generic-dialog-sample-1/bl-generic-dialog-sample-1.component';
import {BlGenericDialogSample2Component} from './bl-generic-dialog-sample-2/bl-generic-dialog-sample-2.component';

@Component({
    selector: 'bl-generic-dialog-samples',
    templateUrl: './bl-generic-dialog-samples.component.html',
    styleUrls: ['./bl-generic-dialog-samples.component.scss'],
})
export class BlGenericDialogSamplesComponent {
    constructor(
        private blDialogService: BlDialogService,
        private ts: ToasterService,
        private translateService: TranslateService
    ) {
    }

    openSample1() {
        const blGenericDialogSample1Config: BlGenericDialogConfig = {
            data: this.translateService.instant('sample.generic-dialog.data'),
            title: this.translateService.instant('sample.generic-dialog.title'),
            isButtonWithIcon: false,
            yesButtonTxt: {titleButton: this.translateService.instant('sample.generic-dialog.yesButtonTxt')},
            noButtonTxt: {titleButton: this.translateService.instant('sample.generic-dialog.noButtonTxt')},
            cancelButtonTxt: {titleButton: this.translateService.instant('sample.generic-dialog.cancelButtonTxt')},
            closeButtonTxt: {titleButton: this.translateService.instant('sample.generic-dialog.closeButtonTxt')},
            testLabel: 'dialog-exemple-1',
            waitDialogConfig: new WaitDialogConfigModel(this.translateService.instant('sample.generic-dialog.waitTitle'), this.translateService.instant('sample.generic-dialog.waitMessage'), 1000)
        };
        const resEvent = new EventEmitter();
        resEvent.subscribe((resp) => {
                this.ts.success('Event: '.concat(resp));
            }
        );

        this.blDialogService.openGenericDialog(BlGenericDialogSample1Component, blGenericDialogSample1Config, resEvent);
    }

    openSample2() {
        const blGenericDialogSample2Config: BlGenericDialogConfig = {
            data: this.translateService.instant('sample.generic-dialog.data'),
            title: this.translateService.instant('sample.generic-dialog.title2'),
            isButtonWithIcon: false,
            yesButtonTxt: {titleButton: this.translateService.instant('sample.generic-dialog.yesButtonTxt')},
            noButtonTxt: {titleButton: this.translateService.instant('sample.generic-dialog.noButtonTxt')},
            cancelButtonTxt: {titleButton: this.translateService.instant('sample.generic-dialog.cancelButtonTxt')},
            closeButtonTxt: {titleButton: this.translateService.instant('sample.generic-dialog.closeButtonTxt')},
            testLabel: 'dialog-exemple-1',
        };
        const resEvent = new EventEmitter();
        resEvent.subscribe((resp) => {
                this.ts.success('Event: '.concat(resp));
            }
        );
        const blGenericDialogSample2SizeConfig = new BlGenericDialogSizeConfig();
        blGenericDialogSample2SizeConfig.maxWidthForDesktop = '80vw';
        this.blDialogService.openGenericDialog(BlGenericDialogSample2Component, blGenericDialogSample2Config, resEvent, blGenericDialogSample2SizeConfig);
    }
}
