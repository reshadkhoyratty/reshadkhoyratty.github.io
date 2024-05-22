import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BlBasicObject, BlCalloutObject, CalloutClassEnum} from '@esedit-md/shared-ui';
import {StaticBddService} from '../../../../services/static-bdd.service';
import {SampleAbstractComponent} from '../../../SampleAbstractComponent';
import {BlQuickSearchMultipleStatutComponent} from "./bl-quick-search-multiple-statut.component";

type BlAbstractQuickSearchFormGroup = {
  status1: BlBasicObject[] | null,
  status2: BlBasicObject[] | null,
  status3: BlBasicObject[] | null
}

@Component({
  selector: 'bl-abstract-quick-search-multiple-sample',
  templateUrl: './bl-abstract-quick-search-multiple-sample.component.html'
})
export class BlAbstractQuickSearchMultipleSampleComponent extends SampleAbstractComponent<BlAbstractQuickSearchFormGroup> implements OnInit {

  @ViewChild(BlQuickSearchMultipleStatutComponent) quickSearchStatutComponent: BlQuickSearchMultipleStatutComponent;
  callOuts: BlCalloutObject[]= [];

  constructor(private staticBddService: StaticBddService) {
    super();
  }

  public ngOnInit(): void {
    this.formGroup = new FormGroup({
        status1: new FormControl<BlBasicObject[] | null>([this.staticBddService.getStatus(1), this.staticBddService.getStatus(3)]),
        status2: new FormControl<BlBasicObject[] | null>([this.staticBddService.getStatus(1)]),
        status3: new FormControl<BlBasicObject[] | null>([this.staticBddService.getStatus(3)])
      }
    );
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
  }
}
