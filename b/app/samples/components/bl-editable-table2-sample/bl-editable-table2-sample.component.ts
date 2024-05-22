import {Component, EventEmitter, HostBinding, Input, ViewChild} from '@angular/core';
import {ToasterService} from '@bl/shared';
import {SampleAbstractComponent} from "../../SampleAbstractComponent";
import {
  BlBasicObject, BlConfirmMessage, BlDialogService, BlSnackbarService,
  EditableTable2Component,
  EditableTableColumn2,
  RowStatus2, WaitDialogConfigModel
} from '@esedit-md/shared-ui';
import {FormControl, FormGroup, UntypedFormArray, UntypedFormGroup, Validators} from '@angular/forms';
import {DateAdapter} from "@angular/material/core";
import {DatePipe} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";
import {timer} from "rxjs";
import Stringifier from "postcss/lib/stringifier";

type BlEditableTable2Exemple = {
}

@Component({
  selector: 'bl-editable-table2-sample',
  templateUrl: './bl-editable-table2-sample.component.html',
  styleUrls: ['./bl-editable-table2-sample.component.scss'],
})
export class BlEditableTable2SampleComponent extends SampleAbstractComponent<BlEditableTable2Exemple>  {
  @HostBinding('style.flex-grow') flexGrow = '1';
  @HostBinding('style.min-height') minHeight = '0';
  @HostBinding('style.min-width') minWidth = '0';
  @HostBinding('style.display') display = 'flex';
  data: any;
  @ViewChild('editableTable2Component', {static: true})
  editableTable2Component: EditableTable2Component;
  @Input() testLabelValue ='liste_editable';
  cols2: EditableTableColumn2[] = [
    {
      field: 'id',
      header: 'Id',
      validators: [Validators.required, Validators.minLength(3)],
      visible: true,
      editable: false,
      cssClass: ''
    },
    {
      field: 'name',
      header: 'Libellé de la fonctionnalité',
      validators: [Validators.required],
      visible: true,
      editable: true,
      cssClass:  'col-2'
    },
    {
      field: 'date',
      header: 'Date ref.',
      validators: [Validators.required],
      visible: true,
      editable: true,
      cssClass: 'col-2'
    },
    {
      field: 'endDate',
      header: 'Date de fin.',
      validators: [],
      visible: true,
      editable: false,
      pipe: new DatePipe('fr', 'dd/mm/yyyy'),
      cssClass: 'col-2'
    },
    {
      field: 'licence',
      header: 'Soumise à Licence',
      validators: [Validators.required],
      visible: true,
      editable: true,
      cssClass: 'col-2'
    },
  ];
  options : BlBasicObject[]=[];
  tableFormArray: UntypedFormArray;
  customErrorsMap = new Map<string, string>;
  customErrorsMapDate = new Map<string,string>;
  formToAdd: UntypedFormGroup;
  constructor(private _dateAdaptor: DateAdapter<any>,
              private  snackBar:ToasterService,
              private blDialogService: BlDialogService,
              private translateService: TranslateService) {
    super();
    this._dateAdaptor.setLocale('fr');
    this.options.push({
      id: 1,
      code: 'option_oui',
      label: 'Oui',
    });
    this.options.push({
      id: 2,
      code: 'option_non',
      label: 'Non'
    });
    // EditableTable2 constructor
    this.initDataForNgModelTable2();
    this.formGroup = new FormGroup({});
    this.tableFormArray = new UntypedFormArray([]);
    this.formGroup.addControl("tableFormArray", this.tableFormArray);
    this.initFormForFormControlTable();
  }

  getRandomNumber(){
   return Math.random().toString(36).substring(2);
  }

  // EditableTable2 methods
  initDataForNgModelTable2() {
    this.data = [
      {id: 101, name: 'Lib. test fonct 1', date: '2018-12-18T08:56:00+00:00',endDate: '2018-12-18T08:56:00+00:00', licence: this.options[0]},
      {id: 102, name: 'Lib. test fonct 2', date: '2019-01-01T08:56:00+00:00',endDate: '2018-12-18T08:56:00+00:00', licence: this.options[0]},
      {id: 103, name: 'Lib. test fonct 3', date: '2014-01-02T08:56:00+00:00',endDate: '2018-12-18T08:56:00+00:00', licence: this.options[0]},
      {id: 104, name: 'Lib. test fonct 4', date: '2014-01-02T09:56:00+00:00',endDate: '2018-12-18T08:56:00+00:00', licence: this.options[1]}];
  }

  initFormForFormControlTable() {
    let rowNumber = 0;
    this.data?.forEach((row : any) => {
      const formGroup = new FormGroup({});
      for (const [key, value] of Object.entries(row)) {
        formGroup.addControl(key, new FormControl());
        formGroup?.get(key)?.setValue(value);
      }
      formGroup.addControl('rowStatus', new FormControl());
      formGroup.addControl('rowNumber', new FormControl(rowNumber++));
      formGroup?.get('rowStatus')?.reset();
      /* mapError for the first field */
      this.customErrorsMap.set('required', 'form.error.required');
      this.customErrorsMap.set('minlength', 'form.error.libelle.size.min.3');

      this.customErrorsMapDate.set('required', 'form.error.date.required');
      this.tableFormArray.push(formGroup);
    });
  }
  resetFormValues2() {
    this.tableFormArray.controls.forEach(control => {
      if (control?.get('rowStatus')?.value === RowStatus2.ADD) {
        this.tableFormArray.removeAt(this.tableFormArray.controls.indexOf(control));
      }
    });
    this.editableTable2Component.table.renderRows();
    let index = 0;
    this.data.forEach((row : any) => {
      for (const [key, value] of Object.entries(row)) {
        this.tableFormArray?.controls[index]?.get(key)?.patchValue(value, {emitEvent: false});
      }
      this.tableFormArray.controls[index].get('rowStatus')?.patchValue(null, {emitEvent: false});
      index++;
    });
  }


  public afterAddRow(formGroup:FormGroup){
    formGroup.addControl('rowNumber', new FormControl(this.tableFormArray.length));
  }
    afterNewRowDeleted() {
   this.snackBar.success("bl-editableTable.deletedLine");}

  saveAddedForm(){
    if(this.formToAdd?.dirty){

      const rollbackEvent  = new EventEmitter();
      rollbackEvent.subscribe((resp) =>
        this.snackBar.success('pages.basic.tableEditable2.dialog.rollback')
      );
      const resetEvent = new EventEmitter();
      resetEvent.subscribe((resp) => {
            this.formToAdd.reset();
            this.snackBar.warning('pages.basic.tableEditable2.dialog.unsave');
          }
      );
      const closeEvent = new EventEmitter();
      closeEvent.subscribe((resp) =>
        this.snackBar.success('closeEvent ')
      );
      this.blDialogService.openInfoDialog(
        {data: this.formToAdd},
        'pages.basic.tableEditable2.dialog.form-uncompleted',
          'pages.basic.tableEditable2.dialog.rollback',
          'pages.basic.tableEditable2.dialog.unsave',
          rollbackEvent,
        resetEvent,
        closeEvent,
        'save_list_confirm_dialog',
        false
      );
    }

  }

  onChangeAddForm(addForm: any) {
    this.formToAdd = addForm;
  }

  private formSaved():EventEmitter<any> {
    const saveEvent = new EventEmitter();
    saveEvent.subscribe((resp) => {
          let succesMsg = this.translateService.instant('viewer.form.saved');
          this.snackBar.success(succesMsg.concat(JSON.stringify(this.formToAdd?.value)));
          timer(5000).subscribe(() => this.blDialogService.closeDialog());
        }
    );
    return saveEvent;
  }
}
