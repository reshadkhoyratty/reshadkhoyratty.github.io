import { Component, OnInit, ViewChild } from '@angular/core';
import { BlBasicObject, Option, OptionGroup } from '@esedit-md/shared-ui';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { SampleAbstractComponent } from '../../../SampleAbstractComponent';
import { F } from '@angular/cdk/keycodes';
type BlSelectFormGroup = {
  natureActes: any;
  classification: any;
  etat: BlBasicObject[] | null;
  listBox: BlBasicObject | null;
};
@Component({
  selector: 'bl-select-sample',
  templateUrl: './bl-select-sample.component.html',
  styleUrls: ['./bl-select-sample.component.scss'],
})
export class BlSelectSampleComponent
  extends SampleAbstractComponent<BlSelectFormGroup>
  implements OnInit
{
  values: BlBasicObject[] = [];

  naturesActesOptions: Option[] = [
    { label: 'Délibération', value: '1', isHidden: false },
    { label: 'Arrêtés réglementaires', value: '2', isHidden: false },
    { label: 'Arrêtés individuels', value: '3', isHidden: false },
    { label: 'Contrats et conventions', value: '4', isHidden: false },
    {
      label: 'Documents budgétaires et financiers',
      value: '5',
      isHidden: false,
    },
    { label: 'Autres', value: '6', isHidden: false },
  ];
  selectedOption: Option | undefined;
  actes: string[] = [
    'Délibration',
    'Arrêtés réglementaires',
    'Arrêtés individuels',
    'Contrats et conventions',
    'Documents budgétaires et financiers',
    'Autres',
  ];

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  //Liste déroulante avec regroupement et recherche intégrée

  classificationsOptionGroups: OptionGroup[] = [
    { label: 'Premier',
      isHidden: true, // for test purpose !
      options: [
        { label: 'Délibération', value: '1', isHidden: false },
        { label: 'Arrêtés réglementaires', value: '2', isHidden: false },
        { label: 'Arrêtés individuels', value: '3', isHidden: false },
        { label: 'Contrats et conventions', value: '4', isHidden: false },
        {
          label: 'Documents budgétaires et financiers',
          value: '5',
          isHidden: false,
        },
        { label: 'Autres', value: '6', isHidden: false },
      ],
     
    },
    {
      label: 'Second',
      isHidden: false,
      options: [
        { label: 'Délibération', value: '1', isHidden: true },// for test purpose !
        { label: 'Arrêtés réglementaires', value: '2', isHidden: false },
        { label: 'Arrêtés individuels', value: '3', isHidden: false },
        { label: 'Contrats et conventions', value: '4', isHidden: false },
        {
          label: 'Documents budgétaires et financiers',
          value: '5',
          isHidden: false,
        },
        { label: 'Autres', value: '6', isHidden: false },
      ],
    },
  ];
  constructor(private formBuilder: FormBuilder) {
    super();
    this.formBuilder = formBuilder;
    this.addValues();
  }
  protected readonly String = String;

  @ViewChild('selectState', { static: false }) stateSelect: MatSelect;
  allStatesSelected: boolean;
  allStatesSelectedText = 'Tous les états';
  states = ['A faire', 'Encours', 'A tester', 'Terminé'];
  toggleAllStatesSelection() {
    if (this.allStatesSelected) {
      this.stateSelect.options.forEach((item: MatOption) => item.select());
    } else {
      this.stateSelect.options.forEach((item: MatOption) => item.deselect());
    }
  }
  optionStateClick() {
    let newStatus = true;
    this.stateSelect.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allStatesSelected = newStatus;
  }
  addValues(): void {
    for (let i = 0; i < this.foods.length; i++) {
      const basicObject: BlBasicObject = {
        id: i.toString(),
        label: this.foods[i].value,
        code: this.foods[i].value,
      };
      this.values.push(basicObject);
    }
  }
  ngOnInit() {
    this.formGroup = new FormGroup<any>({
      listBox: new FormControl<BlBasicObject | null>(this.values[0]),
      natureActes: new FormControl<any>(null),
      classification: new FormControl<any>(null),
      etat: new FormControl<Option[] | null>(null),
      inputControl: new FormControl<any>(null),
    });
  }

  public isRequired(): boolean {
    return this.formGroup.controls.classification.hasValidator(
      Validators.required
    );
  }
}
interface Food {
  value: string;
  viewValue: string;
}
