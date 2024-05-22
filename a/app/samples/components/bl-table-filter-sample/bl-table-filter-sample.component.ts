import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SampleAbstractComponent} from '../../SampleAbstractComponent';

type BlFilterFormGroup = {
    nbElement: number;
    displaySearchButton: boolean;
    displayResetButton: boolean
    linebreak: boolean;
}

@Component({
    selector: 'bl-datatable-filter-sample',
    templateUrl: './bl-table-filter-sample.component.html',
    styleUrls: ['./bl-table-filter-sample.component.scss'],
})
export class BlTableFilterSampleComponent extends SampleAbstractComponent<BlFilterFormGroup> {

    constructor() {
        super();
        this.formGroup = new FormGroup({
                nbElement: new FormControl<number>(4, {nonNullable: true}),
                displaySearchButton: new FormControl<boolean>(false, {nonNullable: true}),
                displayResetButton: new FormControl<boolean>(false, {nonNullable: true}),
                linebreak: new FormControl<boolean>(true, {nonNullable: true})
            }
        );
    }

}
