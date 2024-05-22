import {formatDate} from '@angular/common';
import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SampleAbstractComponent} from '../../../SampleAbstractComponent';

type BlCalendarFormGroup = {
    calendar1: string[] | null,
    calendar2: string[] | null,
    calendar3: string[] | null
};

@Component({
    selector: 'bl-calendar-sample',
    templateUrl: './bl-calendar-sample.component.html',
    styleUrls: ['bl-calendar-sample.component.scss']
})
export class BlCalendarSampleComponent extends SampleAbstractComponent<BlCalendarFormGroup> implements OnInit {

    constructor(@Inject(LOCALE_ID) private locale: string) {
        super();
    }

    public ngOnInit(): void {
        const today = new Date();
        const todayPlus2 = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);
        this.formGroup = new FormGroup({
                calendar1: new FormControl<string[] | null>([formatDate(today, 'yyyy-MM-dd', this.locale)]),
                calendar2: new FormControl<string[] | null>([formatDate(today, 'yyyy-MM-dd', this.locale), formatDate(todayPlus2, 'yyyy-MM-dd', this.locale)]),
                calendar3: new FormControl<string[] | null>([formatDate(today, 'yyyy-MM-dd', this.locale), formatDate(todayPlus2, 'yyyy-MM-dd', this.locale)])
            }
        );
    }

}
