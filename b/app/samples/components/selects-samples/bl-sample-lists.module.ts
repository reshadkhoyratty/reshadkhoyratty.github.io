import { NgModule } from "@angular/core";
import {
  BlButtonModule,
  BlFabMenuModule,
  BlIconModule,
  BlListBoxAbstractModule,
  BlListBoxModule, BlMultiComboAbstractModule, BlMultiComboSearchAbstractModule, BlSearchAbstractModule,
  BlSearchModule,
  BlSplitButtonModule,
  BlTransverseMenuModule,
  BlVerticalMenuModule,
  SelectSearchModule
} from "@esedit-md/shared-ui";
import { TranslateModule } from "@ngx-translate/core";
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from "@angular/common";
import { BlSelectSampleComponent } from "./bl-select-sample/bl-select-sample.component";
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatOptionModule } from "@angular/material/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {BlAbstractListBoxSampleComponent} from "./bl-abstract-list-box-sample/bl-abstract-list-box-sample.component";
import {
  BlListBoxStatutComponent,
  BlListBoxStatutWithDisabledComponent
} from "./bl-abstract-list-box-sample/bl-list-box-statut.component";
import {BlMultiComboStatutComponent} from "./bl-abstract-multi-combo-sample/bl-multi-combo-statut.component";
import {
  BlAbstractMultiComboSampleComponent
} from "./bl-abstract-multi-combo-sample/bl-abstract-multi-combo-sample.component";
import {
  BlMultiComboSearchStatutComponent
} from "./bl-abstract-multi-combo-search-sample/bl-multi-combo-search-statut.component";
import {BlSearchStatutComponent} from "./bl-abstract-search-sample/bl-search-statut.component";
import {BlAbstractSearchSampleComponent} from "./bl-abstract-search-sample/bl-abstract-search-sample.component";

const SAMPLE_COMPONENTS = [
  BlSelectSampleComponent,
  BlAbstractListBoxSampleComponent,
  BlListBoxStatutComponent,
  BlListBoxStatutWithDisabledComponent,
  BlMultiComboStatutComponent,
  BlAbstractMultiComboSampleComponent,
  BlMultiComboSearchStatutComponent,
  BlSearchStatutComponent,
  BlAbstractSearchSampleComponent,
];

@NgModule({
    declarations: [SAMPLE_COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    BlButtonModule,
    BlSplitButtonModule,
    BlTransverseMenuModule,
    BlFabMenuModule,
    BlVerticalMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    BlIconModule,
    SelectSearchModule,
    MatOptionModule,
    MatToolbarModule,
    BlListBoxModule,
    BlListBoxAbstractModule,
    BlMultiComboAbstractModule,
    BlMultiComboSearchAbstractModule,
    BlSearchAbstractModule,

  ],
    exports: [SAMPLE_COMPONENTS],
    providers: [],
  })
  export class SelectsSampleModule {}
