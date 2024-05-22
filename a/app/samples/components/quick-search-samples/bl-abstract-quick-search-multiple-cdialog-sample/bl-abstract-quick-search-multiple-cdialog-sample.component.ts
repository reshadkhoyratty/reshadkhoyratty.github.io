import { Component, OnInit } from '@angular/core';
import { BlBasicObject, BlCalloutObject, ImageInfo } from '@esedit-md/shared-ui';
import { StaticBddService } from '../../../../services/static-bdd.service';
import { FormControl, FormGroup } from '@angular/forms';
import { SampleAbstractComponent } from '../../../SampleAbstractComponent';

type BlAbstractQuickSearchFormGroup = {
  templateExample: BlBasicObject[] |null
}
@Component(
  {
    selector:'bl-quick-search-multiple-with-cdialog-sample',

    templateUrl:'./bl-abstract-quick-search-multiple-cdialog-sample.component.html',
    styleUrls:['./bl-abstract-quick-search-multiple-cdialog-sample.scss']
  }
)


export class BlAbstractQuickSearchMultipleWithCdialogComponent extends SampleAbstractComponent<BlAbstractQuickSearchFormGroup> implements OnInit {
  callOuts: BlCalloutObject[] = [];
  image: ImageInfo

  constructor(private staticBddService: StaticBddService) {
    super();
  }

  public ngOnInit(): void {
    this.formGroup = new FormGroup({

        templateExample: new FormControl<BlBasicObject[] | null>([this.staticBddService.getName(4)]),
      }
    );
    this.image = new ImageInfo('assets/img/quick-search-workflow/workflowQuickSearch.png', 'workflow')
  }
}
