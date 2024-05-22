import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Option} from '../../../../../../../../libs/shared-ui/src/lib/components/basic/select/shared/models/option.model';
import {StaticBddService} from '../../../../services/static-bdd.service';
import {SampleAbstractComponent} from '../../../SampleAbstractComponent';

type BlAbstractSearchFormGroup = {
    status1: Option | null,
    status2: Option | null
}

@Component({
    selector: 'bl-abstract-search-sample',
    templateUrl: './bl-abstract-search-sample.component.html'
})
export class BlAbstractSearchSampleComponent extends SampleAbstractComponent<BlAbstractSearchFormGroup> implements OnInit {

    constructor(private staticBddService: StaticBddService) {
        super();
    }

    public ngOnInit(): void {
        this.formGroup = new FormGroup({
                status1: new FormControl<Option | null>(this.staticBddService.getOption(1, true).value),
                status2: new FormControl<Option | null>(this.staticBddService.getOption(2).value)
            }
        );
    }
}
