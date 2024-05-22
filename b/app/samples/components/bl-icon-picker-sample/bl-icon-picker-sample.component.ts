import {Component} from '@angular/core';
import {IconClassEnum} from '@esedit-md/shared-ui';

@Component(
    { selector:'bl-icon-picker-sample',
        templateUrl:'bl-icon-picker-sample.component.html'
    }
)
export class BlIconPickerSampleComponent{

    customIcons = new Map<string,string>;

    constructor() {

        this.customIcons.set('accessibility','ph ph-person').set('archive','ph-light ph-archive').set('arrow_down_right','ph ph-arrow-down-right')
            .set('arrow_left','ph-light ph-arrow-left').set('arrow_up','ph-light ph-arrow-up')
            .set('dollar','ph-light ph-currency-dollar').set('dots','ph-light ph-dots-three').set('download','ph-light ph-download-simple').set('duplicate','ph-light ph-copy-simple').set('error','ph-light ph-x-circle').set('euro','ph-light ph-currency-eur').set('file_minus','ph-light ph-file_minus').set('export','ph-light ph-export').set('file','ph-light ph-file').set('file_lock','ph-light ph-file-lock')

    }

}
