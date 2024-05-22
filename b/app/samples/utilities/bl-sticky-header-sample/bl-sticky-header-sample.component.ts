import { Component} from '@angular/core';
import {BlBasicObject} from '@esedit-md/shared-ui';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'bl-sticky-header-sample',
  templateUrl: './bl-sticky-header-sample.component.html',
})
export class BlStickyHeaderSampleComponent {
  myArray: number[] = Array.from({ length: 100 }, (_, index) => index + 1);
}
