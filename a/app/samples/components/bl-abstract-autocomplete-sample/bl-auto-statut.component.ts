import {ChangeDetectorRef, Component, forwardRef, OnInit, ViewChild} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {BlAutoAbstractComponent, BlBasicObject} from '@esedit-md/shared-ui';
import {TranslateService} from '@ngx-translate/core';
import {StaticBddService} from '../../../services/static-bdd.service';

@Component({
    selector: 'bl-auto-statut',
    template: `
        <bl-auto-abstract [label]="'sample.status.list.title'"
                          [data]="data"
                          [displayCode]="displayCode"
                          [placeholder]="'sample.status.list.none'"
                          [formControl]="formControl"
                          [id]="id"
                          [testLabelValue]="testLabelValue"
                          [appearance]="appearance"
                          [readOnly]="readOnly"
                          [clearSearch]="clearSearch"
                          [enablePagination]="enablePagination"
                          [pageSize]="pageSize"
                          (selectableListChangeEvent)="getData($event)"
                          [hintStart]="hintStart"
                          [hintEnd]="hintEnd"
                          [hintValue]="hintValue"
        >
        </bl-auto-abstract>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BlAutoStatutComponent),
            multi: true
        }
    ]
})
export class BlAutoStatutComponent extends BlAutoAbstractComponent implements OnInit {

    @ViewChild(BlAutoAbstractComponent) autoAbstractComponent: BlAutoAbstractComponent;

    constructor(private staticBddService: StaticBddService,
                public override changeDetectorRef: ChangeDetectorRef,
                public override translateService: TranslateService) {
        super(translateService, changeDetectorRef);
        this.id = 'autoStatut';
    }

    ngOnInit(): void {
        this.loadList();
    }

    getData(data?: any) {
        if (this.selectableListChangeEvent.observed) {
            this.selectableListChangeEvent.emit(data);
        } else {
            this.staticBddService.listStatusDynamicAutocomplete(data).subscribe(statusList => this.data = statusList);
        }
    }

    private loadList(): void {
        this.staticBddService.listStatusDynamic().subscribe((c: BlBasicObject[]) => {
            this.data = c;
            this.changeDetectorRef.detectChanges();
        });
    }

}
