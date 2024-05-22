import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import moment from 'moment/moment';
import {SampleAbstractComponent} from '../../../SampleAbstractComponent';

type BlDatePickerRangeFormGroup = {
    startDate: moment.Moment | null,
    endDate: moment.Moment | null,
    startDateReadOnly: moment.Moment | null,
    endDateReadOnly: moment.Moment | null,
    startDateConstraint: moment.Moment | null,
    endDateConstraint: moment.Moment | null,
    locale: string,
    format: string
};

@Component({
    selector: 'bl-date-picker-range-sample',
    templateUrl: './bl-datepicker-range-sample.component.html'
})
export class BlDatepickerRangeSampleComponent extends SampleAbstractComponent<BlDatePickerRangeFormGroup> implements OnInit {

    public formatList = ['DD/MM/YY', 'DD/MM/YYYY', 'MMMM/YYYY', 'MM/YYYY', 'DD/MMMM'];
    public localeList = ['fr-FR', 'en-US', 'es-ES'];
    public minDate: Date;
    public maxDate: Date;
    customErrorsMap = new Map<string, string>;

    constructor(@Inject(LOCALE_ID) private locale: string) {
        super();
        // Set the minimum to January 1st of the current year and and December 31st a year in the future.
        const currentYear = new Date().getFullYear();
        this.minDate = new Date(currentYear, 0, 1);
        this.maxDate = new Date(currentYear + 1, 11, 31);
    }

    public ngOnInit(): void {
        this.formGroup = new FormGroup({
                startDate: new FormControl<moment.Moment>(moment(new Date()), [this.todayDateValidator(), Validators.required]),
                endDate: new FormControl<moment.Moment>(moment(moment().add(1, 'day')), [this.tomorrowDateValidator(), Validators.required]),
                startDateReadOnly: new FormControl<moment.Moment>(moment(new Date()), [this.todayDateValidator(), Validators.required]),
                endDateReadOnly: new FormControl<moment.Moment>(moment(moment().add(1, 'day')), [this.tomorrowDateValidator(), Validators.required]),
                startDateConstraint: new FormControl<moment.Moment>(moment(new Date()), [Validators.required]),
                endDateConstraint: new FormControl<moment.Moment>(moment(moment().add(1, 'day')), [Validators.required]),
                format: new FormControl<string>('DD/MM/YY', {nonNullable: true}),
                locale: new FormControl<string>('fr-FR', {nonNullable: true})
            }
        );
        this.customErrorsMap.set('notToday', 'pages.variables.form-error.customErrorMessage.date-picker-range.notTodayDate');
        this.customErrorsMap.set('notTomorrow', 'pages.variables.form-error.customErrorMessage.date-picker-range.notTomorrowDate');

    }

    todayDateValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const selectedDate: moment.Moment = moment(control.value, 'YYYY-MM-DD');
            const today: moment.Moment = moment();

            // Check if the selected date is equal to today
            if (selectedDate.isSame(today, 'day') && selectedDate.isValid()) {
                return null; // Validation passed
            } else {
                return {'notToday': true}; // Validation failed
            }
        };
    }

    //Tomorrow Validator for endDate
    tomorrowDateValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const selectedDate: moment.Moment = moment(control.value, 'YYYY-MM-DD');
            const tomorrow: moment.Moment = moment().add(1, 'day');
            if (selectedDate.isSame(tomorrow, 'day') && selectedDate.isValid()) {
                return null;
            } else return {'notTomorrow': true};
        }
    }

    public isRequired(): boolean {
        return this.formGroup.hasValidator(Validators.required);
    }

    public resetDatePicker(): void {
        this.formGroup?.controls?.startDate?.reset();
        this.formGroup?.controls?.endDate?.reset();

    }

}
