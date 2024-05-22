import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import moment from 'moment';
import { BlAction, BlBasicObject, BlConfirmMessage, BlDialogService, FormErrorDisplayComponent, IconClassEnum } from '@esedit-md/shared-ui';
import { ToasterService } from '@bl/shared';
import { LayoutService } from '@bl/bl-app-layout';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';

type FormType1 = {
  label1: string | null,
  label2: string | null,
  date1: moment.Moment | null,
  listBox: BlBasicObject | null
};

type FormType2 = {
  label3: string | null,
  label4: string | null,
  label5: string | null,
  listBox2: BlBasicObject | null,
  date2: moment.Moment | null,
  checkbox1: boolean | null,
  checkbox2: boolean | null,
  radioBox : string | null;
};

type FormType3 = {
  label6: string | null,
  label7: string | null,
  label8: string | null,
  listBox2: BlBasicObject | null
};

type FormType4 = {
  listBox3: BlBasicObject | null,
  listBox4: BlBasicObject | null,
  label9: string | null,
  label10: string | null
};

export type SampleFormGroup<T> = FormGroup<{
  [K in keyof T]: FormControl<T[K]>;
}>;

@Component({
  selector: 'bl-complex-form-sample',
  templateUrl: './bl-complex-form-sample.component.html',
  styleUrls: ['./bl-complex-form-sample.component.scss'],
})
export class BlComplexFormSampleComponent implements OnInit, AfterViewInit {
  public formGroup1 : SampleFormGroup<FormType1>;
  public formGroup2 : SampleFormGroup<FormType2>;
  public formGroup3 : SampleFormGroup<FormType3>;
  public formGroup4 : SampleFormGroup<FormType4>;

  public listData: BlBasicObject[] = [];
  //pour gestion des erreurs
  public formLabels  = '';
  public deleteAction : BlAction[] = [];
  public pageIcon : IconClassEnum = IconClassEnum.layout;
  public titlesList : Array<string>;
  public pageTitle : string;

  public listRadioBox = [
    {value: 1, label: 'Option 1'},
    {value: 2, label: 'Option 2'},
  ];

  @ViewChild(FormErrorDisplayComponent, {static: true}) formErrorDisplay: FormErrorDisplayComponent;

  constructor(private toastr: ToastrService,
    private blDialogService: BlDialogService,
    private fb: FormBuilder,private ts: ToasterService,
    public layout: LayoutService, private translate :TranslateService,
    private location: Location){
  }

  public ngOnInit(): void {
    this.formLabels = 'sample.libelle.';
    this.pageTitle = this.translate.instant('menu.formExamples.complexForm');
    this.initListData();
    let title1 = this.translate.instant('viewer.form.title1');
    let title2 = this.translate.instant('viewer.form.title2');
    let title3 = this.translate.instant('viewer.form.title3');
    let title4 = this.translate.instant('viewer.form.title4');
    this.titlesList = [title1,title2,title3,title4];

    this.initForms();

  }
  initForms() {
    this.formGroup1 = this.fb.group({
      label1: ['Test 1',[Validators.required]],
      label2: ['Test 2',[Validators.required]],
      date1: [moment(new Date())],
      listBox: [this.listData[3]]
  });

  this.formGroup2 = this.fb.group({

    label3: ['Test 3',[Validators.required]],
    label4: ['Test 4',[Validators.required]],
    label5: ['Test 5',[Validators.required]],
    listBox2: [this.listData[3]],
    date2: [moment(new Date())],

    checkbox1: [true],
    checkbox2: [false],
    radioBox: ['1']
  });
  this.formGroup3 = this.fb.group({

    label6: ['Test 6',[Validators.required]],
    label7: ['Test 7',[Validators.required]],
    label8: ['Test 8',[Validators.required]],
    listBox2: [this.listData[3]]
  });

  this.formGroup4 = this.fb.group({

    listBox3: [this.listData[3]],
    listBox4: [this.listData[3]],
    label9: ['Test 9'],
    label10: ['Test 10'],
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

  ngAfterViewInit() {

  }

  public onChange($event){

  }

  public onSubmitForm(){
    if (this.formGroup1.invalid) {
      this.ts.error('Formulaire invalide !');
      // accessibility
      setTimeout(() => {
        this.formErrorDisplay.focus();
      }, 500);
    }
    if (this.formGroup1.valid && this.formGroup2.valid) {
      let msg = this.getformsValuesMsg();

        this.toastr.success(this.translate.instant('viewer.form.valid'));
        const confirm: BlConfirmMessage = {
            title: 'viewer.form.dialog.text',
            closeButtonTxt: 'viewer.form.dialog.close',
            yesButtonTxt: 'viewer.form.dialog.ok',
            iconType: 'success',
            text: msg.toString(),
        };

      this.blDialogService.openConfirmDialog(confirm, null);

    }

  }

  getformsValuesMsg() {
    let msg = [];
      msg.push("form1 : ");
      msg.push(JSON.stringify(this.formGroup1.value));
      msg.push("form2 : ");
      msg.push(JSON.stringify(this.formGroup2.value));
      msg.push("form3 : ");
      msg.push(JSON.stringify(this.formGroup3.value));
      msg.push("form4 : ");
      msg.push(JSON.stringify(this.formGroup4.value));
      return msg;
  }

  public cancelAction(){
   this.formGroup1.reset();

    this.ts.warning('Formulaire vidé !');
  }

  public getToPreviousPage(){
     // go back to the previouse page
     this.location.back();
  }
}
