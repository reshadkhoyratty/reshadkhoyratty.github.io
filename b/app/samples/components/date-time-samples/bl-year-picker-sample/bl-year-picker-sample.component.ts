import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BlYearPickerComponent, YearPickerType} from '@esedit-md/shared-ui';
import moment from 'moment';
import {SampleAbstractComponent} from '../../../SampleAbstractComponent';

/**
 * type BlYearPickerFormGroup is for documentation purpose,
 * do not extend component with SampleAbstractComponent<BlYearPickerFormGroup>
 */
type BlYearPickerFormGroup = {
    full: moment.Moment | null,
    min: moment.Moment | null,
    max: moment.Moment | null,
    nolimit: moment.Moment | null,
    readOnly: moment.Moment | null
};

@Component({
    selector: 'bl-year-picker-sample',
    templateUrl: './bl-year-picker-sample.component.html',
    styleUrls: ['./bl-year-picker-sample.component.scss']
})
export class BlYearpickerSampleComponent extends SampleAbstractComponent<BlYearPickerFormGroup> implements OnInit, AfterViewInit {
    @ViewChild('openMe') openMe: BlYearPickerComponent;

    public ngOnInit(): void {
        this.formGroup = new FormGroup({
                full: new FormControl<moment.Moment | null>(null),
                min: new FormControl<moment.Moment | null>(null),
                max: new FormControl<moment.Moment | null>(null),
                nolimit: new FormControl<moment.Moment | null>(null),
                readOnly: new FormControl<moment.Moment | null>(null)
            }
        );
    }

    ngAfterViewInit(): void {
        this.openMe.yearPicker?.open();
    }

    /**
     * Callback from yearSelectedEvent of year-picker.component,
     * (yearSelectedEvent | blur)="getSelectedYear($event)"
     *
     * return the selected year: string
     *
     * @param yearInputValue
     */
    getSelectedYear(yearInputValue: YearPickerType | FocusEvent) {

    }

    /**
     * Set min year in MatDatePicker
     *
     * @returns year string
     */
    public setMinYear() {
        return '2010';
    }

    /**
     * Set max year in MatDatePicker
     *
     * @returns year string
     */
    public setMaxYear() {
        return '2023';
    }

    getLabelYear() {
        return moment().year(2019).year().toString();
    }

    /**
     * Set default year in MatDatePicker
     *
     * @returns year string | Moment | null
     */
    public setDefaultYear() {
        return moment().year(2019);
    }
}
