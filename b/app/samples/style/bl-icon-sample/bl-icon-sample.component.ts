import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {IconClassEnum} from '@esedit-md/shared-ui';
import {BlSharedService} from '../../../../../../../libs/shared-ui/src/lib/services/shared.service';

type iconsEnum = {
    keyName: string,
    value: string
}

@Component({
    selector: 'bl-icon-sample',
    templateUrl: './bl-icon-sample.component.html',
    styleUrls: ['./bl-icon-sample.component.scss']
})
export class BlIconSampleComponent implements OnInit {
    public IconClassEnum = IconClassEnum;
    public classDelete = IconClassEnum.delete;
    public displayFilled = false;
    public iconsList: iconsEnum [];
    public iconsKeys = [];
    public green_color = 'var(--bl-success-picto-color)';
    public red_color = 'var(--bl-error-picto-color)';
    public search = '';
    formGroup: any;

    constructor(blSharedService: BlSharedService) {
        this.displayFilled = blSharedService.isIconsFilled();
    }

    ngOnInit(): void {
        this.formGroup = new FormGroup({
            search: new FormControl<string | null>(''),
        });
        this.initIconList('');

    }

    getClassFromKey(key: string) {
        return IconClassEnum[key as keyof typeof IconClassEnum];
    }

    changeSearch($event: Event) {
        this.initIconList(this.formGroup.controls['search'].value);
    }

    private initIconList(filter: string) {
        if (this.displayFilled) {
            this.iconsKeys = Object.keys(this.IconClassEnum).filter((key) => key.indexOf('_fill') != -1 // fill
                && (filter == '' ? true : (key.indexOf(filter) != -1 || this.getClassFromKey(key).indexOf(filter) != -1))); // filter search

        } else {
            this.iconsKeys = Object.keys(this.IconClassEnum).filter((key) => key.indexOf('_fill') == -1 // not fill
                && (filter == '' ? true : (key.indexOf(filter) != -1 || this.getClassFromKey(key).indexOf(filter) != -1))); // filter search

        }
    }
}
