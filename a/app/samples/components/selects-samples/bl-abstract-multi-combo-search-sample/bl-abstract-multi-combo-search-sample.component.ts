import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BlBasicObject} from '@esedit-md/shared-ui';
import {StaticBddService} from '../../../../services/static-bdd.service';
import {SampleAbstractComponent} from '../../../SampleAbstractComponent';
import {BlMultiComboSearchStatutComponent} from './bl-multi-combo-search-statut.component';

type BlMultiComboFormGroup = {
    status1: BlBasicObject[] | null,
    status2: BlBasicObject[] | null,
    status3: BlBasicObject[] | null
}

@Component({
    selector: 'bl-abstract-multicombo-search-sample',
    templateUrl: './bl-abstract-multi-combo-search-sample.component.html'
})
export class BlAbstractMultiComboSearchSampleComponent extends SampleAbstractComponent<BlMultiComboFormGroup> implements OnInit {

    @ViewChild(BlMultiComboSearchStatutComponent) mcStatutComponent: BlMultiComboSearchStatutComponent;

    constructor(private staticBddService: StaticBddService) {
        super();
    }

    public ngOnInit(): void {
        this.formGroup = new FormGroup({
                status1: new FormControl<BlBasicObject[] | null>([this.staticBddService.getStatus(1)]),
                status2: new FormControl<BlBasicObject[] | null>([this.staticBddService.getStatus(2)]),
                status3: new FormControl<BlBasicObject[] | null>([this.staticBddService.getStatus(3)])
            }
        );
    }
}
