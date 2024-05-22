import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BlBasicObject, CustomAction, IconClassEnum} from '@esedit-md/shared-ui';
import {StaticBddService} from '../../../services/static-bdd.service';
import {SampleAbstractComponent} from '../../SampleAbstractComponent';
import {BlAutoStatutComponent} from './bl-auto-statut.component';
import {ToasterService} from "@bl/shared";
import {TranslateService} from "@ngx-translate/core";

type BlAbstractAutoCompleteFormGroup = {
    status1: BlBasicObject | null,
    status2: BlBasicObject | null,
    status3: BlBasicObject | null,
    status4: BlBasicObject | null,
    status5: BlBasicObject | null,
    status6: BlBasicObject | null,
    status7: BlBasicObject | null,
    listeSize: number
}

@Component({
    selector: 'bl-abstract-autocomplete-sample',
    templateUrl: './bl-abstract-autocomplete-sample.component.html'
})
export class BlAbstractAutocompleteSampleComponent extends SampleAbstractComponent<BlAbstractAutoCompleteFormGroup> implements OnInit {
    public lst: BlBasicObject[] = [];
    public autocompleteList: BlBasicObject[] = [];
    public autocompleteStatus5List: BlBasicObject[] = [];
    public autocompleteStatus6List: BlBasicObject[] = [];
    public addAction : CustomAction;
    @ViewChild(BlAutoStatutComponent) autoStatutComponent: BlAutoStatutComponent;

    constructor(private staticBddService: StaticBddService,public toasterService: ToasterService, public translate : TranslateService) {
        super();
    }

    public ngOnInit(): void {
      this.addAction = {testLabel: "action-custom-autoComplete1",
        label:this.translate.instant("sample.autocomplete.actionLabel"),icon:IconClassEnum.plus};

        this.formGroup = new FormGroup({
                status1: new FormControl<BlBasicObject | null>(this.staticBddService.getStatus(1)),
                status2: new FormControl<BlBasicObject | null>(this.staticBddService.getStatus(2)),
                status3: new FormControl<BlBasicObject | null>(this.staticBddService.getStatus(3)),
                status4: new FormControl<BlBasicObject | null>(this.staticBddService.getStatus(4)),
                status5: new FormControl<BlBasicObject | null>(this.staticBddService.getStatus(5)),
                status6: new FormControl<BlBasicObject | null>(this.staticBddService.getStatus(6)),
                status7: new FormControl<BlBasicObject | null>(this.staticBddService.getStatus(1)),

                listeSize: new FormControl<number>(50)
            }
        );
    }

    public getData(data?: any): void {
        this.staticBddService.listStatusAutocomplete(data).subscribe(statusList => this.autocompleteList = statusList);
    }

    public getLargeData5(data:any): void{
        if(this.formGroup.get('listeSize').value){
        this.staticBddService.listStatusAutocompleteLarge(data, this.formGroup.get('listeSize').value).subscribe(statusList => {
            this.autocompleteStatus5List = statusList;
        });
        }
        }
    public getLargeData6(data:any): void{
        if(this.formGroup.get('listeSize').value){
            this.staticBddService.listStatusAutocompleteLarge(data, this.formGroup.get('listeSize').value).subscribe(statusList =>  {
                this.autocompleteStatus6List = statusList;
            });
        }
    }
    public onCustomActionClick(value:any){
      //value.label
      this.toasterService.success(this.translate.instant("sample.autocomplete.eventMsg")+ value.label);
    }
}
