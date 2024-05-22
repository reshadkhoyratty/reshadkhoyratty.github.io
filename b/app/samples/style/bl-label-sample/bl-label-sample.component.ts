import {Component} from '@angular/core';
import {BlLabelState} from '@esedit-md/shared-ui';

@Component(
    {
        selector: 'bl-label-sample',
        templateUrl: './bl-label-sample.component.html',
        styleUrls: ['./bl-label-sample.component.scss']
    }
)
export class BlLabelSampleComponent {
    successState = BlLabelState.SUCCESS;
    warningState = BlLabelState.WARNING;
    defaultState = BlLabelState.DEFAULT;
    dangerState = BlLabelState.DANGER;
    infoState = BlLabelState.INFO;
    primaryState = BlLabelState.PRIMARY;

    successValue: any = 'Success';
    warningValue = 'Warning';
    defaultValue = 'Default';
    dangerValue = 'Danger';
    infoValue = 'Info';
    primaryValue = 'Primary';

    constructor() {
        this.successState = BlLabelState.SUCCESS;
    }
}
