import {AfterViewInit, ChangeDetectorRef, Component, forwardRef, Input, OnInit, ViewChild,} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {BlBasicObject, BlListBoxAbstractComponent,} from '@esedit-md/shared-ui';
import {StaticBddService} from '../../../../services/static-bdd.service';

@Component({
    selector: 'bl-list-box-statut',
    template: `
        <bl-list-box-abstract
                [label]="'sample.status.list.title'"
                [data]="lst"
                [displayCode]="displayCode"
                [placeholder]="'sample.status.list.none'"
                [formControl]="formControl"
                [addNullableOption]="addNullableOption"
                [id]="id"
                [testLabelValue]="testLabelValue"
                [appearance]="appearance"
                [readOnly]="readOnly"
                (selectableListChangeEvent)="selectableListChangeEvent.emit($event)"
        >
        </bl-list-box-abstract>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BlListBoxStatutComponent),
            multi: true,
        },
    ],
})
export class BlListBoxStatutComponent
    extends BlListBoxAbstractComponent
    implements AfterViewInit, OnInit {
    public lst: BlBasicObject[];
    public lst2: BlBasicObject[] = [];
    @ViewChild(BlListBoxAbstractComponent)
    lbComponent: BlListBoxAbstractComponent;
    @Input() lstVide = false;

    constructor(
        private staticBddService: StaticBddService,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        super();
        this.id = 'lbStatut';
    }

    ngAfterViewInit(): void {
        this.loadList();
        if (this.lstVide) {
            this.lst = this.lst2;
        }
    }

    override ngOnInit() {

    }

    private loadList(): void {
        this.staticBddService.listStatus().subscribe((c: BlBasicObject[]) => {
            this.lst = c;
            this.changeDetectorRef.detectChanges();
        });
    }
}

@Component({
    selector: 'bl-list-box-statut-with-disabled',
    template: `
        <bl-list-box-abstract
                [label]="'sample.status.list.title'"
                [data]="lst"
                [displayCode]="displayCode"
                [placeholder]="'sample.status.list.none'"
                [formControl]="formControl"
                [addNullableOption]="addNullableOption"
                [id]="id"
                [testLabelValue]="testLabelValue"
                [appearance]="appearance"
                [readOnly]="readOnly"
                (selectableListChangeEvent)="selectableListChangeEvent.emit($event)"
        >
        </bl-list-box-abstract>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BlListBoxStatutWithDisabledComponent),
            multi: true,
        },
    ],
})
export class BlListBoxStatutWithDisabledComponent
    extends BlListBoxAbstractComponent
    implements AfterViewInit, OnInit {
    public lst: BlBasicObject[];
    public lst2: BlBasicObject[] = [];
    @ViewChild(BlListBoxAbstractComponent)
    lbComponent: BlListBoxAbstractComponent;
    @Input() lstVide = false;

    constructor(
        private staticBddService: StaticBddService,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        super();
        this.id = 'lbStatut';
    }

    ngAfterViewInit(): void {
        this.loadList();
        if (this.lstVide) {
            this.lst = this.lst2;
        }
    }

    override ngOnInit() {

    }

    private loadList(): void {
        this.staticBddService.listStatus().subscribe((c: BlBasicObject[]) => {
            c = JSON.parse(JSON.stringify(c)) as typeof c;
            for (const item of c) {
                if (Number(item.id) % 2 === 0) {
                    item.disabled = true;
                }
            }
            this.lst = c;

            this.changeDetectorRef.detectChanges();
        });
    }
}
