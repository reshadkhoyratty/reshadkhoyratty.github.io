import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {FractionModel} from '@esedit-md/shared-ui';
import {SampleAbstractComponent} from '../../SampleAbstractComponent';

type BlFractionFormGroup = {
    fraction: FractionModel | null
    fractionReadOnly: FractionModel | null
}

@Component({
    selector: 'bl-fraction-sample',
    templateUrl: './bl-text-field-fraction-sample.component.html'
})
export class BlTextFieldFractionSampleComponent extends SampleAbstractComponent<BlFractionFormGroup> implements OnInit {

    public ngOnInit(): void {
        this.formGroup = new FormGroup({
            fraction: new FormControl<FractionModel | null>(new FractionModel('1', '2')),
            fractionReadOnly: new FormControl<FractionModel | null>(new FractionModel('3', '4'))
        });
    }

}
