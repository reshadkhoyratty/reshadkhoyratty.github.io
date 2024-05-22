import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {
  BlBasicObject,
  BlCalloutObject,
  CalloutClassEnum,
  customActionSearch,
  IconClassEnum
} from '@esedit-md/shared-ui';
import {
  BlQuicksearchFooterButton
} from '../../../../../../../../libs/shared-ui/src/lib/models/bl-quicksearch-footer.model';
import {BlQuickSearchSecondStatutComponent} from './bl-quick-search-second-statut.component';
import {BlQuickSearchStatutComponent} from './bl-quick-search-statut.component';
import {ToasterService} from "@bl/shared";
import {TranslateService} from "@ngx-translate/core";
import {SampleAbstractComponent} from "../../../SampleAbstractComponent";
import {StaticBddService} from "../../../../services/static-bdd.service";

type BlAbstractQuickSearchFormGroup = {
  status1: BlBasicObject | null,
  status2: BlBasicObject | null,
  status3: BlBasicObject | null,
  statut4:BlBasicObject | null,

  name : BlBasicObject |null
}

@Component({
  selector: 'bl-abstract-quick-search-sample',
  templateUrl: './bl-abstract-quick-search-sample.component.html'
})
export class BlAbstractQuickSearchSampleComponent extends SampleAbstractComponent<BlAbstractQuickSearchFormGroup> implements OnInit {
  modalTitle = '';
  callOuts: BlCalloutObject[]= [];
  @ViewChild(BlQuickSearchStatutComponent) quickSearchStatutComponent: BlQuickSearchStatutComponent;
  @ViewChild(BlQuickSearchSecondStatutComponent) quickSearchStatutComponent2: BlQuickSearchSecondStatutComponent;
  public addFavoritAction : customActionSearch;
  cancelButton : BlQuicksearchFooterButton;
  constructor(private translateService: TranslateService,private staticBddService: StaticBddService,public toasterService: ToasterService) {
    super();
  }

  public ngOnInit(): void {
    this.modalTitle='Modal Title';
    this.callOuts = [
      {
        calloutCLass:CalloutClassEnum.information,
        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a consequat dolor, quis aliquam nibh. Nullam massa velit, maximus malesuada nibh sit amet, suscipit tincidunt enim. ',
        title:'Information',
        enablePicto:true
      },
      {
        calloutCLass:CalloutClassEnum.warning,
        text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a consequat dolor, quis aliquam nibh. Nullam massa velit, maximus malesuada nibh sit amet, suscipit tincidunt enim. ',
        title:'Warning',
        enablePicto:true

      }
    ]
    this.formGroup = new FormGroup({
        status1: new FormControl<BlBasicObject | null>(this.staticBddService.getStatus(1)),
        status2: new FormControl<BlBasicObject | null>(this.staticBddService.getStatus(1)),
        status3: new FormControl<BlBasicObject | null>(this.staticBddService.getStatus(3)),
      statut4: new FormControl<BlBasicObject | null>(this.staticBddService.getStatus(4)),
      name: new FormControl<BlBasicObject | null>(null),
      }
    );

    this.addFavoritAction = {
      label: "Ajouter aux favoris",
      icon: IconClassEnum.heart_fill,
      testLabel: "action_ajout_favorit"
    };
    this.cancelButton =  {
      butonName:'Fermer',
      withIcon:true,
      tooltip:'tooltip ',
      iconClassName:IconClassEnum.warn_triange_fill
    }
  }

  addToFavorit(value:any) {
    this.toasterService.success(this.translateService.instant('sample.datatable.event.add') + ': ' + value.label);
  }


}
