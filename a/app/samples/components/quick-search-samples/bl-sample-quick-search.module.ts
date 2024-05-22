import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {
    BlAutoAbstractModule,
    BlAutocompleteModule,
    BlIconModule,
    BlListBoxAbstractModule,
    BlListBoxModule,
    BlMultiComboAbstractModule,
    BlMultiComboModule,
    BlSearchAbstractModule,
    BlSearchModule,
    BlTableModule,
    BlTextFieldDecimalModule, BlTextFieldModule
} from '@esedit-md/shared-ui';
import {TranslateModule} from '@ngx-translate/core';
import {
    BlMultiGroupSearchAbstractModule
} from '../../../../../../../libs/shared-ui/src/lib/components/abstract/bl-multi-group-search-abstract/bl-multi-group-search-abstract.module';

import {
    BlQuickSearchAbstractModule
} from '../../../../../../../libs/shared-ui/src/lib/components/abstract/bl-quick-search-abstract/bl-quick-search-abstract.module';
import {
    BlQuickSearchMultipleAbstractModule
} from '../../../../../../../libs/shared-ui/src/lib/components/abstract/bl-quick-search-multiple-abstract/bl-quick-search-multiple-abstract.module';

import {
    BlAbstractQuickSearchMultipleSampleComponent
} from './bl-abstract-quick-search-multiple-sample/bl-abstract-quick-search-multiple-sample.component';
import {
    BlQuickSearchMultipleStatutComponent
} from './bl-abstract-quick-search-multiple-sample/bl-quick-search-multiple-statut.component';
import {
    BlQuickSearchMultipleTemplateModeComponent
} from './bl-abstract-quick-search-multiple-sample/bl-quick-search-multiple-templateMode.component';
import {
    BlAbstractQuickSearchSampleComponent
} from './bl-abstract-quick-search-sample/bl-abstract-quick-search-sample.component';
import {BlQuickSearchStatutComponent} from './bl-abstract-quick-search-sample/bl-quick-search-statut.component';
import {
  BlMultiComboSearchAbstractModule
} from "../../../../../../../libs/shared-ui/src/lib/components/abstract/bl-multi-combo-search-abstract/bl-multi-combo-search-abstract.module";
import {
    BlAbstractMultiComboSearchSampleComponent
} from "../selects-samples/bl-abstract-multi-combo-search-sample/bl-abstract-multi-combo-search-sample.component";
import {SelectsSampleModule} from "../selects-samples/bl-sample-lists.module";
import {BlQuickSearchSecondStatutComponent} from './bl-abstract-quick-search-sample/bl-quick-search-second-statut.component';


import {
  BlAbstractQuickSearchMultipleWithCdialogComponent
} from './bl-abstract-quick-search-multiple-cdialog-sample/bl-abstract-quick-search-multiple-cdialog-sample.component';
import {
  BlQuickSearchMultipleExampleComponent
} from './bl-abstract-quick-search-multiple-cdialog-sample/bl-quick-search-multiple-example.component';

const SAMPLE_COMPONENTS = [
    BlAbstractQuickSearchSampleComponent,
    BlQuickSearchStatutComponent,
    BlAbstractQuickSearchMultipleSampleComponent,
    BlQuickSearchMultipleStatutComponent,
  BlAbstractMultiComboSearchSampleComponent,
    BlQuickSearchSecondStatutComponent,
    BlQuickSearchMultipleTemplateModeComponent,
  BlAbstractQuickSearchMultipleWithCdialogComponent,
  BlQuickSearchMultipleExampleComponent

]

@NgModule({
    declarations: [
        SAMPLE_COMPONENTS
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BlMultiComboAbstractModule,
        BlMultiGroupSearchAbstractModule,
        BlListBoxAbstractModule,
        BlSearchModule,
        TranslateModule,
        BlSearchAbstractModule,
        BlMultiComboModule,
        BlListBoxModule,
        BlMultiGroupSearchAbstractModule,
        BlAutocompleteModule,
        BlQuickSearchAbstractModule,
        BlTableModule,
        MatIconModule,
        BlIconModule,
        BlQuickSearchMultipleAbstractModule,
        BlTextFieldDecimalModule,
        BlMultiComboSearchAbstractModule,
        BlAutoAbstractModule,
        SelectsSampleModule,
        BlTextFieldModule,
        MatTabsModule
    ],
    exports: [
        SAMPLE_COMPONENTS
    ]
})

export class BlSampleQuickSearchModule {
}
