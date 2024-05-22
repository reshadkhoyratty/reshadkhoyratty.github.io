import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  BlAction,
  BlConfirmMessage,
  BlDialogService,
  BlSnackbarService,
  EditableTable2Component,
  EditableTableColumn2,
  IconClassEnum,
  RowStatus2,
} from '@esedit-md/shared-ui';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import {
  FormControl,
  FormGroup,
  UntypedFormArray,
  Validators,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { SampleAbstractComponent } from '../../SampleAbstractComponent';

type BlEditableTable2Exemple = {};
@Component({
  selector: 'bl-editable-list-teamplate-sample',
  templateUrl: 'bl-editable-list-template-sample.component.html',
  styleUrls: ['bl-editable-list-temmplate-sample.component.scss'],
})
export class BlEditableListTemplateSampleComponent
  extends SampleAbstractComponent<BlEditableTable2Exemple>
  implements OnInit
{
  public pageIcon: IconClassEnum = IconClassEnum.layout;
  public pageTitle: string;
  data: any;
  buttonHeader1: BlAction = {
    idAction: 'exampleId',
    eventEmitter: new EventEmitter<any>(),
    hidden: false,
    disabled: false,
    label: 'event ',
    idSelector: 'exampleSelector',
    icon: {
      icon: 'ph ph-printer',
      tooltip: 'Action',
    },
  };
  buttonHeader2: BlAction = {
    idAction: 'exampleId',
    eventEmitter: new EventEmitter<any>(),
    hidden: false,
    disabled: false,
    label: 'event ',
    idSelector: 'exampleSelector',
    icon: {
      icon: 'ph ph-dots-three-vertical',
      tooltip: 'Action',
    },
  };
  buttonHeader3: BlAction = {
    idAction: 'exampleId',
    eventEmitter: new EventEmitter<any>(),
    hidden: false,
    disabled: false,
    label: 'Export',
    idSelector: 'exampleSelector',
    icon: {
      icon: 'ph ph-export',
      tooltip: 'Action',
    },
  };
  @ViewChild('editableTable2Component', { static: true })
  editableTable2Component: EditableTable2Component;
  @Input() testLabelValue = 'liste_editable';
  @Input() public accessibilityParam = false;
  cols2: EditableTableColumn2[] = [
    {
      field: 'id',
      header: 'Id',
      validators: [Validators.required, Validators.minLength(3)],
      visible: true,
      editable: true,
      cssClass: '',
    },
    {
      field: 'name',
      header: 'Libellé de la fonctionnalité',
      validators: [Validators.required],
      visible: true,
      editable: true,
      cssClass: 'col-2',
    },
    {
      field: 'date',
      header: 'Date ref.',
      validators: [Validators.required],
      visible: true,
      editable: true,
      cssClass: 'col-2',
    },

    {
      field: 'licence',
      header: 'Soumise à Licence',
      validators: [Validators.required],
      visible: true,
      editable: true,
      cssClass: 'col-2',
    },
  ];

  tableFormArray: UntypedFormArray;
  constructor(
    private toastr: ToastrService,
    private blDialogService: BlDialogService,
    private translate: TranslateService,
    private _dateAdaptor: DateAdapter<any>,
    private snackBar: BlSnackbarService
  ) {
    super();
    this._dateAdaptor.setLocale('fr');
    // EditableTable2 constructor
    this.initDataForNgModelTable2();
    this.formGroup = new FormGroup({});
    this.tableFormArray = new UntypedFormArray([]);
    this.formGroup.addControl('tableFormArray', this.tableFormArray);
    this.initFormForFormControlTable();
    this.addEvent1();
    this.addEvent2();
    this.addEvent3();
  }

  ngOnInit() {
    this.pageTitle = this.translate.instant(
      'pages.templates.editable-list.sampleTitle'
    );
  }
  event1Clicked() {
    this.snackBar.openSuccessSnackBar('événement ', this.accessibilityParam);
  }
  event2Clicked() {
    this.snackBar.openWarningSnackbar('événement  ', this.accessibilityParam);
  }
  event3Clicked() {
    this.snackBar.openErrorSnackbar('événement', this.accessibilityParam);
  }
  addEvent1() {
    this.buttonHeader1.eventEmitter?.subscribe(() => this.event1Clicked());
  }
  addEvent2() {
    this.buttonHeader2.eventEmitter?.subscribe(() => this.event2Clicked());
  }
  addEvent3() {
    this.buttonHeader3.eventEmitter?.subscribe(() => this.event3Clicked());
  }
  // EditableTable2 methods
  initDataForNgModelTable2() {
    this.data = [
      {
        id: 101,
        name: 'Lib. test fonct 1',
        date: '2018-12-18T08:56:00+00:00',
        endDate: '2018-12-18T08:56:00+00:00',
        licence: true,
      },
      {
        id: 102,
        name: 'Lib. test fonct 2',
        date: '2019-01-01T08:56:00+00:00',
        endDate: '2018-12-18T08:56:00+00:00',
        licence: true,
      },
      {
        id: 103,
        name: 'Lib. test fonct 3',
        date: '2014-01-02T08:56:00+00:00',
        endDate: '2018-12-18T08:56:00+00:00',
        licence: true,
      },
      {
        id: 104,
        name: 'Lib. test fonct 4',
        date: '2014-01-02T09:56:00+00:00',
        endDate: '2018-12-18T08:56:00+00:00',
        licence: false,
      },
    ];
  }

  initFormForFormControlTable() {
    let rowNumber = 0;
    this.data?.forEach((row: any) => {
      const formGroup = new FormGroup({});
      for (const [key, value] of Object.entries(row)) {
        formGroup.addControl(key, new FormControl());
        formGroup?.get(key)?.setValue(value);
      }
      formGroup.addControl('rowStatus', new FormControl());
      formGroup.addControl('rowNumber', new FormControl(rowNumber++));
      formGroup?.get('rowStatus')?.reset();
      this.tableFormArray.push(formGroup);
    });
  }
  resetFormValues2() {
    this.tableFormArray.controls.forEach((control) => {
      if (control?.get('rowStatus')?.value === RowStatus2.ADD) {
        this.tableFormArray.removeAt(
          this.tableFormArray.controls.indexOf(control)
        );
      }
    });
    this.editableTable2Component.table.renderRows();
    let index = 0;
    this.data.forEach((row: any) => {
      for (const [key, value] of Object.entries(row)) {
        this.tableFormArray?.controls[index]
          ?.get(key)
          ?.patchValue(value, { emitEvent: false });
      }
      this.tableFormArray.controls[index]
        .get('rowStatus')
        ?.patchValue(null, { emitEvent: false });
      index++;
    });
  }

  public afterAddRow(formGroup: FormGroup) {
    formGroup.addControl(
      'rowNumber',
      new FormControl(this.tableFormArray.length)
    );
  }
  getTableRowCount(): number {
    return this.tableFormArray.length;
  }
  onSubmitForm() {
    const tableData = [];

    // Iterate through each form group in the tableFormArray
    this.tableFormArray.controls.forEach((control) => {
      if (control instanceof FormGroup) {
        const rowData = {};

        // Iterate through each form control within the form group
        Object.keys(control.controls).forEach((key) => {
          if (key !== 'rowStatus' && key !== 'rowNumber') {
            rowData[key] = control.get(key).value;
          }
        });

        tableData.push(rowData);
      }
    });
    this.toastr.success(this.translate.instant('viewer.form.valid'));
    const confirm: BlConfirmMessage = {
      title: 'viewer.form.dialog.text',
      closeButtonTxt: 'viewer.form.dialog.close',
      yesButtonTxt: 'viewer.form.dialog.ok',
      iconType: 'success',
      text: JSON.stringify(tableData, null, 2), // The second argument formats the JSON string with 2-space indentation
    };
    this.blDialogService.openConfirmDialog(confirm, null);
  }
  cancelAction() {
    this.snackBar.openWarningSnackbar(
      'Annulation en cours',
      this.accessibilityParam
    );
  }
}
