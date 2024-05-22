import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BlBasicObject } from '@esedit-md/shared-ui';
import { StaticBddService } from '../../../../services/static-bdd.service';
import { SampleAbstractComponent } from '../../../SampleAbstractComponent';
import { BlListBoxStatutComponent } from './bl-list-box-statut.component';

type BlAbstractLbFormGroup = {
  status1: BlBasicObject | null;
  status2: BlBasicObject | null;
  status3: BlBasicObject | null;
  status4: BlBasicObject | null;
  status5: BlBasicObject | null;
};

@Component({
  selector: 'bl-abstract-list-box-sample',
  templateUrl: './bl-abstract-list-box-sample.component.html',
})
export class BlAbstractListBoxSampleComponent
  extends SampleAbstractComponent<BlAbstractLbFormGroup>
  implements OnInit
{
  @ViewChild(BlListBoxStatutComponent)
  lbStatutComponent: BlListBoxStatutComponent;

  constructor(private staticBddService: StaticBddService) {
    super();
  }

  public ngOnInit(): void {
    this.formGroup = new FormGroup({
      status1: new FormControl<BlBasicObject | null>(
        this.staticBddService.getStatus(1)
      ),
      status2: new FormControl<BlBasicObject | null>(
        this.staticBddService.getStatus(2)
      ),
      status3: new FormControl<BlBasicObject | null>(
        this.staticBddService.getStatus(3)
      ),
      status4: new FormControl<BlBasicObject | null>(
        this.staticBddService.getStatus(4)
      ),
      status5: new FormControl<BlBasicObject | null>(
        this.staticBddService.getStatus(5)
      ),
    });
  }
}
