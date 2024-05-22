import { Component } from '@angular/core';
import { IconClassEnum } from '@esedit-md/shared-ui';
import { PoiPoint } from '../../../../../../../libs/shared-ui/src/lib/components/basic/bl-counter/bl-indicator-svg/PoiPoint';

@Component({
  selector: 'bl-counter-sample',

  templateUrl: './bl-counter-sample.component.html',
})
export class BlCounterSampleComponent {
  down = IconClassEnum.arrow_down_right;
  up = IconClassEnum.arrow_up_right;
  stable = IconClassEnum.arrow_right;
  ascPoints: PoiPoint[] = [
    { x: 0, y: 1 },
    { x: 1, y: 13 },
    { x: 2, y: 20 },
    { x: 3, y: 19 },
    { x: 4, y: 52 },
    { x: 5, y: 43 },
    { x: 6, y: 89 },
  ];
  descPoints: PoiPoint[] = [
    { x: 0, y: 20 },
    { x: 1, y: 13 },
    { x: 2, y: 13 },
    { x: 3, y: 9 },
    { x: 4, y: 5 },
    { x: 5, y: 13 },
    { x: 6, y: 0 },
  ];
  stablePoints = [
    { x: 0, y: 13 },
    { x: 1, y: 13 },
    { x: 2, y: 13 },
    { x: 3, y: 13 },
    { x: 4, y: 13 },
    { x: 5, y: 13 },
    { x: 6, y: 13 },
  ];
}
