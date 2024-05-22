import {ChangeDetectorRef, Component, EventEmitter, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {LayoutService} from '@bl/bl-app-layout';
import {ToasterService} from '@bl/shared';
import {
    BlAction, BlComponentConfig,
    BlDataTableFilters,
    BlTableComponent,
    BlTableConfig,
    BlTableSource,
    IconClassEnum
} from '@esedit-md/shared-ui';
import {TranslateService} from '@ngx-translate/core';
import {
    ACTION_CONTROL,
    ACTION_DEACTIVATE,
    ACTION_DELETE,
    ACTION_NOTIFY,
    getButtonInstance,
} from '../bl-datatable-sample/bl-factory-action-button';
import {BlSampleDialogVrComponent} from './bl-sample-dialog-vr/bl-sample-dialog-vr.component';
import {StaticBddService} from "../../../../services/static-bdd.service";

@Component({
    selector: 'bl-example-table-sample',
    templateUrl: './bl-example-table-sample.component.html'
})
export class BlExampleTableSampleComponent {

    @ViewChild('verticalTable', {static: false}) verticalTable: BlTableComponent;
    public config: BlTableConfig;
    public config2: BlTableConfig;
    public formGroup: FormGroup<{ id: FormControl<string | number | null>; nom: FormControl<number | string | null> }>;
    public formGroup2: FormGroup<{ id: FormControl<string | number | null>; nom: FormControl<number | string | null> }>;
    public compareObject: ((a: any, b: any) => boolean) | undefined | null;
    public customComparing = false;
    public showSearchField = true;
    filterComponentsConfig: BlComponentConfig[] = [];
    private datasource: MatTableDataSource<any>;
    private datasource2: MatTableDataSource<any>;
    private actionControl = getButtonInstance(ACTION_CONTROL);
    private actionDeactivate = getButtonInstance(ACTION_DEACTIVATE);
    private actionDeleteColumn = getButtonInstance(ACTION_DELETE);
    private actionNotifyColumn = getButtonInstance(ACTION_NOTIFY);
    private refreshEvent = new EventEmitter<BlDataTableFilters>();
    private refreshEvent2 = new EventEmitter<BlDataTableFilters>();
    private eventVR = new EventEmitter<any>();
    private rowClickEvent = new EventEmitter<any>();
    private addEvent = new EventEmitter();
    private actionDeleteColumn2 = getButtonInstance(ACTION_DELETE);
    private openRightPanelEventEmitter: EventEmitter<any> = new EventEmitter<any>();
    public openAction: BlAction = {
        idAction: 'rightPanelButton',
        idSelector: 'btn_grp_rightPanelButton',
        label: 'sample.datatable.filter.by',
        icon: {
            icon: IconClassEnum.filter,
            tooltip: 'sample.datatable.filter.by'
        },
        buttonType: 'mat-icon-button',
        buttonFix: true,
        eventEmitter: this.openRightPanelEventEmitter,
        badgeLabel: 'i',
        badgeColor: 'accent'
    };

    constructor(private toasterService: ToasterService,
                private translateService: TranslateService,
                private staticBddService: StaticBddService,
                private dialog: MatDialog,
                private changeDetectorRef: ChangeDetectorRef,
                public layoutService: LayoutService) {

        this.formGroup = new FormGroup({
            nom: new FormControl<string | number | null>(null),
            id: new FormControl<string | number | null>(null)
        });
        this.filterComponentsConfig.push({
            fieldName: 'id',
            label: this.translateService.instant('sample.datatable.header.matricule')
        });
        this.filterComponentsConfig.push({
            fieldName: 'nom',
            label: this.translateService.instant('sample.datatable.header.lastname')
        });
        this.formGroup2 = new FormGroup({
            id: new FormControl<string | number | null>(null),
            nom: new FormControl<string | number | null>(null)
        });
        this.datasource = new MatTableDataSource<any>();
        this.datasource2 = new MatTableDataSource<any>();

        // EventEmitter
        this.configureRefreshEvent();
        // Actions
        this.getGroupedButtonActions();
        // Config of the first example table with vertical filters
        this.initConfigFirstTable();
        // Config of the second example table with horyzontal filters
        this.initConfigSecondTable();

        this.initData(this.config, this.datasource);
        this.initData(this.config2, this.datasource2);
    }

    /**
     * configuration of the first table with filters in panel right
     */
    initConfigFirstTable() {
        this.config = {
            globalParam: {
                right: {
                    groupActionButton: true, // action button at the top of header
                    expandableRows: true, // is the table having expandable rows
                    filter: true, // because no exist filter
                    columnAction: true, // right to have action column
                    selectOne: true, //- right to select one row
                    selectAll: true, //-- right to select all the row of the display page
                    search: true, //-- right to have rapid search
                    add: true, //-- right to add a new element with plus button
                    hidePaginator: false //-- right to activate/deactivate paginator
                }
            },
            columnAction: {
                width: '15%',
                list: [this.actionDeleteColumn, this.actionNotifyColumn]
            },
            groupedActionButton: this.getGroupedActionsFirstTable(),
            data: {
                column: [
                    {
                        name: 'id',
                        value: this.translateService.instant('sample.datatable.header.matricule'),
                        align: 'left',
                        width: '10%'
                    },
                    {
                        name: 'nom',
                        labelSelected: this.translateService.instant('sample.datatable.header.selected'),
                        value: this.translateService.instant('sample.datatable.header.lastname'),
                        align: 'left',
                        width: '30%',
                        // isHidden:true
                    },
                    {
                        name: 'prenom',
                        value: this.translateService.instant('sample.datatable.header.firstname'),
                        align: 'left',
                        width: '20%'
                    },
                    {
                        name: 'vr',
                        value: this.translateService.instant('sample.datatable.header.vr'),
                        align: 'center',
                        width: '10%',
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
                        width: '10%'
                    }
                ],
                dataCount: 150,
                datasource: this.datasource,
                pageSizeOption: [25, 50, 100, 200],
                defaultSort: {active: 'id', direction: 'asc'}
            },
            event: {
                refresh: this.refreshEvent,
                clickRow: this.rowClickEvent,
                add: this.addEvent
            }
        };
    }

    /**
     * configuration of the second table with filters on top
     */
    initConfigSecondTable() {

        this.config2 = {
            globalParam: {
                right: {
                    groupActionButton: true, // action button at the top of header
                    expandableRows: true, // is the table having expandable rows
                    filter: true, // because no exist filter
                    columnAction: true, // right to have action column
                    selectOne: true, //- right to select one row
                    selectAll: true, //-- right to select all the row of the display page
                    search: true, //-- right to have rapid search
                    add: true, //-- right to add a new element with plus button
                    hidePaginator: false //-- right to activate/deactivate paginator
                }
            },
            columnAction: {
                width: '15%',
                list: this.getColumnAction2()
            },
            groupedActionButton: this.getGroupedActionsSecondTable(),
            data: {
                column: [
                    {
                        name: 'id',
                        value: this.translateService.instant('sample.datatable.header.matricule'),
                        align: 'left',
                        width: '10%'
                    },
                    {
                        name: 'nom',
                        labelSelected: this.translateService.instant('sample.datatable.header.selected'),
                        value: this.translateService.instant('sample.datatable.header.lastname'),
                        align: 'left',
                        width: '30%'
                    },
                    {
                        name: 'prenom',
                        value: this.translateService.instant('sample.datatable.header.firstname'),
                        align: 'left',
                        width: '20%'
                    },
                    {
                        name: 'vr',
                        value: this.translateService.instant('sample.datatable.header.vr'),
                        align: 'center',
                        width: '10%',
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
                        width: '10%'
                    }
                ],
                dataCount: 150,
                datasource: this.datasource2,
                pageSizeOption: [25, 50, 100, 200],
                defaultSort: {active: 'id', direction: 'asc'}
            },
            event: {
                refresh: this.refreshEvent2,
                clickRow: this.rowClickEvent,
                add: this.addEvent
            }
        };
    }

    configureRefreshEvent() {

        this.addEvent.subscribe(() => this.toasterService.success('sample.datatable.event.add'));
        this.rowClickEvent.subscribe((x) => {
            this.toasterService.success('sample.datatable.event.row-click');
        });
        this.eventVR.subscribe(val => this.displayVR(val));

        this.refreshEvent.subscribe((value: BlDataTableFilters) => {
            this.updateList(value, this.datasource, this.config, this.verticalTable);
        });
        this.refreshEvent2.subscribe((value: BlDataTableFilters) => {
            this.updateList(value, this.datasource2, this.config2);
        });
    }

    public comparing(obj1: any, obj2: any): boolean {
        return obj1 && obj2 && obj1.id === obj2.id;
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



    searchEvent(table: BlTableComponent) {
        const dataTableFilters = table.getDataTableFilter();
        if (!dataTableFilters.paginatorValues && this.config2?.data?.pageSizeOption) {
            dataTableFilters.paginatorValues = {
                length: 0, pageIndex: 0, previousPageIndex: 0,
                pageSize: this.config2?.data?.pageSizeOption[0]
            }
        }
        dataTableFilters.filters = this.formGroup2.value;
        const result = this.staticBddService.getListUser(dataTableFilters);
        this.datasource2.data = result.data;
        this.config2.data.dataCount = result.dataCount;
        // Add an attribute to each archived row to make table rows expandable
        this.datasource2.data = this.datasource2.data.map((row: BlTableSource) => ({
            ...row,
            isExpanded: false
        }));
        table.cacheDatatable.dataTableFilters = dataTableFilters;
    }

    private getGroupedActionsFirstTable() {
        this.actionControl.icon = undefined;
        this.actionControl.label = 'sample.datatable.action.control_all';
        this.actionControl.eventEmitter = new EventEmitter();
        this.actionControl.eventEmitter.subscribe(() => this.toasterService.success('sample.datatable.event.control'));
        this.actionDeactivate.eventEmitter = new EventEmitter();
        this.actionDeactivate.icon = undefined;
        this.actionDeactivate.eventEmitter.subscribe(() => this.toasterService.success('sample.datatable.event.deactivate'));
        // ADD OPEN FILTER BUTTON
        this.openRightPanelEventEmitter.subscribe(() => {
            this.openFilter();
        });
        return [this.actionControl, this.actionDeactivate, this.openAction];
    }

    private getGroupedActionsSecondTable() {
        this.actionControl.icon = undefined;
        this.actionControl.label = 'sample.datatable.action.control_all';
        this.actionControl.eventEmitter = new EventEmitter();
        this.actionControl.eventEmitter.subscribe(() => this.toasterService.success('sample.datatable.event.control'));
        this.actionDeactivate.eventEmitter = new EventEmitter();
        this.actionDeactivate.icon = undefined;
        this.actionDeactivate.eventEmitter.subscribe(() => this.toasterService.success('sample.datatable.event.deactivate'));

        return [this.actionControl, this.actionDeactivate];
    }

    private getColumnAction2() {
        this.actionDeleteColumn2.eventEmitter = new EventEmitter();
        this.actionDeleteColumn2.eventEmitter.subscribe((value) => {
            this.staticBddService.deleteUser(value.id).subscribe(() => {
                this.verticalTable.removeFromSelection(value);
                this.updateList(value, this.datasource2, this.config2);
                this.toasterService.success('sample.datatable.event.delete.ok');
            });
        });

        this.actionNotifyColumn.eventEmitter = new EventEmitter();
        this.actionNotifyColumn.eventEmitter.subscribe(() => this.toasterService.success('sample.datatable.event.notify'));

        return [this.actionDeleteColumn2, this.actionNotifyColumn];
    }

    /**
     *
     * @private
     * Définition des buttons qui doit être afficher en haut du tableau
     */
    private getGroupedButtonActions() {
        this.actionDeleteColumn.eventEmitter = new EventEmitter();
        this.actionDeleteColumn.eventEmitter.subscribe((value) => {
            this.staticBddService.deleteUser(value.id).subscribe(() => {
                this.updateList(value, this.datasource, this.config, this.verticalTable);
                this.toasterService.success('sample.datatable.event.delete.ok');
            });
        });

        return [this.actionDeleteColumn, this.openAction];
    }

    /**
     *
     * cette fonction permet d'afficher le panneau de droite avec les filters
     */
    private openFilter() {
        this.layoutService.openContentRightPanel();
    }

    private initData(config: BlTableConfig, datasource: MatTableDataSource<BlTableSource>): void {
        const pageSize = this.config?.globalParam?.right?.hidePaginator ? this.config?.data?.dataCount : 50;
        const dataTableFilters: BlDataTableFilters = {
            filters: null,
            paginatorValues: {
                length: this.datasource.data.length,
                pageIndex: 0,
                pageSize: this.config?.data?.pageSizeOption?.length && this.config?.data?.pageSizeOption?.length > 0 && !this.config?.globalParam?.right?.hidePaginator ? this.config?.data?.pageSizeOption[0] : pageSize,
                previousPageIndex: 0
            },
            sortValues: null,
            search: null
        }

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
}
