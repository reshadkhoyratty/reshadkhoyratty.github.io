import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SampleAbstractComponent} from '../../../SampleAbstractComponent';

type BlPeriodFormGroup = {
    period: string | null,
    periodReadOnly: string | null,
    withoutLabel: string | null,
    custumError: string | null
}

@Component({
    selector: 'bl-period-sample',
    templateUrl: './bl-month-picker-sample.component.html'
})
export class BlMonthPickerSampleComponent extends SampleAbstractComponent<BlPeriodFormGroup> implements OnInit {
    public customErrorsMap = new Map();
    public ngOnInit(): void {
        this.formGroup = new FormGroup({
                period: new FormControl<string | null>('2023.01'),
                periodReadOnly: new FormControl<string | null>('2023.03'),
                withoutLabel: new FormControl<string | null>('2023.01'),
                custumError: new FormControl<string | null>('2023.01'),
            }
        );
        this.customErrorsMap.set('required','custumValidation.required');
    }

}
