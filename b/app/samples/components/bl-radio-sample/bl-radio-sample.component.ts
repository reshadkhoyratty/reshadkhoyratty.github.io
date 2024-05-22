import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SampleAbstractComponent} from '../../SampleAbstractComponent';

type radioExample = {
    example1: number | null;
    example2: number | null;
    example3: number | null;
    example4: number | null;
    example5: number | null;
    example6: number | null;
    example7: number | null;
};

@Component({
    selector: 'bl-radio-sample',
    templateUrl: './bl-radio-sample.component.html',
    styleUrls: ['./bl-radio-sample.component.scss'],
})
export class BlRadioSampleComponent extends SampleAbstractComponent<radioExample> implements OnInit {

    public list = [
        {value: 1, label: 'Option 1', disabled: true},
        {value: 2, label: 'Option 2'},
        {value: 3, label: 'Option 3'},
        {value: 4, label: 'Option 4', testLabelValue: 'testlabeloption4'},
    ];

    constructor() {
        super();
        this.formGroup = new FormGroup({
            example1: new FormControl(),
            example2: new FormControl(1),
            example3: new FormControl(1),
            example4: new FormControl(0),
            example5: new FormControl(1),
            example6: new FormControl(1),
            example7: new FormControl(1)
        });
    }

    public ngOnInit(): void {

        //this.formGroup.controls.example1.patchValue(2);

        setTimeout(() => {

            this.formGroup.controls.example7.patchValue(2);
        }, 5000);
    }
}
