import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SampleAbstractComponent} from '../../SampleAbstractComponent';

type BlCloseAlertFormGroup = {
    name: string | null
};

@Component({
    selector: 'bl-close-alert-sample',
    templateUrl: './bl-close-alert-sample.component.html',
})
export class BlCloseAlertSampleComponent extends SampleAbstractComponent<BlCloseAlertFormGroup> implements OnInit {

    public changed = false;

    public ngOnInit(): void {

        this.formGroup = new FormGroup({
                name: new FormControl<string | null>('Wael'),
            }
        );
        Object.keys(this.formGroup.controls).forEach(
            key => this.formGroup.get(key)?.valueChanges.subscribe(() => this.changed = true)
        );
    }
}
