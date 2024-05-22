import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators,} from '@angular/forms';
import {ToasterService} from '@bl/shared';
import {SampleAbstractComponent} from '../../SampleAbstractComponent';

type BlLibelleFormGroup = {
    label1: string | null;
    label2: string | null;
    label3: string | null;
    label4: string | null;
    label5: string | null;
    label6: number | null;
    label7: string | null;
    label8: string | null;
};

@Component({
    selector: 'bl-libelle-sample',
    templateUrl: './bl-text-field-sample.component.html',
})
export class BlTextFieldSampleComponent
    extends SampleAbstractComponent<BlLibelleFormGroup>
    implements OnInit, AfterViewInit {
    public customErrorMap = new Map<string, string>();

  public constructor(public toasterService: ToasterService) {
    super();
  }
  public ngOnInit(): void {
    this.formGroup = new FormGroup({
      label1: new FormControl<string | null>('Test1', {
        validators: [this.maxLengthValidator()],
      }),
      label2: new FormControl<string | null>('Test 2', Validators.required),
      label3: new FormControl<string | null>('Test 3'),
      label4: new FormControl<string | null>('Test 4'),
      label5: new FormControl<string | null>('Test 5'),
      label6: new FormControl<number | null>(2),
      label7: new FormControl<string | null>('Test 7'),
      label8: new FormControl<string | null>('Test 8')
    });
    this.customErrorMap.set(
      'maxLengthExceeded',
      'pages.variables.form-error.customErrorMessage.text-field.maxLengthExceeded'
    );
    this.customErrorMap.set('required', 'custumValidation.required');
      this.customErrorMap.set('required', 'form.error.required');
      this.customErrorMap.set('mina', 'bl-decimal.error.badformat');
      this.customErrorMap.set('minc', 'form.error.libelle.size.too.long');
  }

    ngAfterViewInit() {
        this.formGroup.controls.label7.addValidators(
            this.specificFormat(this.formGroup.controls.label7)
        );
        this.formGroup.controls.label7.addValidators(
            this.specificFormat2(this.formGroup.controls.label7)
        );
    }

    maxLengthValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;

            const isLengthValid = value.length <= 4;

            return isLengthValid ? null : {maxLengthExceeded: true};
        };
    }

    onBlur(event): void {
        document.getElementById('8').style.color = 'var(--secondary-color)';
        this.toasterService.success('(onBlurAction)');
    }

    private specificFormat(formControl: FormControl | undefined): ValidatorFn {
        return (): ValidationErrors | null => {
            if (formControl && formControl.value) {
                const textValue: string | null = this.formGroup.controls.label7.value;
                if (textValue?.includes('a')) {
                    return {mina: true};
                }
            }
            return null;
        };
    }

    private specificFormat2(formControl: FormControl | undefined): ValidatorFn {
        return (): ValidationErrors | null => {
            if (formControl && formControl.value) {
                const textValue: string | null = this.formGroup.controls.label7.value;
                if (textValue?.includes('c')) {
                    return {minc: true};
                }
            }
            return null;
        };
    }
}
