import {Component} from '@angular/core';
import {ToasterService} from '@bl/shared';

@Component({
    selector: 'bl-hyperlink-sample',
    templateUrl: './bl-hyperlink-sample.component.html',
    styleUrls: ['./bl-hyperlink-sample.component.scss'],
})
export class BlHyperlinkSampleComponent {

    public constructor(private toasterService: ToasterService) {
    }

    onClick($event: MouseEvent) {
        this.toasterService.success('Link clicked');
    }
}
