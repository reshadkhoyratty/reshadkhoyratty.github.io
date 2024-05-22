import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    TemplateRef,
    ViewChild
} from '@angular/core';
import {FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {LayoutService} from '@bl/bl-app-layout';
import {ToasterService} from '@bl/shared';
import {
    BlAction,
    BlAutoAbstractComponent,
    BlBasicObject, BlComponentConfig,
    BlDataTableFilters,
    BlTableColumn, BlTableComponent, BlTableConfig,
    BlTableSource, IconClassEnum
} from '@esedit-md/shared-ui';
import {TranslateService} from '@ngx-translate/core';
import {
    BlQuicksearchFooterButton
} from '../../../../../../../../libs/shared-ui/src/lib/models/bl-quicksearch-footer.model';
import {StaticBddService} from '../../../../services/static-bdd.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {
    BlQuickSearchAbstractComponent
} from "../../../../../../../../libs/shared-ui/src/lib/components/abstract/bl-quick-search-abstract/bl-quick-search-abstract.component";
import {MatTableDataSource} from "@angular/material/table";
import {
    ACTION_CONTROL,
    ACTION_DEACTIVATE,
    ACTION_DELETE, ACTION_NOTIFY,
    getButtonInstance
} from '../../bl-text-field-sample/ButtonsEvent';
import {
    BlSampleDialogVrComponent
} from '../../tables-samples/bl-example-table-sample/bl-sample-dialog-vr/bl-sample-dialog-vr.component';
import {BlQuickSearchStatutComponent} from './bl-quick-search-statut.component';

@Component({
    selector: 'bl-quick-search-statut-2',
    template: `
        <bl-quick-search-abstract [label]="'Nom'"

                                  [config]="config"
                                  [displayCode]="displayCode"
                                  [placeholder]="'Aucun nom'"
                                  [formControl]="formControl"
                                  [id]="id"
                                  [testLabelValue]="testLabelValue"
                                  [appearance]="appearance"
                                  [readOnly]="readOnly"
                                  [clearSearch]="clearSearch"
                                  (autocompleteFunction)="autocomplete($event)"
                                  [customAction]="customAction"
                                  (actionEvent)="onClickCustomAction()"
                                  [testLabelValue]="testLabelValue"
                                  [modalTitle]="modalTitle"
                                  [callOutBodyComponents]="callOutBodyComponents"
                                  [templateMode]="true"
                                  [customBody]="customBody"
                                    [dialogCancelButton]="cancelButton"
        >
            <ng-template #customBody>
                <bl-table #table [compareObject]="compareObject"
                          [tableInMatCard]="false"
                          [config]="config" [filterGroup]="formGroup"
                          [showSearchField]="showSearchField" [verticalLayout]="false" id="bl-example-table-sample2"
                          [testLabelValue]="'table-example-2'">
                    <bl-table-filter (searchEvent)="search(table)"
                                     [displayResetButton]='true'
                                     [nbFiltersPerLine]="3"
                                     [wrapInCard]="false"
                                     [testLabelValue]="'table-filter-example-2'"
                                     [verticalLayout]="false"
                                     (resetEvent)="resetSearch()"
                                     style="margin-top: 19px"
                                     blFilters>
                        <bl-text-field
                                [formControl]="formGroup2.controls.nom"
                                [label]="'sample.datatable.header.lastname'"
                                id="filter_nom"
                                [testLabelValue]="'lastname-text-field'"
                        ></bl-text-field>

                        <bl-text-field
                                [formControl]="formGroup2.controls.prenom"
                                [label]="'Prenom'"
                                id="filter_prenom"
                                [testLabelValue]="'city-text-field'"
                        ></bl-text-field>
                    </bl-table-filter>

                </bl-table>
            </ng-template>

        </bl-quick-search-abstract>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BlQuickSearchSecondStatutComponent),
            multi: true
        }
    ]
})
export class BlQuickSearchSecondStatutComponent extends BlQuickSearchAbstractComponent implements OnInit {

    @ViewChild('verticalTable', {static: false}) verticalTable: BlTableComponent;

    public override config: BlTableConfig;
    public formGroup: FormGroup<{ id: FormControl<string | number | null>; nom: FormControl<number | string | null> }>;
    public formGroup2: FormGroup<{ prenom: FormControl<string | number | null>; nom: FormControl<number | string | null> }>;
    public compareObject: ((a: any, b: any) => boolean) | undefined | null;
    public customComparing = false;
    public showSearchField = true;
    public cancelButton : BlQuicksearchFooterButton;
    filterComponentsConfig: BlComponentConfig[] = [];

    private datasource2: MatTableDataSource<any>;

    private refreshEvent = new EventEmitter<BlDataTableFilters>();
    private eventVR = new EventEmitter<any>();
    private rowClickEvent = new EventEmitter<any>();
    private addEvent = new EventEmitter();

    @ViewChild(BlAutoAbstractComponent) autoAbstractComponent: BlAutoAbstractComponent;
    @ViewChild(BlQuickSearchAbstractComponent, {static: false}) blQuickSearchAbstractComponent: BlQuickSearchAbstractComponent;

    ngOnInit() {}
    constructor(private toasterService: ToasterService,
                public override translateService: TranslateService,
                private staticBddService: StaticBddService,
                public  override dialog: MatDialog,
                private changeDetectorRef: ChangeDetectorRef,
                public layoutService: LayoutService) {
        super(translateService, dialog);

        this.formGroup = new FormGroup({
            nom: new FormControl<string | number | null>(null),
            id: new FormControl<string | number | null>(null)
        });

        this.filterComponentsConfig.push({
            fieldName: 'nom',
            label: this.translateService.instant('sample.datatable.header.lastname')
        });
        this.formGroup2 = new FormGroup({
            prenom: new FormControl<string | number | null>(null),
            nom: new FormControl<string | number | null>(null)
        });

        this.datasource2 = new MatTableDataSource<any>();
        this.configureRefreshEvent();
        this.initConfigTable();

        this.initData(this.config, this.datasource2);

      this.cancelButton =  {
        butonName:'Fermer',
        withIcon:true,
        tooltip:'tooltip ',
        iconClassName:IconClassEnum.cancel_circle

      }
    }

    initConfigTable() {
        this.config = {
            globalParam: {
                right: {
                     expandableRows: true, // is the table having expandable rows
                    filter: true, // because no exist filter
                    columnAction: true, // right to have action column
                     selectAll: true, //-- right to select all the row of the display page
                    search: true, //-- right to have rapid search

                }
            },

            data: {
                column: [
                    {
                        name: 'nom',
                        labelSelected: this.translateService.instant('sample.datatable.header.selected'),
                        value: this.translateService.instant('sample.datatable.header.lastname'),
                        align: 'left',
                        width: '25%'
                    },
                    {
                        name: 'prenom',
                        value: this.translateService.instant('sample.datatable.header.firstname'),
                        align: 'left',
                        width: '25%'
                    },
                    {
                        name: 'vr',
                        value: this.translateService.instant('sample.datatable.header.vr'),
                        align: 'center',
                        width: '25%',
                        actionColumn: {
                            idAction: 'actionVR',
                            label: 'sample.datatable.header.vr',
                            eventEmitter: this.eventVR,
                            icon: {icon: IconClassEnum.file_lock, tooltip: 'sample.datatable.header.vr'}
                        }
                    },
                    {
                        name: 'adresse.city',
                        value: this.translateService.instant('sample.datatable.header.city'),
                        align: 'left',
                        width: '25%'
                    }
                ],
                dataCount: 150,
                datasource: this.datasource2,
                pageSizeOption: [25, 50, 100, 200],
                defaultSort: {active: 'id', direction: 'asc'}
            },
            event: {
                refresh: this.refreshEvent,
                clickRow: this.rowClickEvent,

            }
        };
    }


    configureRefreshEvent() {
         this.rowClickEvent.subscribe((x) => {
            if (this.blQuickSearchAbstractComponent && this.blQuickSearchAbstractComponent.dialogRef) {

                const value:BlBasicObject = {id: x.id, code: x.nom, label: x.nom};
                 this.blQuickSearchAbstractComponent.dialogRef.close(value);
            }
        });
        this.eventVR.subscribe(val => this.displayVR(val));
        this.refreshEvent.subscribe((value: BlDataTableFilters) => {
            this.updateList(value, this.datasource2, this.config);
        });
    }

    public comparing(obj1: any, obj2: any): boolean {
        return obj1 && obj2 && obj1.id === obj2.id;
    }
    public autocomplete(a: string): void {
          this.staticBddService.autocompleteStatut(a);
    }
    public changeComparing() {
        if (!this.customComparing) {
            this.compareObject = this.comparing;
        } else {
            this.compareObject = null;
        }
        this.customComparing = !this.customComparing;
        this.changeDetectorRef.detectChanges();
    }

    public hideOrShowSearchField() {
        this.showSearchField = !this.showSearchField;
        this.changeDetectorRef.detectChanges();
    }
     search(table: BlTableComponent) {
        const dataTableFilters = table.getDataTableFilter();
        if (!dataTableFilters.paginatorValues && this.config?.data?.pageSizeOption) {
            dataTableFilters.paginatorValues = {
                length: 0, pageIndex: 0, previousPageIndex: 0,
                pageSize: this.config?.data?.pageSizeOption[0]
            }
        }
        dataTableFilters.filters = this.formGroup2.value;
        const result = this.staticBddService.getListUser(dataTableFilters);
        this.datasource2.data = result.data;
        this.config.data.dataCount = result.dataCount;
        // Add an attribute to each archived row to make table rows expandable
        this.datasource2.data = this.datasource2.data.map((row: BlTableSource) => ({
            ...row,
            isExpanded: false
        }));
        table.cacheDatatable.dataTableFilters = dataTableFilters;
    }

    private initData(config: BlTableConfig, datasource: MatTableDataSource<BlTableSource>): void {
        const pageSize = this.config?.globalParam?.right?.hidePaginator ? this.config?.data?.dataCount : 50;
    }

    private updateList(dataTableFilters: BlDataTableFilters, datasource: MatTableDataSource<BlTableSource>, config: BlTableConfig, table?: BlTableComponent): void {
        if (!dataTableFilters.paginatorValues && config?.data?.pageSizeOption) {
            dataTableFilters.paginatorValues = {
                length: 0, pageIndex: 0, previousPageIndex: 0,
                pageSize: config?.data?.pageSizeOption[0]
            }
        }
        const result = this.staticBddService.getListUser(dataTableFilters);
        datasource.data = result.data;
        config.data.dataCount = result.dataCount;
        // Add an attribute to each archived row to make table rows expandable
        datasource.data = datasource.data.map((row: BlTableSource) => ({
            ...row,
            isExpanded: false
        }));
        this.changeDetectorRef.markForCheck();
    }
    private displayVR(value: any): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.width = '60%';
        dialogConfig.data = {val: value};
        this.dialog.open(BlSampleDialogVrComponent, dialogConfig);
    }
    public resetSearch(): void {
        this.formGroup2.controls.nom.reset();
        this.formGroup2.controls.prenom.reset();



    }
}
