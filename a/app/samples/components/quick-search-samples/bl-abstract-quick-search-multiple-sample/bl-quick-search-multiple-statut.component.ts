import {ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {
  BlAutoAbstractComponent,
  BlBasicObject,
  BlCalloutObject,
  BlDataTableFilters, BlQuicksearchFooterButton,
  BlTableColumn, CalloutClassEnum, IconClassEnum
} from '@esedit-md/shared-ui';
import {TranslateService} from '@ngx-translate/core';
import {StaticBddService} from '../../../../services/static-bdd.service';
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {
  BlQuickSearchMultipleAbstractComponent
} from "../../../../../../../../libs/shared-ui/src/lib/components/abstract/bl-quick-search-multiple-abstract/bl-quick-search-multiple-abstract.component";

@Component({
  selector: 'bl-quick-search-multiple-statut',
  template: `
    <bl-quick-search-multiple-abstract
      [label]="'sample.status.list.title'"
      [data]="lst"
      [config]="config"
      [displayCode]="displayCode"
      [placeholder]="withChipset?'sample.status.list.saisie':'sample.status.list.none'"
      [formControl]="formControl"
      [id]="id"
      [testLabelValue]="testLabelValue"
      [appearance]="appearance"
      [readOnly]="readOnly"
      [clearSearch]="clearSearch"
      [withChipset]="withChipset"
      (autocompleteFunction)="autocomplete($event)"
      [callOutBodyComponents]="callOutBodyComponents"

      [modalTitle]="modalTitle"
    >
    </bl-quick-search-multiple-abstract>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BlQuickSearchMultipleStatutComponent),
      multi: true
    }
  ]
})
export class BlQuickSearchMultipleStatutComponent extends BlQuickSearchMultipleAbstractComponent implements OnInit {

  public lst: BlBasicObject[];
  callOuts: BlCalloutObject[] = [];

  @Input() override withChipset: boolean;

  @ViewChild(BlAutoAbstractComponent) autoAbstractComponent: BlAutoAbstractComponent;
  @ViewChild(BlQuickSearchMultipleAbstractComponent, {static: false}) blQuickSearchMultipleAbstractComponent: BlQuickSearchMultipleAbstractComponent;
   cancelButton : BlQuicksearchFooterButton;
    validateButton: BlQuicksearchFooterButton;

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

  constructor(public staticBddService: StaticBddService,
              public override translateService: TranslateService,
              public override dialog: MatDialog,
              public cdr: ChangeDetectorRef) {
    super(translateService, dialog, cdr);
    this.id = 'quicksearchmultipleStatut';

    this.cancelButton =  {
      butonName:'Fermer',
      withIcon:true,
      tooltip:'tooltip ',
      iconClassName:IconClassEnum.cancel_circle

    }
    this.validateButton =  {
      butonName:'Enregistrer',
      withIcon:true,
      tooltip:'tooltip ',
      iconClassName:IconClassEnum.save

    }
  }

  public override ngOnInit(): void {
    super.ngOnInit();
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

    // Config
    this.config = {
      globalParam: {
        right: {
          groupActionButton: false, // action button at the top of header
          expandableRows: false, // is the table having expandable rows
          filter: false, // because no exist filter
          columnAction: false, // right to have action column
          selectOne: true, //- right to select one row
          selectAll: true, //-- right to select all the row of the display page
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
        refresh: this.refreshEvent
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
