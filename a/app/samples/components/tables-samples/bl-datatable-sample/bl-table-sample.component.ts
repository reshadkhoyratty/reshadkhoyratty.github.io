import { DatePipe } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToasterService } from '@bl/shared';
import {
  BlAction,
  BlBasicObject,
  BlCheckPipe,
  BlDataTableFilters,
  BlTableComponent,
  BlTableConfig,
  BlTableGlobalParam,
  BlTableSource,
} from '@esedit-md/shared-ui';
import { TranslateService } from '@ngx-translate/core';
import { BlDialogViewConfigComponent } from './bl-dialog-view-config/bl-dialog-view-config.component';
import {
  ACTION_CONTROL,
  ACTION_DEACTIVATE,
  ACTION_DELETE,
  ACTION_EXPORT,
  ACTION_NOTIFY,
  getButtonInstance,
} from './bl-factory-action-button';
import {SampleAbstractComponent} from "../../../SampleAbstractComponent";
import {StaticBddService} from "../../../../services/static-bdd.service";

type BlFilterTableFormGroup = {
  right: BlBasicObject[] | null;
  columnAction: BlBasicObject[] | null;
  groupActionButton: BlBasicObject[] | null;
  listAction: BlBasicObject[] | null;
  nbfilter: BlBasicObject | null;
  displaySearchButton: BlBasicObject | null;
  simulateLongResponse: BlBasicObject | null;
  empty: BlBasicObject | null;
};

@Component({
  selector: 'bl-datatable-sample',
  templateUrl: 'bl-table-sample.component.html',
  styleUrls: ['bl-table-sample.component.scss'],
})
export class BlTableSampleComponent
  extends SampleAbstractComponent<BlFilterTableFormGroup>
  implements OnInit
{
  @ViewChild(BlTableComponent) table: BlTableComponent;
  public config: BlTableConfig;
  public isLoading = false;
  public lstRight: BlBasicObject[] = [];
  public lstAction: BlBasicObject[] = [];
  public nbFiltersPerLine = 3;
  private datasource: MatTableDataSource<BlTableSource>;
  private width_action = 10;
  private width_check = 4;
  private width_date = 10;
  private eventNotify = new EventEmitter();
  private eventDeactivate = new EventEmitter();
  private eventExport = new EventEmitter();
  private eventDelete = new EventEmitter();
  private eventControl = new EventEmitter();
  private refreshEvent = new EventEmitter<BlDataTableFilters>();
  private searchEvent = new EventEmitter<BlDataTableFilters>();
  private addEvent = new EventEmitter();
  titleClass ='titleClass';

  constructor(
    private translateService: TranslateService,
    private staticBddService: StaticBddService,
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog,
    public toasterService: ToasterService
  ) {
    super();
    this.formGroup = new FormGroup({
      right: new FormControl<BlBasicObject[] | null>(null),
      columnAction: new FormControl<BlBasicObject[] | null>(null),
      groupActionButton: new FormControl<BlBasicObject[] | null>(null),
      listAction: new FormControl<BlBasicObject[] | null>(null),
      nbfilter: new FormControl<BlBasicObject | null>({ id: 4, label: '4' }),
      displaySearchButton: new FormControl<BlBasicObject | null>({
        id: 1,
        label: 'Oui',
      }),
      simulateLongResponse: new FormControl<BlBasicObject | null>({
        id: 2,
        label: 'Non',
      }),
      empty: new FormControl<BlBasicObject | null>({ id: 2, label: 'Non' }),
    });
    this.initData();
    // EventEmitter
    this.refreshEvent.subscribe((value: BlDataTableFilters) =>
      this.updateList(value)
    );
    this.addEvent.subscribe(() =>
      this.toasterService.success('sample.datatable.event.add')
    );
    // Action
    this.eventNotify.subscribe(() =>
      this.toasterService.success('sample.datatable.event.notify')
    );
    this.eventDeactivate.subscribe(() =>
      this.toasterService.success('sample.datatable.event.deactivate')
    );
    this.eventExport.subscribe(() =>
      this.toasterService.success('sample.datatable.event.excel')
    );
    this.eventDelete.subscribe((value) => {
      this.staticBddService.deleteUser(value.id).subscribe((res) => {
        this.table.refreshData();
        this.table.removeFromSelection(value);
        this.toasterService.success('sample.datatable.event.delete.ok');
      });
    });
    this.eventControl.subscribe(() =>
      this.toasterService.success('sample.datatable.event.control')
    );
    this.searchEvent.subscribe(() => this.refreshAllTable());
  }

  public ngOnInit(): void {
    this.initFilters();
    //Removes last id from this.lstRight so it is not selected by default
    this.formGroup.controls.right.patchValue(
      this.lstRight.filter((item) => item.id != 11)
    );
    this.formGroup.controls.listAction.patchValue(this.lstAction);
    this.formGroup.controls.groupActionButton.patchValue([
      {
        id: 4,
        label: this.translateService.instant('sample.datatable.action.control'),
      },
      {
        id: 2,
        label: this.translateService.instant('sample.datatable.action.excel'),
      },
    ]);
    this.formGroup.controls.columnAction.patchValue([
      {
        id: 3,
        label: this.translateService.instant('sample.datatable.action.delete'),
      },
      {
        id: 5,
        label: this.translateService.instant('sample.datatable.action.notify'),
      },
    ]);

    this.refreshList();
  }

  public updateList(dataTableFilters: BlDataTableFilters): void {
    if (this.formGroup.controls.empty.value?.id === 1) {
      this.datasource.data = [];
      this.config.data.dataCount = 0;
    } else if (this.formGroup.controls.simulateLongResponse.value?.id === 1) {
      this.isLoading = true;
      setTimeout(() => {
        const result = this.staticBddService.getListUser(dataTableFilters);
        this.datasource.data = result.data;
        this.config.data.dataCount = result.dataCount;
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      }, 1000);
    } else {
      const result = this.staticBddService.getListUser(dataTableFilters);
      this.datasource.data = result.data;
      this.config.data.dataCount = result.dataCount;
    }
  }

  public refreshAllTable(): void {
    this.refreshList();
    this.resetData();
  }

  public refreshList(): void {
    this.initConfig();
    const globalParam: BlTableGlobalParam = { right: { filter: true } };
    if (
      globalParam.right &&
      this.formGroup.controls.right.value &&
      this.formGroup.controls.right.value.length > 0
    ) {
      globalParam.right.hidePaginator = false;
      globalParam.right.hideRefresh = true;

      this.formGroup.controls.right.value.forEach((act) => {
        if (globalParam.right) {
          switch (act.id) {
            case 1:
              globalParam.right.add = true;
              break;
            case 2:
              globalParam.right.groupActionList = true;
              break;
            case 3:
              globalParam.right.groupActionButton = true;
              break;
            case 4:
              globalParam.right.columnAction = true;
              break;
            case 5:
              globalParam.right.selectAll = true;
              break;
            case 6:
              globalParam.right.selectOne = true;
              break;
            case 7:
              globalParam.right.search = true;
              break;
            case 8:
              globalParam.right.filter = true;
              break;
            case 9:
              globalParam.right.hidePaginator = false;
              break;
            case 10:
              globalParam.right.hideRefresh = false;
              break;
            case 11:
              globalParam.right.choseRowEffect = true;
              break;
          }
        }
      });
      //La selection unique et les cases à cocher ne peuvent pas fonctionner en même temps
      if (this.formGroup.controls.right.value.find((value) => value.id == 11)) {
        this.formGroup.controls.right.patchValue(
          this.formGroup.controls.right.value.filter((value) => value.id != 6)
        );
        globalParam.right.selectOne = false;
      }
      if (this.formGroup.controls.right.value.find((value) => value.id == 6)) {
        this.formGroup.controls.right.patchValue(
          this.formGroup.controls.right.value.filter((value) => value.id != 11)
        );
        globalParam.right.choseRowEffect = false;
      }
    }

    this.width_date = 10;
    if (!globalParam.right?.selectOne) {
      this.width_date += this.width_check;
    }

    this.config.globalParam = globalParam;

    this.config.groupedActionButton = [];
    this.config.groupedActionList = [];
    this.config.columnAction = { list: [], width: this.width_action + '%' };

    //----- ACTIONS BUTTON
    if (globalParam.right?.groupActionButton) {
      this.addAction(
        this.config.groupedActionButton,
        this.formGroup.controls.groupActionButton,
        'button',
        false
      );
    }
    if (this.config.columnAction && globalParam.right?.columnAction) {
      let typeAction = 'menu';
      if (
        this.formGroup.controls.columnAction?.value !== null &&
        this.formGroup.controls.columnAction.value.length <= 3
      ) {
        typeAction = 'icon';
      }
      this.addAction(
        this.config.columnAction.list,
        this.formGroup.controls.columnAction,
        typeAction === 'icon' ? 'icon' : 'menu',
        true
      );
    }
    if (globalParam.right?.groupActionList) {
      this.addAction(
        this.config.groupedActionList,
        this.formGroup.controls.listAction,
        'menu',
        false
      );
    }
    if (
      this.config.columnAction.list &&
      this.config.columnAction.list.length > 3
    ) {
      this.config.columnAction.display = 'menu';
    }

    if (
      !globalParam.right?.columnAction ||
      this.config.columnAction.list.length === 0
    ) {
      this.width_date += this.width_action;
    }
    this.initConfigColumn();
  }

  private initConfig() {
    this.config = {
      globalParam: {},
      data: { column: [], dataCount: 0 },
      event: {
        refresh: this.refreshEvent,
        add: this.addEvent,
      },
    };
  }

  public showConfig(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '70%';
    const columnActionList = this.config?.columnAction?.list.map((element) => {
      return Object.assign({}, element, {
        ...element,
        eventEmitter: undefined,
      });
    });
    const groupedActionButton = this.config?.groupedActionButton?.map(
      (element) => {
        return Object.assign({}, element, {
          ...element,
          eventEmitter: undefined,
        });
      }
    );
    const groupedActionList = this.config?.groupedActionList?.map((element) => {
      return Object.assign({}, element, {
        ...element,
        eventEmitter: undefined,
      });
    });
    dialogConfig.data = Object.assign({}, this.config, {
      data: {
        ...this.config.data,
        datasource: undefined,
      },
      event: undefined,
      groupedActionButton: groupedActionButton,
      groupedActionList: groupedActionList,
      columnAction: {
        width: this.config.columnAction?.width,
        display: this.config.columnAction?.display,
        list: columnActionList,
      },
    });
    dialogConfig.panelClass = 'dialogJson';
    const dialogRef = this.dialog.open(
      BlDialogViewConfigComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe();
  }

  public getNbFiltersPerLine(): number {
    return this.formGroup.controls.nbfilter.value
      ? Number(this.formGroup.controls.nbfilter.value.id)
      : 4;
  }

  public initData(): void {
    this.initDatatable();

    this.lstAction.push({
      id: 1,
      label: this.translateService.instant(
        'sample.datatable.action.deactivate'
      ),
    });
    this.lstAction.push({
      id: 2,
      label: this.translateService.instant('sample.datatable.action.excel'),
    });
    this.lstAction.push({
      id: 3,
      label: this.translateService.instant('sample.datatable.action.delete'),
    });
    this.lstAction.push({
      id: 4,
      label: this.translateService.instant('sample.datatable.action.control'),
    });
    this.lstAction.push({
      id: 5,
      label: this.translateService.instant('sample.datatable.action.notify'),
    });

    this.lstRight.push({
      id: 1,
      label: this.translateService.instant('sample.datatable.right.add'),
    });
    this.lstRight.push({
      id: 2,
      label: this.translateService.instant(
        'sample.datatable.right.groupActionList'
      ),
    });
    this.lstRight.push({
      id: 3,
      label: this.translateService.instant(
        'sample.datatable.right.groupActionButton'
      ),
    });
    this.lstRight.push({
      id: 4,
      label: this.translateService.instant(
        'sample.datatable.right.colonAction'
      ),
    });
    this.lstRight.push({
      id: 5,
      label: this.translateService.instant('sample.datatable.right.selectAll'),
    });
    this.lstRight.push({
      id: 6,
      label: this.translateService.instant('sample.datatable.right.selectOne'),
    });
    this.lstRight.push({
      id: 7,
      label: this.translateService.instant('sample.datatable.right.search'),
    });
    this.lstRight.push({
      id: 8,
      label: this.translateService.instant('sample.datatable.right.filter'),
    });
    this.lstRight.push({
      id: 9,
      label: this.translateService.instant('sample.datatable.right.paginator'),
    });
    this.lstRight.push({
      id: 10,
      label: this.translateService.instant('sample.datatable.right.refresh'),
    });
    this.lstRight.push({
      id: 11,
      label: this.translateService.instant('sample.datatable.right.chosenRow'),
    });
  }

  public resetData(): void {
    this.initDatatable();
    this.config.data.datasource = this.datasource;
    this.config.data.dataCount =
      this.datasource.data.length > 0 ? this.datasource.data.length : 0;
  }

  private initDatatable(): void {
    this.datasource = new MatTableDataSource<any>();
    if (this.formGroup.controls.empty.value?.id === 1) {
      this.datasource.data = [];
    } else if (this.formGroup.controls.simulateLongResponse.value?.id === 1) {
      this.isLoading = true;
      setTimeout(() => {
        this.datasource.data = this.staticBddService.initListUser();
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      }, 1000);
    } else {
      this.datasource.data = this.staticBddService.initListUser();
    }
  }

  private initFilters(): void {
    document.documentElement.style.setProperty(
      '--nb-Filter-Per-Line',
      this.nbFiltersPerLine + ''
    );
  }

  private addAction(
    lst: BlAction[],
    formcontrol: FormControl<BlBasicObject[] | null>,
    typeAction: 'icon' | 'menu' | 'button',
    isColumnAction: boolean
  ): void {
    if (formcontrol.value && formcontrol.value.length > 0) {
      formcontrol.value.forEach((act) => {
        let actionBtn: BlAction = getButtonInstance(ACTION_DEACTIVATE);
        switch (act.id) {
          case 1: // deactviate
            actionBtn = getButtonInstance(ACTION_DEACTIVATE);
            actionBtn.eventEmitter = this.eventDeactivate;
            break;
          case 2: // excel
            actionBtn = getButtonInstance(ACTION_EXPORT);
            actionBtn.eventEmitter = this.eventExport;
            break;
          case 3: // delete
            actionBtn = getButtonInstance(ACTION_DELETE);
            if (actionBtn.confirmMessage) {
              actionBtn.confirmMessage.title = isColumnAction
                ? 'sample.datatable.action.delete.confirm.unique'
                : 'sample.datatable.action.delete.confirm.multi';
            }
            actionBtn.eventEmitter = this.eventDelete;
            break;
          case 4: // control
            actionBtn = getButtonInstance(ACTION_CONTROL);
            actionBtn.eventEmitter = this.eventControl;
            break;
          case 5: // notify
            actionBtn = getButtonInstance(ACTION_NOTIFY);
            actionBtn.eventEmitter = this.eventNotify;
            break;
        }
        if (typeAction === 'menu') {
          actionBtn.icon = undefined;
        } else if (
          typeAction === 'button' &&
          (actionBtn.idAction === 'control' ||
            actionBtn.idAction === 'notify' ||
            actionBtn.idAction === 'deactivate')
        ) {
          actionBtn.icon = undefined;
          if (actionBtn.idAction === 'control') {
            actionBtn.label = 'sample.datatable.action.control_all';
          }
        }

        lst.push(actionBtn);
      });
    }
  }

  private initConfigColumn(): void {
    this.config.data = {
      column: [
        {
          name: 'id',
          value: this.translateService.instant(
            'sample.datatable.header.matricule'
          ),
          align: 'left',
          width: '8%',
        },
        {
          name: 'nom',
          value: this.translateService.instant(
            'sample.datatable.header.lastname'
          ),
          align: 'left',
          width: '15%',
        },
        {
          name: 'prenom',
          value: this.translateService.instant(
            'sample.datatable.header.firstname'
          ),
          align: 'left',
          width: '13%',
        },
        {
          name: 'service',
          value: this.translateService.instant(
            'sample.datatable.header.department'
          ),
          align: 'left',
          width: '15%',
        },
        {
          name: 'email',
          value: this.translateService.instant('sample.datatable.header.mail'),
          align: 'left',
          width: '15%',
        },
        {
          name: 'etat',
          value: this.translateService.instant(
            'sample.datatable.header.status'
          ),
          align: 'center',
          pipe: new BlCheckPipe(),
          width: '10%',
        },
        {
          name: 'date',
          value: this.translateService.instant('sample.datatable.header.date'),
          align: 'left',
          width: this.width_date + '%',
          pipe: new DatePipe('fr', 'dd/mm/yyyy'),
        },
      ],
      datasource: this.datasource,
      dataCount: 150,
      defaultSort: { active: 'id', direction: 'asc' },
    };
  }
}
