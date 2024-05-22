import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SampleAbstractComponent } from '../../SampleAbstractComponent';

type BlTextAreaFormGroup = {
  label1: string | null;
  label2: string | null;
  label3: string | null;
};

@Component({
  selector: 'bl-text-area-sample',
  templateUrl: './bl-text-area-sample.component.html',
  styleUrls: ['./bl-text-area-sample.component.scss'],
})
export class BlTextAreaSampleComponent
  extends SampleAbstractComponent<BlTextAreaFormGroup>
  implements OnInit
{
  firstExample = 'Lecture seule';
  secondExample = 'Exemple simple';
  thirdExample = 'Exemple  Required';

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      label1: new FormControl<string | null>(''),
      label2: new FormControl<string | null>('', Validators.required),
      label3: new FormControl<string | null>(
        'Exemple de Text Area en lecture seule.',
        Validators.required
      ),
    });
  }
}
