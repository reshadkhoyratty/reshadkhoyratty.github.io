import { Component } from '@angular/core';
import {
  chipPosition
} from "../../../../../../../libs/shared-ui/src/lib/components/style/bl-number-chip/bl-number-chip.component";

@Component({
  selector: 'bl-number-chip-sample',
  templateUrl: './bl-number-chip-sample.component.html',
  styleUrls: ['./bl-number-chip-sample.component.scss'],
})
export class BlNumberChipSampleComponent {
  protected readonly chipPosition = chipPosition;
}
