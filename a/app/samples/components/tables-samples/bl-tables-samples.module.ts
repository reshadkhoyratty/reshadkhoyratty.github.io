import { NgModule } from "@angular/core";
import {
  BlButtonModule, BlElementsDirectiveModule,
  BlFilterTablePanelModule, BlListBoxModule, BlMultiComboModule,
  BlTableModule, BlTextFieldModule,
  BlTransverseMenuModule,
} from "@esedit-md/shared-ui";
import { TranslateModule } from "@ngx-translate/core";
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {BlTableSampleComponent} from "./bl-datatable-sample/bl-table-sample.component";
import {MatDialogModule} from "@angular/material/dialog";
import {AppLayoutModule} from "@bl/bl-app-layout";
import {BlTableMarkedForSampleComponent} from "./bl-table-marked-for-sample/bl-table-marked-for-sample.component";
import {
  BlTableCustomFilterSampleComponent
} from "./bl-table-custom-filter-sample/bl-table-custom-filter-sample.component";
import {BlErrorModule} from "../../../../../../../libs/shared-ui/src/lib/components/basic/bl-error/bl-error.module";

const SAMPLE_COMPONENTS = [
  BlTableSampleComponent,
  BlTableMarkedForSampleComponent,
  BlTableCustomFilterSampleComponent,
];

@NgModule({
    declarations: [SAMPLE_COMPONENTS],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        BlButtonModule,
        BlTransverseMenuModule,
        MatDialogModule,
        BlElementsDirectiveModule,
        MatCardModule,
        AppLayoutModule,
        BlTableModule,
        BlTextFieldModule,
        BlFilterTablePanelModule,
        BlMultiComboModule,
        BlListBoxModule,
        BlErrorModule,

    ],
    exports: [SAMPLE_COMPONENTS],
    providers: [],
  })
  export class BlTableSamplesModule {}
