import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import {FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {LayoutService} from '@bl/bl-app-layout';
import {ToasterService} from '@bl/shared';
import {
  BlBasicObject,

  BlCalloutObject, BlComponentConfig, BlDataTableFilters,
  BlQuickSearchMultipleAbstractComponent, BlQuickSearchMultipleExampleComponent, BlTableComponent,
  BlTableConfig, BlTableSource,
  CalloutClassEnum, IconClassEnum
} from '@esedit-md/shared-ui';
import {TranslateService} from '@ngx-translate/core';
import {StaticBddService} from '../../../../services/static-bdd.service';

import {
  BlSampleDialogVrComponent
} from '../../tables-samples/bl-example-table-sample/bl-sample-dialog-vr/bl-sample-dialog-vr.component';

@Component(
  {
    selector:'bl-dialog-content',
    template:`
      <div class="modal-quicksearch-container">
        <div class="header-quick-search">

          <h2> {{data.informations.modalTitle}}</h2>

          <div>
            <bl-button (click)="close()"
                       [iconButton]="true"
                       [iconClass]="'cross'"
                       [primary]="true"
                       [size]="2"></bl-button>
          </div>
        </div>
        <div class="body-quick-search" style="overflow-x: hidden">
          <div *ngFor="let callOutInformation of data.informations.callOutBodyComponents">
            <bl-callout [calloutClass]="callOutInformation.calloutCLass" [enablePicto]="callOutInformation.enablePicto" [testLabelValue]="callOutInformation.testLabelValue" [text]="callOutInformation.text" [title]="callOutInformation.title" class="m-2" >
            </bl-callout>
          </div>

            <bl-table #table [compareObject]="compareObject"
                      [tableInMatCard]="false"
                      [config]="config" [filterGroup]="formGroup2"
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


        </div>
        <div class="footer-quick-search">
        <bl-button (click)="validate()" [id]="'btnValidate'" [primary]="true"
                   [testLabelValue]="testLabelValue +'_validate'" [title]="'sample.button.validate'"></bl-button>
        <bl-button (click)="close()" [iconClass]="classRollback" [id]="'btnRollback'"  [size]="3" [testLabelValue]="'button_with_icon_2'"  [title]="'bl-common.back'" class="cancel-buton"></bl-button>
        </div>
        </div>`,
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => BlDialogContentComponent),
        multi: true
      }
    ]
  }
)
export class BlDialogContentComponent extends BlQuickSearchMultipleExampleComponent implements OnInit,AfterViewInit{
   modalTitle = '';
  callOuts: BlCalloutObject[]= [];
  @ViewChild('table', {static: false}) verticalTable: BlTableComponent;
  public override config: BlTableConfig;
  public config2: BlTableConfig;
  public formGroup2: FormGroup<{ id: FormControl<string | number | null>; nom: FormControl<number | string | null>, prenom: FormControl<number | string | null> }>;
  public compareObject: ((a: any, b: any) => boolean) | undefined | null;
  public customComparing = false;
  public showSearchField = true;
  filterComponentsConfig: BlComponentConfig[] = [];
  private datasource: MatTableDataSource<any>;

  private refreshEvent = new EventEmitter<BlDataTableFilters>();

  private rowClickEvent = new EventEmitter<any>();
  private changeDetectorRef: ChangeDetectorRef;

  constructor(  toasterService: ToasterService,
                override translateService: TranslateService,
                public staticBddService: StaticBddService,
                  dialog: MatDialog,
              changeDetectorRef: ChangeDetectorRef,
                layoutService: LayoutService,

                override dialogRef: MatDialogRef<BlDialogContentComponent>, // Change this line
              @Inject(MAT_DIALOG_DATA) public override data: any) {
    super(translateService, dialog, dialogRef, data);
    this.changeDetectorRef = changeDetectorRef;
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
      nom: new FormControl<string | number | null>(null),
      prenom: new FormControl<string | number | null>(null)
    });
    this.datasource = new MatTableDataSource<any>();


    // EventEmitter
    this.configureRefreshEvent();
    // Actions

    // Config of the first example table with vertical filters
    this.initConfigFirstTable();


    this.initData(this.config, this.datasource);

  }

   get _data(): any {
    return this.data;
  }

   set _data(value: any) {
    this.data = value;
  }
   ngOnInit(): void {

    this.modalTitle = 'Modal Title';
    this.callOuts = [
      {
        calloutCLass: CalloutClassEnum.information,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a consequat dolor, quis aliquam nibh. Nullam massa velit, maximus malesuada nibh sit amet, suscipit tincidunt enim. ',
        title: 'Information',
        enablePicto: true
      },
      {
        calloutCLass: CalloutClassEnum.warning,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a consequat dolor, quis aliquam nibh. Nullam massa velit, maximus malesuada nibh sit amet, suscipit tincidunt enim. ',
        title: 'Warning',
        enablePicto: true

      }
    ]
     console.log(this.verticalTable)
  }

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
          hidePaginator: false //-- right to activate/deactivate paginator
        }
      },

      data: {
        column : [
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
            width: '30%'
          },


          {
            name: 'adresse.city',
            value: this.translateService.instant('sample.datatable.header.city'),
            align: 'left',
            width: '30%'
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

      }
    };
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
    this.datasource.data = result.data;
    this.config.data.dataCount = result.dataCount;
    // Add an attribute to each archived row to make table rows expandable
    this.datasource.data = this.datasource.data.map((row: BlTableSource) => ({
      ...row,
      isExpanded: false
    }));
    table.cacheDatatable.dataTableFilters = dataTableFilters;
  }

  configureRefreshEvent() {

    this.refreshEvent.subscribe((value: BlDataTableFilters) => {
      this.updateList(value, this.datasource, this.config, this.verticalTable);
    });

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
    this.datasource.data = result.data;
    this.config2.data.dataCount = result.dataCount;
    // Add an attribute to each archived row to make table rows expandable
    this.datasource.data = this.datasource.data.map((row: BlTableSource) => ({
      ...row,
      isExpanded: false
    }));
    table.cacheDatatable.dataTableFilters = dataTableFilters;
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


  public resetSearch(): void {
    this.formGroup2.controls.nom.reset();
    this.formGroup2.controls.prenom.reset();
   this.search(this.verticalTable);


  }

  ngAfterViewInit() {
    console.log(this.verticalTable)
  }

  override validate() {
    console.log(this.verticalTable.cacheDatatable.selectedData );

    const  choosedObjects : BlBasicObject[] = this.verticalTable.cacheDatatable.selectedData.map((value: any) => {

       return ({id:value.id,code:value.nom,label:value.prenom});
    });
    console.log("choosed"+choosedObjects)
    this.dialogRef.close(choosedObjects);
  }
}
