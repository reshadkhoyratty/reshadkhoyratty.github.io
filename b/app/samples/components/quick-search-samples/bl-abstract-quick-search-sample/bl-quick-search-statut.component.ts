import {Component, EventEmitter, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {BlAutoAbstractComponent, BlBasicObject, BlDataTableFilters, BlTableColumn} from '@esedit-md/shared-ui';
import {TranslateService} from '@ngx-translate/core';
import {StaticBddService} from '../../../../services/static-bdd.service';
import {MatDialog} from "@angular/material/dialog";
import {
  BlQuickSearchAbstractComponent
} from "../../../../../../../../libs/shared-ui/src/lib/components/abstract/bl-quick-search-abstract/bl-quick-search-abstract.component";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'bl-quick-search-statut',
  template: `
    <bl-quick-search-abstract [label]="'sample.status.list.title'"
                              [data]="lst"
                              [config]="config"
                              [displayCode]="displayCode"
                              [placeholder]="'sample.status.list.none'"
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
                              >
    </bl-quick-search-abstract>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BlQuickSearchStatutComponent),
      multi: true
    }
  ]
})
export class BlQuickSearchStatutComponent extends BlQuickSearchAbstractComponent implements OnInit {


  public lst: BlBasicObject[];
  @ViewChild(BlAutoAbstractComponent) autoAbstractComponent: BlAutoAbstractComponent;
  @ViewChild(BlQuickSearchAbstractComponent, {static: false}) blQuickSearchAbstractComponent: BlQuickSearchAbstractComponent;

  columns: BlTableColumn[] = [
    {
      name: 'code',
      value: this.translateService.instant('sample.datatable.header.code'),
      align: 'left',
      width: '50%'
    },
    {
      name: 'label',
      value: this.translateService.instant('sample.datatable.header.label'),
      align: 'left',
      width: '50%'
    }
  ];
  private datasource: MatTableDataSource<BlBasicObject>;
  private refreshEvent = new EventEmitter<BlDataTableFilters>();
  private rowClickEvent = new EventEmitter<any>();
  constructor(public staticBddService: StaticBddService,
              public override translateService: TranslateService,
              public override dialog: MatDialog) {
    super(translateService, dialog);
    this.id = 'quicksearchStatut';
  }

  public ngOnInit(): void {
    this.loadList();

  }

  public autocomplete(a: string): void {
    this.lst = this.staticBddService.autocompleteStatut(a);
  }

  private loadList(): void {

    this.datasource = new MatTableDataSource<any>();
    // EventEmitter
    this.refreshEvent.subscribe((value: BlDataTableFilters) => {
      this.updateList(value);
    });
    this.rowClickEvent.subscribe((x) => {
      if (this.blQuickSearchAbstractComponent && this.blQuickSearchAbstractComponent.dialogRef) {
        console.log(x);
        this.blQuickSearchAbstractComponent.dialogRef.close(x);
      }
    });

    // Config
    this.config = {
      globalParam: {
        right: {
          groupActionButton: false, // action button at the top of header
          expandableRows: false, // is the table having expandable rows
          filter: false, // because no exist filter
          columnAction: false, // right to have action column
          selectOne: false, //- right to select one row
          selectAll: false, //-- right to select all the row of the display page
          search: true, //-- right to have rapid search
          add: false, //-- right to add a new element with plus button
          hidePaginator: true //-- right to activate/deactivate paginator
        }
      },
      data: {
        column: this.columns,
        dataCount: 50,
        datasource: this.datasource,
        pageSizeOption: [25, 50, 100, 200],
        defaultSort: {active: 'id', direction: 'asc'}
      },
      event: {
        refresh: this.refreshEvent,
        clickRow: this.rowClickEvent
      }
    };
    this.initData();
  }

  private initData(): void {
    const pageSize = this.config?.globalParam?.right?.hidePaginator ? this.config?.data?.dataCount : 50;
    const dataTableFilters: BlDataTableFilters = {
      filters: null,
      paginatorValues: {
        length: this.datasource.data.length,
        pageIndex: 0,
        pageSize: this.config?.data?.pageSizeOption?.length && this.config?.data?.pageSizeOption?.length > 0
        && !this.config?.globalParam?.right?.hidePaginator ? this.config?.data?.pageSizeOption[0] : pageSize,
        previousPageIndex: 0
      },
      sortValues: null,
      search: null
    }
    this.updateList(dataTableFilters);
  }

  private updateList(dataTableFilters: BlDataTableFilters): void {
    if (!dataTableFilters.paginatorValues && this.config?.data?.pageSizeOption) {
      dataTableFilters.paginatorValues = {
        length: 0, pageIndex: 0, previousPageIndex: 0,
        pageSize: this.config?.data?.pageSizeOption[0]
      }
    }
    const result = this.staticBddService.getListStatus(dataTableFilters, this.lst);
    this.datasource.data = result.data;
    if (this.config)
      this.config.data.dataCount = result.dataCount;
  }

}
