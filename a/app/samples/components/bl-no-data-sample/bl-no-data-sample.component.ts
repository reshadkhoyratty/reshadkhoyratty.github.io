import { Component ,OnInit} from '@angular/core';
import { IconClassEnum } from '@esedit-md/shared-ui';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'bl-no-data-sample',
  templateUrl: './bl-no-data-sample.component.html',
  styleUrls: ['./bl-no-data-sample.component.scss'],
})
export class BlNoDataSampleComponent {
  public title1 : string ;
  public cardTitle :string;
  public title2 : string;
  icon_archive : IconClassEnum;

  constructor(translator : TranslateService){
    this.title1 = translator.instant('sample.no-data.title1');
    this.title2 = translator.instant('sample.no-data.title2');
    this.cardTitle = translator.instant('sample.no-data.title-card');
    this.icon_archive = IconClassEnum.archive;
  }
 
}
