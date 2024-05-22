import {AfterContentInit, Component, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {BlSearchAbstractComponent} from '@esedit-md/shared-ui';
import {TranslateService} from '@ngx-translate/core';
import {Option} from '../../../../../../../../libs/shared-ui/src/lib/components/basic/select/shared/models/option.model';
import {StaticBddService} from '../../../../services/static-bdd.service';

@Component({
    selector: 'bl-search-statut',
    template: `
        <bl-search-abstract [label]="'sample.status.list.title'"
                            [data]="lst"
                            [formControl]="formControl"
                            [placeholder]="'sample.status.list.all'"
                            [readOnly]="readOnly"
                            (selectableListChangeEvent)="selectableListChangeEvent.emit($event)"
                            [testLabelValue]="testLabelValue"
        >
        </bl-search-abstract>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BlSearchStatutComponent),
            multi: true
        }
    ]
})
export class BlSearchStatutComponent extends BlSearchAbstractComponent implements AfterContentInit {

    public lst: Option[];

    constructor(
        private staticBddService: StaticBddService,
        public override translateService: TranslateService) {
        super(translateService);
    }

    public ngAfterContentInit(): void {
        this.lst = this.staticBddService.getListOptions(false);
    }

}
