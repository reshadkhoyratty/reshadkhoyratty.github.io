import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {StaticBddService} from '../../../services/static-bdd.service';
import {SampleAbstractComponent} from '../../SampleAbstractComponent';
import {BlBasicObject, Option, OptionGroup} from "@esedit-md/shared-ui";

type BlListFormGroup = {
    autocomplete: BlBasicObject | null,
    autocomplete2: BlBasicObject | null,
    autocomplete3: BlBasicObject | null,
    autocomplete4: BlBasicObject | null,
    multiCombo: BlBasicObject[] | null,
    multiCombo2: BlBasicObject[] | null,
    multiCombo3: BlBasicObject[] | null,
    listBox: BlBasicObject | null,
    listBox2: BlBasicObject | null,
    listBox3: BlBasicObject | null,
    search: Option | null,
    search2: Option | null,
    search3: Option | null,
    multiComboGroupSearch:OptionGroup[] | null ,
    multiComboGroupSearch2:OptionGroup[] | null,
    multiComboGroupSearch3:OptionGroup[] | null,
}

@Component({
    selector: 'bl-list-sample',
    templateUrl: './bl-list-sample.component.html'
})
export class BlListSampleComponent extends SampleAbstractComponent<BlListFormGroup> implements OnInit {

    public lst: BlBasicObject[] = [];
    public autocompleteList: BlBasicObject[] = [];
    public options: Option[] = [];
    public optionsGroupe: OptionGroup[] = [
      {
        label: 'Section 1',
        isHidden: false,
        options: [
          {label: 'Valeur1', value: 'S1V1', isHidden: false},
          {label: 'Valeur2', value: 'S1V2', isHidden: false},
          {label: 'Valeur3', value: 'S1V3', isHidden: false},
          {label: 'Valeur4', value: 'S1V4', isHidden: false},
          {label: 'Valeur5', value: 'S1V5', isHidden: false},
          {label: 'Valeur6', value: 'S1V6', isHidden: false}
        ]
      },
      {
        label: 'Section 2',
        isHidden: false,
        options: [
          {label: 'Valeur1', value: 'S2V1', isHidden: false},
          {label: 'Valeur2', value: 'S2V2', isHidden: false},
          {label: 'Valeur3', value: 'S2V3', isHidden: false},
          {label: 'Valeur4', value: 'S2V4', isHidden: false},
          {label: 'Valeur5', value: 'S2V5', isHidden: false},
          {label: 'Valeur6', value: 'S2V6', isHidden: false}
        ]
      }
    ];

    constructor(private staticBddService: StaticBddService) {
        super();
    }

    public ngOnInit(): void {
        for (let i = 0; i < 20; i++) {
            this.lst.push({id: i, code: 'v_' + i, label: 'Valeur ' + i});
        }
        this.lst.push({
            id: 45,
            code: 'LONG',
            label: 'Une valeur avec un nom très très très longgggggggggggggggg !'
        });

        this.options = this.staticBddService.getListOptions();
        this.formGroup = new FormGroup({
            autocomplete: new FormControl<BlBasicObject | null>(this.lst[0]),
            autocomplete2: new FormControl<BlBasicObject | null>(null),
            autocomplete3: new FormControl<BlBasicObject | null>(this.lst[3]),
            autocomplete4: new FormControl<BlBasicObject | null>(this.staticBddService.getStatus(1)),
            multiCombo: new FormControl<BlBasicObject[] | null>([this.lst[1], this.lst[2]]),
            multiCombo2: new FormControl<BlBasicObject[] | null>(null),
            multiCombo3: new FormControl<BlBasicObject[] | null>([this.lst[5], this.lst[6], this.lst[7]]),
            listBox: new FormControl<BlBasicObject | null>(this.lst[2]),
            listBox2: new FormControl<BlBasicObject | null>(null),
            listBox3: new FormControl<BlBasicObject | null>(this.lst[3]),
            search:  new FormControl<Option | null>(this.staticBddService.getOption(3, false).value),
            search2: new FormControl<Option | null>(null),
            search3: new FormControl<Option | null>(this.staticBddService.getOption(4, false).value),
            multiComboGroupSearch:  new FormControl<OptionGroup[] | null>( [this.optionsGroupe[0].options[0].value,this.optionsGroupe[1].options[1].value]),
            multiComboGroupSearch2: new FormControl<OptionGroup[] | null>(null),
            multiComboGroupSearch3: new FormControl<OptionGroup[] | null>([this.optionsGroupe[0].options[0].value,this.optionsGroupe[1].options[1].value])
        });
    }

    getData(data?: any) {
        this.staticBddService.listStatusAutocomplete(data).subscribe(statusList => this.autocompleteList = statusList);
    }
}
