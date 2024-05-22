import {AfterViewInit, ChangeDetectorRef, Component, forwardRef, ViewChild,} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {BlAutoAbstractComponent, BlBasicObject} from '@esedit-md/shared-ui';
import {TranslateService} from '@ngx-translate/core';
import {StaticBddService} from '../../../services/static-bdd.service';

@Component({
    selector: 'bl-auto-statut-static',
    template: `
        <bl-auto-abstract
                [label]="'sample.status.list.title'"
                [data]="lst"
                [displayCode]="displayCode"
                [placeholder]="'sample.status.list.none'"
                [formControl]="formControl"
                [id]="id"
                [testLabelValue]="testLabelValue"
                [appearance]="appearance"
                [readOnly]="readOnly"
                [clearSearch]="clearSearch"
                [autoCompleteAction]="autoCompleteAction"
                (autoCompleteActionEvent)="autoCompleteActionEvent.emit($event)"
                (selectableListChangeEvent)="selectableListChangeEvent.emit($event)"
                [hintStart]="hintStart"
                [hintEnd]="hintEnd"
                [hintValue]="hintValue"
        >
        </bl-auto-abstract>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BlAutoStatutStaticComponent),
            multi: true,
        },
    ],
})
export class BlAutoStatutStaticComponent
    extends BlAutoAbstractComponent
    implements AfterViewInit {
    public lst: BlBasicObject[];

    @ViewChild(BlAutoAbstractComponent)
    autoAbstractComponent: BlAutoAbstractComponent;

    constructor(
        private staticBddService: StaticBddService,
        public override changeDetectorRef: ChangeDetectorRef,
        public override translateService: TranslateService
    ) {
        super(translateService, changeDetectorRef);
        this.id = 'autoStatut';
    }

    ngAfterViewInit(): void {
        this.loadList();
    }

    private loadList(): void {
        this.staticBddService.listStatus().subscribe((c: BlBasicObject[]) => {
            this.lst = c;
            this.changeDetectorRef.detectChanges();
        });
    }
}
