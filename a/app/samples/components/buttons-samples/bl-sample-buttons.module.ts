import { NgModule } from '@angular/core';
import {
  BlButtonModule,
  BlFabMenuModule,
  BlIconModule, BlIconSquareModule,
  BlSplitButtonModule,
  BlTransverseMenuModule,
  BlVerticalMenuModule,
} from '@esedit-md/shared-ui';
import { BlButtonSampleComponent } from './bl-button-sample/bl-button-sample.component';
import { BlFabMenuSampleComponent } from './bl-fab-menu-sample/bl-fab-menu-sample.component';
import { BlTransverseMenuSampleComponent } from './bl-transverse-menu-sample/bl-transverse-menu-sample.component';
import { BlVerticalMenuSampleComponent } from './bl-vertical-menu-sample/bl-vertical-menu-sample.component';
import { BlSplitButtonSampleComponent } from './bl-split-button-sample/bl-split-button-sample.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { BlButtonLinkSampleComponent } from './bl-button-link-sample/bl-button-link-sample.component';
import {
  BlButtonLinkModule
} from "../../../../../../../libs/shared-ui/src/lib/components/style/bl-button-link/bl-button-link.module";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";

const SAMPLE_COMPONENTS = [
  BlButtonSampleComponent,
  BlFabMenuSampleComponent,
  BlTransverseMenuSampleComponent,
  BlVerticalMenuSampleComponent,
  BlSplitButtonSampleComponent,
  BlButtonLinkSampleComponent
];

@NgModule({
  declarations: [SAMPLE_COMPONENTS],
  exports: [SAMPLE_COMPONENTS],
  providers: [],
  imports: [
    CommonModule,
    TranslateModule,
    BlButtonModule,
    BlSplitButtonModule,
    BlTransverseMenuModule,
    BlFabMenuModule,
    BlVerticalMenuModule,
    MatCardModule,
    BlIconModule,
    BlButtonLinkModule,
    MatSlideToggleModule,
    FormsModule,
    BlIconSquareModule,
  ],
})
export class ButtonsSampleModule {}
