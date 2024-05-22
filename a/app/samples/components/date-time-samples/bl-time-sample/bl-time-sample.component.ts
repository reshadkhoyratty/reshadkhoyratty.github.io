import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {SampleAbstractComponent} from '../../../SampleAbstractComponent';

type BlTimeFormGroup = {
    inputTime: string | null;
    inputTime2: string | null;
}

@Component({
    selector: 'bl-time-sample',
    templateUrl: './bl-time-sample.component.html'
})
export class BlTimeSampleComponent extends SampleAbstractComponent<BlTimeFormGroup> implements OnInit {
  customErrorMap = new Map<string,string>();
   customTimeValidatorFor11_11 = this.customTimeValidator('20:11');

    public ngOnInit(): void {
        this.formGroup = new FormGroup({
               inputTime: new FormControl<string|null>(null,[Validators.required,this.customTimeValidatorFor11_11]),
               inputTime2 : new FormControl<string|null>('11:25')
        });
        this.customErrorMap.set('required','pages.variables.form-error.customErrorMessage.bl-time.required');
      this.customErrorMap.set('customTime','pages.variables.form-error.customErrorMessage.bl-time.acceptedValue');
    }
  customTimeValidator(expectedTime: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;
      if (value === expectedTime) {
        return null; // Valid
      } else {
        return { customTime: true }; // Invalid
      }
    };
  }
}
