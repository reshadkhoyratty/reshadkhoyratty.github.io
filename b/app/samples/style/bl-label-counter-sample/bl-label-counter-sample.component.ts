import {Component, ViewEncapsulation} from '@angular/core';
import {BlLabelCounterState, IconClassEnum} from '@esedit-md/shared-ui';

@Component({
    selector: './bl-label-counter-sample',
    templateUrl: './bl-label-counter-sample.component.html',
    styleUrls: ['./bl-label-counter-sample.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BlLabelCounterSampleComponent {
    warningState = BlLabelCounterState.WARNING;
    errorState = BlLabelCounterState.ERROR;
    successState = BlLabelCounterState.SUCCESS;
    infoState = BlLabelCounterState.INFO;
    iconError: IconClassEnum;
    colorKeys: string[];
    showColors: false;
    protected readonly BlLabelCounterState = BlLabelCounterState;

    constructor() {
        this.iconError = IconClassEnum.delete;
        this.colorKeys = Object.keys(BlLabelCounterState).filter((key) => key.length != 1);

    }

    getClassFromKey(key: string) {
        return BlLabelCounterState[key as keyof typeof BlLabelCounterState];
    }
}
