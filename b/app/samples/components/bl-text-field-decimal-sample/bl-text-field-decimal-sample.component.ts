import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { SampleAbstractComponent } from '../../SampleAbstractComponent';

type BlDecimalFormGroup = {
  rate: number | null;
  amountEuro: number | null;
  amountReadOnly: number | null;
  integerWithZero: number | null;
  integerWithoutZero: number | null;
  currency: string | null;
  price: number | null;
};

enum CurrencyEnum {
  CHF = 'CHF',
  XFP = 'XFP',
  EUR = '€',
  DOLLAR = '$',
  GBP = '£',
}

@Component({
  selector: 'bl-decimal-sample',
  templateUrl: './bl-text-field-decimal-sample.component.html',
})
export class BlTextFieldDecimalSampleComponent
  extends SampleAbstractComponent<BlDecimalFormGroup>
  implements OnInit
{
  currencyList = [
    CurrencyEnum.CHF,
    CurrencyEnum.XFP,
    CurrencyEnum.DOLLAR,
    CurrencyEnum.GBP,
    CurrencyEnum.EUR,
  ];
  iconClassName = 'euro';
  suffixLabel = '';
  public customErrorMap = new Map<string, string>();

  public ngOnInit(): void {
    this.formGroup = new FormGroup({
      integerWithZero: new FormControl<number>(100, [Validators.min(30)]),
      integerWithoutZero: new FormControl<number>(80, [
        this.checkValueValidator(),
      ]),
      rate: new FormControl<number>(4.9),
      amountEuro: new FormControl<number>(10),
      amountReadOnly: new FormControl<number>(20),
      currency: new FormControl<string | null>(CurrencyEnum.EUR),
      price: new FormControl<number>(50),
    });
    this.customErrorMap.set(
      'min',
      'pages.variables.form-error.customErrorMessage.text-field.min'
    );
    this.customErrorMap.set(
      'notEven',
      'pages.variables.form-error.customErrorMessage.text-field.odd'
    );
    this.customErrorMap.set('required', 'form.error.required');
  }
  checkValueValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      // Check if the value is a number and is even
      const isEven = typeof value === 'number' && value % 2 === 0;

      return isEven ? null : { notEven: true };
    };
  }
  onSelected(value: string): void {
    switch (value) {
      case CurrencyEnum.CHF:
        this.iconClassName = '';
        this.suffixLabel = CurrencyEnum.CHF;
        break;
      case CurrencyEnum.XFP:
        this.iconClassName = '';
        this.suffixLabel = CurrencyEnum.XFP;
        break;
      case CurrencyEnum.DOLLAR:
        this.iconClassName = 'dollar';
        break;
      case CurrencyEnum.EUR:
        this.iconClassName = 'euro';
        break;
      case CurrencyEnum.GBP:
        this.iconClassName = 'gbp';
        break;
      default:
        break;
    }
  }
}
