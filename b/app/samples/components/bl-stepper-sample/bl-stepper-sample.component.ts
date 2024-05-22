import {ChangeDetectorRef, Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  BlAction,
  BlBasicObject, BlComponentConfig, BlDataTableFilters,
  BlDialogService,
  BlTableComponent, BlTableConfig, BlTableSource,
  FormErrorDisplayComponent,
  IconClassEnum
} from '@esedit-md/shared-ui';
import moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { ToasterService } from '@bl/shared';
import { BlStepperComponent } from '../../../../../../../libs/shared-ui/src/lib/components/style/bl-stepper/bl-stepper.component';
import {StaticBddService} from "../../../services/static-bdd.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {LayoutService} from "@bl/bl-app-layout";
import {MatTableDataSource} from "@angular/material/table";
import {ACTION_DELETE, getButtonInstance} from "../../components/tables-samples/bl-datatable-sample/bl-factory-action-button";
import {ACTION_COPY} from "../bl-text-field-sample/ButtonsEvent";
import {
  BlSampleDialogVrComponent
} from "../../components/tables-samples/bl-example-table-sample/bl-sample-dialog-vr/bl-sample-dialog-vr.component";

type form_stepOne = {
  label1: string | null,
  listBox1: BlBasicObject | null,
  date1: moment.Moment | null,
  date2: moment.Moment | null,
}
export type SampleFormGroup<T> = FormGroup<{
  [K in keyof T]: FormControl<T[K]>;
}>;

@Component({
  selector: 'bl-stepper-sample',
  templateUrl: './bl-stepper-sample.component.html',
  styleUrls: ['./bl-stepper-sample.component.scss'],
})
export class BlStepperSampleComponent implements OnInit{
  @ViewChild('blStepper') blstepper: BlStepperComponent;

  iconBack : IconClassEnum = IconClassEnum.less;
  iconNext : IconClassEnum = IconClassEnum.greater;

  public listData: BlBasicObject[] = [];
  public formGroup1 : SampleFormGroup<form_stepOne>;
  private formGroups : FormGroup[] = [];
  public stepperActions : BlAction[] = [];

  public _nextBtn : string;
  public _previousBtn : string;
  public _resetBtn : string;
  public stepLabels : string[] = [];
  public customComparing = false;
  public showSearchField = true;
  private datasource: MatTableDataSource<any>;

  @ViewChild(FormErrorDisplayComponent, {static: true}) formErrorDisplay: FormErrorDisplayComponent;


  constructor(
    private toasterService: ToasterService,
    private translateService: TranslateService,
    private staticBddService: StaticBddService,
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    public layoutService: LayoutService,
    private translate: TranslateService,
    private ts: ToasterService
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

    // init Custom buttons
    let save_label = this.translate.instant('sample.button.save');
    let emitEventSave = new EventEmitter<any>();

    let button_save: BlAction = {
      idAction: '',
      eventEmitter: emitEventSave,
      label: save_label,
      idSelector: 'btn_save',
      primary: false,
      buttonType: 'mat-stroked-button',
      componentType: 'bl-button',
      testLabelValue: 'save'
    };

    emitEventSave.subscribe((event) => {
      this.onSubmitForm(event);
    });
    this.stepperActions.push(button_save);
  }

  ngOnInit(): void {
     // init labet boutons
     this._nextBtn = this.translate.instant('sample.button.next');
     this._previousBtn = this.translate.instant('sample.button.previous');
     this._resetBtn = this.translate.instant('sample.button.reset');

    this.initListData();
    this.initForms();
    this.formGroups.push(this.formGroup1);

     let labelStep1 = this.translate.instant('sample.stepper.label_step1');
     let labelStep2 = this.translate.instant('sample.stepper.label_step2');
     let labelStep3 = this.translate.instant('sample.stepper.label_step3');

    this.stepLabels = [labelStep1,labelStep2,labelStep3];
  }

  initForms() {
   this.formGroup1 = new FormGroup({
      label1: new FormControl<string | null>({value: 'Nancy', disabled: false}, Validators.required),
      listBox1: new FormControl<BlBasicObject | null>(this.listData[3]),
      date1: new FormControl<moment.Moment>(moment(new Date())),
      date2: new FormControl<moment.Moment>(moment(new Date())),
    });
  }

  initListData() {
    for (let i = 0; i < 20; i++) {
      this.listData.push({id: i, code: 'v_' + i, label: 'Valeur ' + i});
    }
    this.listData.push({
        id: 45,
        code: 'LONG',
        label: 'Une valeur avec un nom très très très longgggggggggggggggg !'
    });
  }

  nextStep(stepForm : FormGroup|undefined){
    if(stepForm && stepForm.invalid){

      this.ts.error(this.translate.instant('viewer.form.error'));
    }else{
      this.blstepper.nextStep();
    }
  }

  prevStep(){
    // do something
    this.blstepper.previouseStep();
  }

  resetStepper(){

    this.ts.warning(this.translate.instant('viewer.form.terminate'));

  }

  onSubmitForm(event){
    if (this.formGroup1.invalid) {
      this.ts.error(this.translate.instant('viewer.form.error'));
      // accessibility
      setTimeout(() => {
        this.formErrorDisplay.focus();
      }, 500);
    }
    if (this.formGroup1.valid) {
      this.ts.success(this.translate.instant('viewer.form.valid'));

    }
  }

  onNextStep1(event){

  }
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
