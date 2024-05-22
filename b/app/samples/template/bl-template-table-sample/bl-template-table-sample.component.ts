import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import {
  BlAction,
  BlComponentConfig,
  BlDataTableFilters,
  BlTableComponent,
  BlTableConfig,
  BlTableSource,
  IconClassEnum,
} from '@esedit-md/shared-ui';
import { FormControl, FormGroup } from '@angular/forms';
import {
  ACTION_CONTROL,
  ACTION_DEACTIVATE,
  ACTION_DELETE,
  ACTION_NOTIFY,
  getButtonInstance,
} from '../../components/tables-samples/bl-datatable-sample/bl-factory-action-button';
import { ToasterService } from '@bl/shared';
import { TranslateService } from '@ngx-translate/core';
import { StaticBddService } from '../../../services/static-bdd.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LayoutService } from '@bl/bl-app-layout';
import { MatTableDataSource } from '@angular/material/table';
import { BlSampleDialogVrComponent } from '../../components/tables-samples/bl-example-table-sample/bl-sample-dialog-vr/bl-sample-dialog-vr.component';
import {
  ACTION_COPY,
  ACTION_MODIFY,
  ACTION_TREE,
} from '../../components/bl-text-field-sample/ButtonsEvent';

@Component({
  templateUrl: 'bl-template-table-sample.component.html',
})
export class BlTemplateTableSampleComponent {
  public customComparing = false;
  public showSearchField = true;

  public pageIcon: IconClassEnum = IconClassEnum.cancel_circle;
  public pageTitle = 'Titre de la page';
  private datasource: MatTableDataSource<any>;
  @ViewChild('verticalTable', { static: false })
  verticalTable: BlTableComponent;

  public formGroup: FormGroup<{
    id: FormControl<string | number | null>;
    nom: FormControl<number | string | null>;
  }>;
  public compareObject: ((a: any, b: any) => boolean) | undefined | null;
  filterComponentsConfig: BlComponentConfig[] = [];
  public config: BlTableConfig;
  importButton: BlAction;
  private eventVR = new EventEmitter<any>();

  private refreshEvent = new EventEmitter<BlDataTableFilters>();
  private rowClickEvent = new EventEmitter<any>();
  public defaultFilterValue: any;

  private addEvent = new EventEmitter();
  private actionDeleteColumn = getButtonInstance(ACTION_DELETE);
  private actionCopyColumn = getButtonInstance(ACTION_COPY);

  public openAction: BlAction[] = [
    {
      idAction: 'rightPanelButton',
      idSelector: 'btn_grp_rightPanelButton',
      label: 'export',
      icon: {
        icon: IconClassEnum.delete,
        tooltip: 'export',
      },
      buttonType: 'mat-icon-button',
      buttonFix: true,
      badgeLabel: 'i',
      badgeColor: 'accent',
    },
    {
      idAction: 'rightPanelButton',
      idSelector: 'btn_grp_rightPanelButton',
      label: 'export',
      icon: {
        icon: IconClassEnum.export,
        tooltip: 'export',
      },
      buttonType: 'mat-icon-button',
      buttonFix: true,
      badgeLabel: 'i',
      badgeColor: 'accent',
    },
  ];
  constructor(
    private toasterService: ToasterService,
    private translateService: TranslateService,
    private staticBddService: StaticBddService,
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    public layoutService: LayoutService
  ) {
    this.formGroup = new FormGroup({
      nom: new FormControl<string | number | null>(null),
      id: new FormControl<string | number | null>(null),
    });
    this.filterComponentsConfig.push({
      fieldName: 'id',
      label: this.translateService.instant('sample.datatable.header.matricule'),
    });
    this.filterComponentsConfig.push({
      fieldName: 'nom',
      label: this.translateService.instant('sample.datatable.header.lastname'),
    });

    this.datasource = new MatTableDataSource<any>();

    // EventEmitter
    this.configureRefreshEvent();

    // Config of the first example table with vertical filters
    this.initConfigFirstTable();
    this.initData(this.config, this.datasource);
  }

  private getColumnAction() {
    this.actionCopyColumn.eventEmitter = new EventEmitter();
    this.actionCopyColumn.eventEmitter.subscribe(() =>
      this.toasterService.success('Événement en cours')
    );
    this.actionDeleteColumn.eventEmitter = new EventEmitter();
    this.actionDeleteColumn.eventEmitter.subscribe(() => {
      this.toasterService.success('Événement en cours');
    });
    return [this.actionCopyColumn, this.actionDeleteColumn];
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
          hidePaginator: false, //-- right to activate/deactivate paginator
        },
      },
      columnAction: {
        width: '15%',
        list: this.getColumnAction(),
      },
      data: {
        column: [
          {
            name: 'id',
            value: this.translateService.instant(
              'sample.datatable.header.matricule'
            ),
            align: 'left',
            width: '10%',
          },
          {
            name: 'nom',
            labelSelected: this.translateService.instant(
              'sample.datatable.header.selected'
            ),
            value: this.translateService.instant(
              'sample.datatable.header.lastname'
            ),
            align: 'left',
            width: '30%',
          },
          {
            name: 'prenom',
            value: this.translateService.instant(
              'sample.datatable.header.firstname'
            ),
            align: 'left',
            width: '20%',
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
              icon: {
                icon: IconClassEnum.file_lock,
                tooltip: 'sample.datatable.header.vr',
              },
            },
          },
          {
            name: 'adresse.city',
            value: this.translateService.instant(
              'sample.datatable.header.city'
            ),
            align: 'left',
            width: '10%',
          },
        ],
        dataCount: 150,
        datasource: this.datasource,
        pageSizeOption: [25, 50, 100, 200],
        defaultSort: { active: 'id', direction: 'asc' },
      },
      event: {
        refresh: this.refreshEvent,
        clickRow: this.rowClickEvent,
        add: this.addEvent,
      },
    };
  }

  /**
   * configuration of the second table with filters on top
   */

  configureRefreshEvent() {
    this.addEvent.subscribe(() =>
      this.toasterService.success('sample.datatable.event.add')
    );
    this.rowClickEvent.subscribe((x) => {
      this.toasterService.success('sample.datatable.event.row-click');
    });
    this.eventVR.subscribe((val) => this.displayVR(val));

    this.refreshEvent.subscribe((value: BlDataTableFilters) => {
      this.updateList(value, this.datasource, this.config, this.verticalTable);
    });
  }

  private openFilter() {
    this.layoutService.openContentRightPanel();
  }

  private initData(
    config: BlTableConfig,
    datasource: MatTableDataSource<BlTableSource>
  ): void {
    const pageSize = this.config?.globalParam?.right?.hidePaginator
      ? this.config?.data?.dataCount
      : 50;
    const dataTableFilters: BlDataTableFilters = {
      filters: null,
      paginatorValues: {
        length: this.datasource.data.length,
        pageIndex: 0,
        pageSize:
          this.config?.data?.pageSizeOption?.length &&
          this.config?.data?.pageSizeOption?.length > 0 &&
          !this.config?.globalParam?.right?.hidePaginator
            ? this.config?.data?.pageSizeOption[0]
            : pageSize,
        previousPageIndex: 0,
      },
      sortValues: null,
      search: null,
    };
  }

  private updateList(
    dataTableFilters: BlDataTableFilters,
    datasource: MatTableDataSource<BlTableSource>,
    config: BlTableConfig,
    table?: BlTableComponent
  ): void {
    if (!dataTableFilters.paginatorValues && config?.data?.pageSizeOption) {
      dataTableFilters.paginatorValues = {
        length: 0,
        pageIndex: 0,
        previousPageIndex: 0,
        pageSize: config?.data?.pageSizeOption[0],
      };
    }
    const result = this.staticBddService.getListUser(dataTableFilters);
    datasource.data = result.data;
    config.data.dataCount = result.dataCount;
    // Add an attribute to each archived row to make table rows expandable
    datasource.data = datasource.data.map((row: BlTableSource) => ({
      ...row,
      isExpanded: false,
    }));

    this.changeDetectorRef.markForCheck();
  }

  private displayVR(value: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '60%';
    dialogConfig.data = { val: value };
    this.dialog.open(BlSampleDialogVrComponent, dialogConfig);
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

  setOrRemoveDefaultFilter() {
    if (this.defaultFilterValue) {
      this.defaultFilterValue = undefined;
    } else {
      this.defaultFilterValue = { id: '1' };
    }
  }
}
