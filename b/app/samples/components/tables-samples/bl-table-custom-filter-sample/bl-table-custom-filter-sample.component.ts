import {ChangeDetectorRef, Component, EventEmitter, HostBinding, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {LayoutService} from '@bl/bl-app-layout';
import {ToasterService} from '@bl/shared';
import {
  BlAction,
  BlDataTableFilters,
  BlTableColumn,
  BlTableComponent,
  BlTableConfig,
  BlTableEvent,
  BlTableGlobalParamRight,
  BlTableSource,
  BlTextFieldComponentType,
  IconClassEnum
} from '@esedit-md/shared-ui';
import {TranslateService} from '@ngx-translate/core';
import {BlComponentConfig} from '../../../../../../../../libs/shared-ui/src/lib/models/bl-component-config';
import {StaticBddService} from '../../../../services/static-bdd.service';
import {
    ACTION_CONTROL,
    ACTION_DEACTIVATE, ACTION_DELETE, ACTION_NOTIFY
} from "../bl-datatable-sample/bl-factory-action-button";
import {getButtonInstance} from "../../bl-text-field-sample/ButtonsEvent";
import {
    BlSampleDialogVrComponent
} from "../bl-example-table-sample/bl-sample-dialog-vr/bl-sample-dialog-vr.component";

@Component({
    selector: 'bl-table-custom-filter-sample',
    templateUrl: './bl-table-custom-filter-sample.component.html',
    styleUrls: ['./bl-table-custom-filter-sample.component.scss'],
})
export class BlTableCustomFilterSampleComponent {
    @HostBinding('style.flex-grow') flexGrow = '1';

    @ViewChild('tableComponent')
    public tableComponent: BlTableComponent;
    public config: BlTableConfig;
    public formGroup: FormGroup<{ id: FormControl<string | number | null>; nom: FormControl<number | string | null> }>;
    filterComponentsConfig: BlComponentConfig[] = []
    private datasource: MatTableDataSource<any>;
    private actionControl = getButtonInstance(ACTION_CONTROL);
    private actionDeactivate = getButtonInstance(ACTION_DEACTIVATE);
    private actionDeleteColumn = getButtonInstance(ACTION_DELETE);
    private actionNotifyColumn = getButtonInstance(ACTION_NOTIFY);
    private refreshEvent = new EventEmitter<BlDataTableFilters>();
    private eventVR = new EventEmitter<any>();
    private rowClickEvent = new EventEmitter<any>();
    private addEvent = new EventEmitter();
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
                private layoutService: LayoutService) {
        this.datasource = new MatTableDataSource<any>();
        //Initialiser les champs qui correspondra au données du filter
        this.initFilterFormGroup();
        //Définction de l'action du chargement des données à afficher dans le tableau
        this.addLoadDataEvent();
        // Action
        this.getGroupedButtonActions();
        this.configureAddEvent();
        this.configureRowClick();
        this.configureVrClick();
        this.initTableConfig();
        this.initData();
    }

    /**
     *
     * @param obj1
     * @param obj2
     * Cette fonction permet de décider si deux element sont égaux , une comparaison par contenu
     * (lors de la pagination chaque fois on aura des nouveau objet avec des nouveaux address mémoire si on fait appelle
     * au back donc cette fonction est obligatoire dans ce cas
     */
    public comparing(obj1: any, obj2: any): boolean {
        return obj1 && obj2 && obj1.id === obj2.id;
    }

    /*

     searchEvent(table: BlTableComponent) {
     const dataTableFilters=  table.getDataTableFilter();
     if(!dataTableFilters.paginatorValues &&  this.config?.data?.pageSizeOption){
     dataTableFilters.paginatorValues = {
     length: 0, pageIndex: 0, previousPageIndex: 0,
     pageSize: this.config?.data?.pageSizeOption[0]
     }
     }
     dataTableFilters.filters = this.formGroup.value;
     const result = this.staticBddService.getListUser(dataTableFilters);
     this.datasource.data = result.data;
     this.config.data.dataCount = result.dataCount;
     // Add an attribute to each archived row to make table rows expandable
     this.datasource.data =  this.datasource.data.map((row : BlTableSource) => ({
     ...row,
     isExpanded: false
     }));
     table.cacheDatatable.dataTableFilters = dataTableFilters;
     }


     /**
     * RECUPERER LA CONFIGURATION DE TOUS LES COLUMN DU TABLEAU
     */
    public getTableColumnsDefinition(): BlTableColumn[] {

        return [
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
        ];
    }

    /**
     *
     * @param key
     * L'action à executer si on veut retirer un filter directement depuis les chips
     */
    removeChip(key: string) {
        this.formGroup.get(key)?.reset();
        //Pour assurer que la recherche contrôle bien la pagination et la recherche
        //On fait appelle à la recherche du tableau
        this.tableComponent.search();
    }

    /**
     *
     * @private
     * Configuer l'action qui sera déclancher lors du clique sur le button VR
     */
    private configureVrClick() {
        this.eventVR.subscribe(val => this.displayVR(val));
    }

    /**
     *
     * @private
     * Configurer L'action qui sera déclancher lors du clique sur une ligne du tableau
     */
    private configureRowClick() {
        this.rowClickEvent.subscribe((x) => {
            this.toasterService.success('sample.datatable.event.row-click');
        });
    }

    /**
     *
     * @private
     * Configurer l'action qui sera éxecuter lors du clique sur le button ajouter
     */
    private configureAddEvent() {
        this.addEvent.subscribe(() => this.toasterService.success('sample.datatable.event.add'));
    }

    /**
     *
     * @private
     * Définition des buttons qui doit être afficher en haut du tableau
     */
    private getGroupedButtonActions() {
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

    /**
     *
     * cette fonction permet d'afficher le panneau de droite avec les filters
     */
    private openFilter() {
        this.layoutService.openContentRightPanel();
    }

    /**
     *
     * @private
     * Configurer les buttons d'action qui seront afficher dans la column action
     */
    private getActionButtonConfiguration(): BlAction[] {
        this.actionDeleteColumn.eventEmitter = new EventEmitter();
        this.actionDeleteColumn.eventEmitter.subscribe((value) => {
            this.staticBddService.deleteUser(value.id).subscribe(() => {
                this.tableComponent.removeFromSelection(value);
                this.updateList(value);
                this.toasterService.success('sample.datatable.event.delete.ok');
            });

        });
        this.actionNotifyColumn.eventEmitter = new EventEmitter();
        this.actionNotifyColumn.eventEmitter.subscribe(() => this.toasterService.success('sample.datatable.event.notify'));
        return [this.actionDeleteColumn, this.actionNotifyColumn];
    }

    /**
     *
     * @private
     * Définition de l'action à éxecuter lorsqu'on cliquer
     * sur le button actualiser ou lorsqu'on paginer ou une recherche
     */
    private addLoadDataEvent() {
        // EventEmitter
        this.refreshEvent.subscribe((value: BlDataTableFilters) => {
            this.updateList(value);
        });
    }

    /**
     *
     * @private
     * On définit l'objet qui vas encapsuler les champs qu'on affiche dans les filters
     */
    private initFilterFormGroup() {
        this.formGroup = new FormGroup({
            nom: new FormControl<BlTextFieldComponentType>(null),
            id: new FormControl<BlTextFieldComponentType>(null)
        });
        this.filterComponentsConfig.push({
            fieldName: 'id',
            label: 'sample.datatable.header.matricule',
            required: true
        });
        this.filterComponentsConfig.push({
            fieldName: 'nom',
            label: 'sample.datatable.header.lastname'
        } as BlComponentConfig);

    }

    /**
     *
     * @param value
     * @private
     * Fonction qui permet d'afficher le dialog du versement reglementaire
     */
    private displayVR(value: any): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.width = '60%';
        dialogConfig.data = {val: value};
        this.dialog.open(BlSampleDialogVrComponent, dialogConfig);
    }

    /**
     *
     * Définition de la configuration globale du tableau column + action + caracterisuque configuration
     */
    private initTableConfig() {
        // Config
        this.config = {
            globalParam: {
                right: this.getGlobalParamRight()
            },
            columnAction: this.getColumnAction(),
            groupedActionButton: this.getGroupedButtonActions(),
            data: {
                column: this.getTableColumnsDefinition(),
                dataCount: this.datasource?.data ? 0 : this.datasource?.data.length,
                datasource: this.datasource,
                pageSizeOption: [25, 50, 100, 500, 6000],
                defaultSort: {active: 'id', direction: 'asc'}
            },
            event: this.getTableEvents()
        };
    }

    /**
     *
     * Configuration des comportement spécifique dans le table telle que l'affichage des buttons d'action
     * Afficher le filter ou pas
     * Afficher la column action
     * Pouvoir selection un element dans le tableau
     * Permet l'ajout d'une nouvelle entrer
     * afficher le champs de recherche
     * Afficher ou cacher le paginatror
     */
    private getGlobalParamRight(): BlTableGlobalParamRight {
        return {
            groupActionButton: true, // action button at the top of header
            expandableRows: true, // is the table having expandable rows
            filter: false, // because no exist filter
            columnAction: true, // right to have action column
            selectOne: true, //- right to select one row
            selectAll: true, //-- right to select all the row of the display page
            search: true, //-- right to have rapid search
            add: true, //-- right to add a new element with plus button
            hidePaginator: false //-- right to activate/deactivate paginator
        };
    }

    /**
     * Configurer les actions pour une execution normal du tableau
     * refresh : l'event emitter qui permet de récuper le contenu du tableau
     * clickRow : l'event emitter qui s'exucutera lors du clique sur une ligne du tableau
     * add : l'event emitter qui s'exuctera lorsqu'on click sur le button d'ajout d'une nouvelle ligne
     * selectAll : l'event emitter qui sera executer si on click sur la case à caucher pour séléctionner tous les élements
     *
     */
    private getTableEvents(): BlTableEvent {
        return {
            refresh: this.refreshEvent,
            clickRow: this.rowClickEvent,
            add: this.addEvent
        };
    }

    /**
     *
     * Definir les buttons qui doivent être afficher dans la column action
     * et la largeur qu'on doit attribuer à cette column
     */
    private getColumnAction() {
        return {
            width: '15%',
            list: this.getActionButtonConfiguration(),
            rowActionList: this.getRowActions
        };
    }

    /**
     *
     * @private
     * La fonction qui sera appellé lors du chargement initiale de la page
     * initialise la configuration du paginateur et récuperer la liste
     */
    private initData(): void {
        const pageSize = this.config?.globalParam?.right?.hidePaginator ? this.config?.data?.dataCount : 50;
        const dataTableFilters: BlDataTableFilters = {
            filters: null,
            paginatorValues: {
                length: this.datasource?.data?.length ? 0 : this.datasource?.data?.length,
                pageIndex: 0,
                pageSize: this.config?.data?.pageSizeOption?.length && this.config?.data?.pageSizeOption?.length > 0 && !this.config?.globalParam?.right?.hidePaginator ? this.config?.data?.pageSizeOption[0]! : pageSize!,
                previousPageIndex: 0
            },
            sortValues: null,
            search: null
        }
        this.updateList(dataTableFilters);
    }

    /**
     *
     * @param dataTableFilters
     * @private
     * C'est la fonction qui permet de récupérer les données du service en assurant la pagination
     * et la recherche
     */
    private updateList(dataTableFilters: BlDataTableFilters): void {
        if (!dataTableFilters.paginatorValues && this.config?.data?.pageSizeOption) {
            dataTableFilters.paginatorValues = {
                length: 0, pageIndex: 0, previousPageIndex: 0,
                pageSize: this.config?.data?.pageSizeOption[0]!
            }
        }
        const result = this.staticBddService.getListUser(dataTableFilters);
        this.datasource.data = result.data;
        this.config.data.dataCount = result.dataCount;
        // Add an attribute to each archived row to make table rows expandable
        this.datasource.data = this.datasource.data.map((row: BlTableSource) => ({
            ...row,
            isExpanded: false
        }));
        this.changeDetectorRef.markForCheck();
    }
    private getRowActions(data:any): BlAction[] {
        const rowActions: BlAction[] = [];
      const  actionDeleteColumn = getButtonInstance(ACTION_DELETE);
             actionDeleteColumn.eventEmitter = new EventEmitter();
        actionDeleteColumn.eventEmitter.subscribe((value) => {
                this.staticBddService.deleteUser(value.id).subscribe(() => {
                    this.tableComponent.removeFromSelection(value);
                    this.updateList(value);
                    this.toasterService.success('sample.datatable.event.delete.ok');
                });

            });
            rowActions.push(actionDeleteColumn);
    if(data.id % 2 ==0){
        const actionNotifyColumn =getButtonInstance(ACTION_NOTIFY);
        actionNotifyColumn.eventEmitter = new EventEmitter();
        actionNotifyColumn.eventEmitter.subscribe(() => this.toasterService.success('sample.datatable.event.notify'));
        rowActions.push(actionNotifyColumn);
    }
        return rowActions;
    }

  public customComparing = false;
  public compareObject: ((a: any, b: any) => boolean) | undefined | null;
  public showSearchField = true;
  public defaultFilterValue: any;

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

  setOrRemoveDefaultFilter() {
    if (this.defaultFilterValue) {
      this.defaultFilterValue = undefined;
    } else {
      this.defaultFilterValue = {id: '1'};
    }
  }
}
