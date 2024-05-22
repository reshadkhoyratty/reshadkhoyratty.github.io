import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {
    BlBubbleIconModule,
    BlButtonModule,
    BlCalloutModule,
    BlCardModule,
    BlChipsModule,
    BlDatepickerModule,
    BlDividerModule,
    BlGenericDialogModule,
    BlIconModule,
    BlImageWithContentModule,
    BlLabelCounterModule,
    BlLabelModule,
    BlListBoxModule,
    BlPopupCardModule,
    BlShortcutModule,
    BlSplitButtonModule,
    BlTableModule,
    BlTextFieldModule,
    BlVerticalMenuModule,
    BreadcrumbModule,
    SharedUiModule,
} from '@esedit-md/shared-ui';
import {TranslateModule} from '@ngx-translate/core';
import {BlNavCardModule} from 'libs/shared-ui/src/lib/components/style/bl-nav-card/bl-nav-card.module';
import {BlNoDataModule} from 'libs/shared-ui/src/lib/components/style/bl-no-data/bl-no-data.module';
import {BlStepModule} from 'libs/shared-ui/src/lib/components/style/bl-stepper/bl-step/bl-step.module';
import {BlTabGroupModule} from 'libs/shared-ui/src/lib/components/style/bl-tabs/bl-tab-group/bl-tab-group.module';
import {HighlightModule} from 'ngx-highlightjs';
import {
    BlMonthPickerModule
} from '../../../../../../libs/shared-ui/src/lib/components/basic/bl-month-picker/bl-month-picker.module';
import {
    BlAutocompleteModule
} from '../../../../../../libs/shared-ui/src/lib/components/basic/list/bl-autocomplete/bl-autocomplete.module';
import {BlBubbleModule} from '../../../../../../libs/shared-ui/src/lib/components/style/bl-bubble/bl-bubble.module';
import {
    BlFabMenuModule
} from '../../../../../../libs/shared-ui/src/lib/components/style/bl-fab-menu/bl-fab-menu.module';
import {
    BlMarketingPanelModule
} from '../../../../../../libs/shared-ui/src/lib/components/style/bl-marketing-panel/bl-marketing-panel.module';
import {
    BlNumberChipModule
} from '../../../../../../libs/shared-ui/src/lib/components/style/bl-number-chip/bl-number-chip.module';
import {
    BlTransverseMenuModule
} from '../../../../../../libs/shared-ui/src/lib/components/style/bl-transverse-menu/bl-transverse-menu.module';
import {BlSampleViewerModule} from '../../bl-sample-viewer/bl-sample-viewer.module';
import {CodeTabModule} from '../../util/code-tab/code-tab.module';
import {BlSampleUtilitiesModule} from '../utilities/bl-sample-utilities.module';
import {BlBubbleIconSampleComponent} from './bl-bubble-icon-sample/bl-bubble-icon-sample.component';
import {BlDividerSampleComponent} from './bl-divider-sample/bl-divider-sample.component';
import {
    BlFormFieldAppearanceSampleComponent
} from './bl-form-field-appearance-sample/bl-form-field-appearance-sample.component';
import {BlIconSampleComponent} from './bl-icon-sample/bl-icon-sample.component';
import {BlImageWithContentSampleComponent} from './bl-image-with-content-sample/bl-image-with-content-sample.component';
import {BlLabelCounterSampleComponent} from './bl-label-counter-sample/bl-label-counter-sample.component';
import {BlLabelSampleComponent} from './bl-label-sample/bl-label-sample.component';
import {BlMarketingPanelSampleComponent} from './bl-marketing-panel-sample/bl-marketing-panel-sample.component';
import {BlNumberChipSampleComponent} from './bl-number-chip-sample/bl-number-chip-sample.component';
import {BlPopupCardSampleComponent} from './bl-popup-card-sample/bl-popup-card-sample.component';
import {BlTabGroupSampleComponent} from './bl-tab-group-sample/bl-tab-group-sample.component';

const SAMPLE_COMPONENTS = [
    BlIconSampleComponent,
    BlDividerSampleComponent,
    BlPopupCardSampleComponent,
    BlTabGroupSampleComponent,
    BlFormFieldAppearanceSampleComponent,
    BlLabelSampleComponent,
    BlLabelCounterSampleComponent,
    BlImageWithContentSampleComponent,
    BlBubbleIconSampleComponent,
    BlMarketingPanelSampleComponent,
    BlNumberChipSampleComponent,
];

@NgModule({
    declarations: [SAMPLE_COMPONENTS],
    exports: [SAMPLE_COMPONENTS],
    providers: [],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        BlButtonModule,
        BlIconModule,
        BlVerticalMenuModule,
        TranslateModule,
        HighlightModule,
        BlSplitButtonModule,
        BlCalloutModule,
        BlTransverseMenuModule,
        BreadcrumbModule,
        CodeTabModule,
        SharedUiModule,
        BlSampleUtilitiesModule,
        BlSampleViewerModule,
        MatCardModule,
        BlFabMenuModule,
        MatButtonModule,
        BlFabMenuModule,
        BlDividerModule,
        MatListModule,
        BlPopupCardModule,
        BlChipsModule,
        BlShortcutModule,
        BlTextFieldModule,
        BlTabGroupModule,
        BlCardModule,
        BlDatepickerModule,
        BlListBoxModule,
        BlStepModule,
        BlTableModule,
        BlAutocompleteModule,
        BlMonthPickerModule,
        BlNoDataModule,
        BlLabelModule,
        BlLabelCounterModule,
        BlImageWithContentModule,
        BlBubbleIconModule,
        BlNavCardModule,
        BlGenericDialogModule,
        BlMarketingPanelModule,
        MatTooltipModule,
        BlNumberChipModule,
        BlBubbleModule,
        MatExpansionModule,
        MatSlideToggleModule,
    ]
})
export class BlSampleStyleModule {
}
