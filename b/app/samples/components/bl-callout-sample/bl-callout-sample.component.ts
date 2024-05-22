import {Component} from '@angular/core';

@Component({
    selector: 'bl-callout-sample',
    templateUrl: './bl-callout-sample.component.html'
})
export class BlCalloutSampleComponent {
    public textDefault: string;

    public constructor() {
        this.textDefault = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.';
    }

}
