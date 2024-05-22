import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {AppLayoutModule} from '@bl/bl-app-layout';
import {
  BlActionBannerModule,
  BlAttachmentModule,
  BlAutoAbstractModule,
  BlAutocompleteModule,
  BlBubbleIconModule,
  BlButtonModule,
  BlCalendarModule,
  BlCalloutModule,
  BlCardModule,
  BlCarteExpensionPanelModule,
  BlCheckboxModule,
  BlChipsModule,
  BlColorCirclesModule,
  BlColorPickerModule,
  BlCounterModule,
  BlDatepickerModule,
  BlDatepickerRangeModule,
  BlElementsDirectiveModule,
  BlGaugeModule,
  BlGenericDialogModule,
  BlIconPickerModule,
  BlImagePickerModule,
  BlImageWithContentModule,
  BlListBoxModule,
  BlMemoModule,
  BlMonthPickerModule,
  BlMultiAttachmentModule,
  BlMultiComboModule,
  BlMultiGroupSearchAbstractModule,
  BlMultiGroupSearchModule,
  BlNavCardModule,
  BlRadioComponentModule,
  BlSearchModule,
  BlShortcutModule,
  BlSlideToggleComponentModule,
  BlStepModule,
  BlStepperModule,
  BlTableModule,
  BlTaskModule,
  BlTextAreaModule,
  BlTextFieldDecimalModule,
  BlTextFieldFractionModule,
  BlTextFieldModule,
  BlTreeModule,
  BlWorkflowModule,
  BlYearPickerModule,
  BreadcrumbModule,
  EditableTable2Module,
  EditableTableModule,
  HorizontalGaugeModule,
  HyperlinkModule,
  SelectSearchModule,
  SharedUiModule,
  TimeModule
} from '@esedit-md/shared-ui';
import {TranslateModule} from '@ngx-translate/core';
import {BlNoDataModule} from 'libs/shared-ui/src/lib/components/style/bl-no-data/bl-no-data.module';
import {BlErrorModule} from '../../../../../../libs/shared-ui/src/lib/components/basic/bl-error/bl-error.module';
import {
  BlMarketingPanelModule
} from '../../../../../../libs/shared-ui/src/lib/components/style/bl-marketing-panel/bl-marketing-panel.module';
import {
  BlNumberChipModule
} from '../../../../../../libs/shared-ui/src/lib/components/style/bl-number-chip/bl-number-chip.module';
import {CodeTabModule} from '../../util/code-tab/code-tab.module';
import {
  BlAbstractAutocompleteSampleComponent
} from './bl-abstract-autocomplete-sample/bl-abstract-autocomplete-sample.component';
import {BlAutoStatutStaticComponent} from './bl-abstract-autocomplete-sample/bl-auto-status-static.component';
import {BlAutoStatutComponent} from './bl-abstract-autocomplete-sample/bl-auto-statut.component';
import {BlAttachmentSampleComponent} from './bl-attachment-sample/bl-attachment-sample.component';
import {BlBreadCrumbSampleComponent} from './bl-bread-crumb-sample/bl-bread-crumb-sample.component';
import {BlCalloutSampleComponent} from './bl-callout-sample/bl-callout-sample.component';
import {
  BlCardExpensionPanelSampleComponent
} from './bl-card-expension-panel-sample/bl-card-expension-panel-sample.component';
import {BlCardSampleComponent} from './bl-card-sample/bl-card-sample.component';
import {BlCheckboxSampleComponent} from './bl-checkbox-sample/bl-checkbox-sample.component';
import {BlChipSampleComponent} from './bl-chips-sample/bl-chips-sample.component';
import {BlColorPickerSampleComponent} from './bl-color-picker-sample/bl-color-picker-sample.component';
import {BlCounterSampleComponent} from './bl-counter-sample/bl-counter-sample.component';
import {BlDialogSampleComponent} from './bl-dialog-sample/bl-dialog-sample.component';
import {BlEditableTable2SampleComponent} from './bl-editable-table2-sample/bl-editable-table2-sample.component';
import {BlGaugeSampleComponent} from './bl-gauge-sample/bl-gauge-sample.component';
import {
  BlGenericDialogSample1Component
} from './bl-generic-dialog-samples/bl-generic-dialog-sample-1/bl-generic-dialog-sample-1.component';
import {
  BlGenericDialogSample2Component
} from './bl-generic-dialog-samples/bl-generic-dialog-sample-2/bl-generic-dialog-sample-2.component';
import {BlGenericDialogSamplesComponent} from './bl-generic-dialog-samples/bl-generic-dialog-samples.component';
import {BlHorizontalGaugeSampleComponent} from './bl-horizontal-gauge-sample/bl-horizontal-gauge-sample.component';
import {BlHyperlinkSampleComponent} from './bl-hyperlink-sample/bl-hyperlink-sample.component';
import {BlIconPickerSampleComponent} from './bl-icon-picker-sample/bl-icon-picker-sample.component';
import {
  BlImagePickerDialogComponent
} from './bl-image-picker-sample/bl-image-picker-dialog/bl-image-picker-dialog.component';
import {BlImagePickerSampleComponent} from './bl-image-picker-sample/bl-image-picker-sample.component';
import {BlListSampleComponent} from './bl-list-sample/bl-list-sample.component';
import {BlMemoSampleComponent} from './bl-memo-sample/bl-memo-sample.component';
import {BlMultiAttachmentSampleComponent} from './bl-multi-attachment-sample/bl-multi-attachment-sample.component';
import {
  BlNavCardDialogSampleComponent
} from './bl-nav-card-sample/bl-nav-card-dialog-sample/bl-nav-card-dialog-sample.component';
import {BlNavCardSampleComponent} from './bl-nav-card-sample/bl-nav-card-sample.component';
import {BlNoDataSampleComponent} from './bl-no-data-sample/bl-no-data-sample.component';
import {BlRadioSampleComponent} from './bl-radio-sample/bl-radio-sample.component';
import {BlShortcutSampleComponent} from './bl-shortcut-sample/bl-shortcut-sample.component';
import {BlSlideToggleSampleComponent} from './bl-slide-toggle-sample/bl-slide-toggle-sample.component';
import {BlSnackbarSampleComponent} from './bl-snackbar-sample/bl-snackbar-sample.component';
import {BlStepperSampleComponent} from './bl-stepper-sample/bl-stepper-sample.component';
import {BlTableFilterSampleComponent} from './bl-table-filter-sample/bl-table-filter-sample.component';
import {BlTaskSampleComponent} from './bl-task-sample/bl-task-sample.component';
import {BlTextAreaSampleComponent} from './bl-text-area-sample/bl-text-area-sample.component';
import {BlTextFieldDecimalSampleComponent} from './bl-text-field-decimal-sample/bl-text-field-decimal-sample.component';
import {
  BlTextFieldFractionSampleComponent
} from './bl-text-field-fraction-sample/bl-text-field-fraction-sample.component';
import {BlTextFieldSampleComponent} from './bl-text-field-sample/bl-text-field-sample.component';
import {BlTreeSampleComponent} from './bl-tree-sample/bl-tree-sample.component';
import {BlWorkflowSampleComponent} from './bl-workflow-sample/bl-workflow-sample.component';
import {BlTableSamplesModule} from './tables-samples/bl-tables-samples.module';
import {
  BlDialogContentComponent
} from './quick-search-samples/bl-abstract-quick-search-multiple-sample/bl-dialog-content.component';

const SAMPLE_COMPONENTS = [
    BlAbstractAutocompleteSampleComponent,
    BlAttachmentSampleComponent,
    BlCardExpensionPanelSampleComponent,
    BlCardSampleComponent,
    BlCheckboxSampleComponent,
    BlCounterSampleComponent,
    BlDialogSampleComponent,
    BlGenericDialogSamplesComponent,
    BlGenericDialogSample1Component,
    BlGenericDialogSample2Component,
    BlHorizontalGaugeSampleComponent,
    BlListSampleComponent,
    BlTextAreaSampleComponent,
    BlTextFieldDecimalSampleComponent,
    BlTextFieldFractionSampleComponent,
    BlTextFieldSampleComponent,
    BlTreeSampleComponent,
    BlEditableTable2SampleComponent,
    BlRadioSampleComponent,
    BlNoDataSampleComponent,
    BlBreadCrumbSampleComponent,
    BlMemoSampleComponent,
    BlCalloutSampleComponent,
    BlAutoStatutStaticComponent,
    BlAutoStatutComponent,
    BlNavCardSampleComponent,
    BlNavCardDialogSampleComponent,
    BlTableFilterSampleComponent,
    BlSlideToggleSampleComponent,
    BlDialogContentComponent,
    BlHyperlinkSampleComponent,
    BlMultiAttachmentSampleComponent,
    BlStepperSampleComponent,
    BlSnackbarSampleComponent,
    BlShortcutSampleComponent,
    BlTaskSampleComponent,
    BlWorkflowSampleComponent,
    BlChipSampleComponent,
    BlGaugeSampleComponent,
    BlIconPickerSampleComponent,
    BlColorPickerSampleComponent,
    BlImagePickerDialogComponent,
    BlImagePickerSampleComponent
];

@NgModule({
    declarations: [SAMPLE_COMPONENTS],
    imports: [
        CommonModule,
        TranslateModule,
        BlAutoAbstractModule,
        BlTreeModule,
        BlTextFieldDecimalModule,
        BlTextAreaModule,
        BlDatepickerRangeModule,
        BlDatepickerModule,
        BlCounterModule,
        CodeTabModule,
        BlMonthPickerModule,
        BlSearchModule,
        BlMultiGroupSearchAbstractModule,
        BlListBoxModule,
        BlMultiComboModule,
        BlAutocompleteModule,
        BlTextFieldModule,
        BlTextFieldFractionModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        BlCalendarModule,
        ReactiveFormsModule,
        BlYearPickerModule,
        BlStepperModule,
        BlGenericDialogModule,
        EditableTableModule,
        BlAttachmentModule,
        HorizontalGaugeModule,
        SelectSearchModule,
        BlMultiGroupSearchModule,
        TimeModule,
        MatCheckboxModule,
        MatCardModule,
        MatDividerModule,
        SharedUiModule,
        BlElementsDirectiveModule,
        MatTabsModule,
        EditableTable2Module,
        MatDatepickerModule,
        AppLayoutModule,
        HorizontalGaugeModule,
        BlActionBannerModule,
        BlCheckboxModule,
        BlCounterModule,
        BlDatepickerRangeModule,
        BlCarteExpensionPanelModule,
        BlButtonModule,
        BlCardModule,
        MatExpansionModule,
        BlRadioComponentModule,
        BlNoDataModule,
        BreadcrumbModule,
        BlMemoModule,
        BlMultiAttachmentModule,
        BlCalloutModule,
        BlNumberChipModule,
        BlMarketingPanelModule,
        BlBubbleIconModule,
        BlNavCardModule,
        BlTableModule,
        BlSlideToggleComponentModule,
        HyperlinkModule,
        BlErrorModule,
        BlStepModule,
        BlStepperModule,
        BlTableSamplesModule,
        BlChipsModule,
        BlGaugeModule,
        BlTaskModule,
        MatSlideToggleModule,
        FormsModule,
        BlWorkflowModule,
        BlShortcutModule,
        BlIconPickerModule,
        BlColorPickerModule,
        BlColorCirclesModule,
        BlImageWithContentModule,
        BlImagePickerModule,
    ],
    exports: [SAMPLE_COMPONENTS],
    providers: [],
})
export class ComponentsSampleModule {
}
