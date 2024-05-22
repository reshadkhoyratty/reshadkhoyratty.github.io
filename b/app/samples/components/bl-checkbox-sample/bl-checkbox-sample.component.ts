import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SampleAbstractComponent} from '../../SampleAbstractComponent';

type checkBoxExample = {
    example1: boolean | null;
    example2: boolean | null;
};

@Component({
    selector: 'bl-checkbox-sample',
    templateUrl: './bl-checkbox-sample.component.html',
    styleUrls: ['./bl-checkbox-sample.component.scss'],
})
export class BlCheckboxSampleComponent
    extends SampleAbstractComponent<checkBoxExample>
    implements OnInit {
    ngOnInit(): void {
        this.formGroup = new FormGroup({
            example1: new FormControl(false),
            example2: new FormControl(true),
        });
    }
}
