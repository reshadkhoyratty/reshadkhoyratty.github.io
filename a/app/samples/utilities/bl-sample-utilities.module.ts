import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { AppLayoutModule } from '@bl/bl-app-layout';
import {
  BlAttachmentModule,
  BlAutocompleteModule,
  BlButtonModule,
  BlCalendarModule,
  BlDashboardListModule,
  BlDatepickerModule,
  BlElementsDirectiveModule,
  BlGaugeModule,
  BlGenericDialogModule,
  BlIconModule,
  BlIconPickerModule,
  BlImageWithContentModule,
  BlListBoxModule,
  BlMonthPickerModule,
  BlMultiComboModule, BlNotificationModule,
  BlRadioComponentModule,
  BlSearchModule,
  BlShortcutModule,
  BlSlideToggleComponentModule,
  BlTaskModule,
  BlTextFieldDecimalModule,
  BlTextFieldFractionModule,
  BlTextFieldModule, BlVerticalMenuModule,
  BlYearPickerModule,
  ConfirmDialog2Module,
  EditableTable2Module,
  EditableTableModule,
  FormErrorModule,
  HorizontalGaugeModule,
  SelectSearchModule,
  SharedUiModule,
  TimeModule,
} from '@esedit-md/shared-ui';
import { TranslateModule } from '@ngx-translate/core';
import { BlCardModule } from '../../../../../../libs/shared-ui/src/lib/components/basic/bl-card/bl-card.module';
import { BlErrorModule } from '../../../../../../libs/shared-ui/src/lib/components/basic/bl-error/bl-error.module';
import { HighlightModule } from 'ngx-highlightjs';
import { BlMultiGroupSearchAbstractModule } from '../../../../../../libs/shared-ui/src/lib/components/abstract/bl-multi-group-search-abstract/bl-multi-group-search-abstract.module';
import { BlActionBannerModule } from '../../../../../../libs/shared-ui/src/lib/components/basic/bl-action-banner/bl-action-banner.module';
import { BlCheckboxModule } from '../../../../../../libs/shared-ui/src/lib/components/basic/bl-checkbox/bl-checkbox.module';
import { BlColorCirclesModule } from '../../../../../../libs/shared-ui/src/lib/components/basic/bl-color-circles/bl-color-circles.modules';
import { BlColorPickerModule } from '../../../../../../libs/shared-ui/src/lib/components/basic/bl-color-picker/bl-color-picker.module';
import { BlCounterModule } from '../../../../../../libs/shared-ui/src/lib/components/basic/bl-counter/bl-counter.module';
import { BlDatepickerRangeModule } from '../../../../../../libs/shared-ui/src/lib/components/basic/bl-datepicker-range/bl-datepicker-range.module';
import { BlCarteExpensionPanelModule as BlCardExpensionPanelModule } from '../../../../../../libs/shared-ui/src/lib/components/basic/bl-expension-panel/bl-expension-panel.module';
import { BlImagePickerModule } from '../../../../../../libs/shared-ui/src/lib/components/basic/bl-image-picker/bl-image-picker.module';
import { BlStickyHeaderModule } from '../../../../../../libs/shared-ui/src/lib/components/basic/bl-sticky-header/bl-sticky-header.module';
import { BlTextAreaModule } from '../../../../../../libs/shared-ui/src/lib/components/basic/bl-text-area/bl-text-area.module';
import { BlWorkflowModule } from '../../../../../../libs/shared-ui/src/lib/components/basic/bl-workflow/bl-workflow.module';
import { BlMultiGroupSearchModule } from '../../../../../../libs/shared-ui/src/lib/components/basic/list/bl-multi-group-search/bl-multi-group-search.module';
import { BlSplitButtonModule } from '../../../../../../libs/shared-ui/src/lib/components/style/bl-split-button/bl-split-button.module';
import { CodeTabModule } from '../../util/code-tab/code-tab.module';
import { BlNotificationSampleComponent } from './bl-notification-sample/bl-notification-sample.component';
import { BlActionBannerSampleComponent } from '../components/bl-action-banner-sample/bl-action-banner-sample.component';
import { BlChipsModule } from '../../../../../../libs/shared-ui/src/lib/components/basic/bl-chips/bl-chips.module';
import { BlCloseAlertSampleComponent } from './bl-close-alert-sample/bl-close-alert-sample.component';
import { BlDashboardListSampleComponent } from './bl-dashboard-list-sample/bl-dashboard-list-sample.component';
import { BlFormErrorSampleComponent } from './bl-form-error-sample/bl-form-error-sample.component';
import { BlStickyHeaderSampleComponent } from './bl-sticky-header-sample/bl-sticky-header-sample.component';
import { BlNotificationModalSampleComponent } from './bl-notification-modal-sample/bl-notification-modal-sample.component';
import {
    BlNotificationModalModule
} from "../../../../../../libs/shared-ui/src/lib/components/basic/bl-notification-modal/bl-notification-modal.module";

const SAMPLE_COMPONENTS = [
  BlActionBannerSampleComponent,
  BlCloseAlertSampleComponent,
  BlFormErrorSampleComponent,
  BlNotificationSampleComponent,
  BlStickyHeaderSampleComponent,
  BlDashboardListSampleComponent,
  BlNotificationModalSampleComponent
];

@NgModule({
  declarations: [SAMPLE_COMPONENTS],
    imports: [
        CommonModule,
        CodeTabModule,
        BlMonthPickerModule,
        BlSearchModule,
        BlMultiGroupSearchAbstractModule,
        BlListBoxModule,
        BlMultiComboModule,
        BlAutocompleteModule,
        BlTextFieldModule,
        BlTextFieldFractionModule,
        BlTextFieldDecimalModule,
        BlDatepickerModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        BlCalendarModule,
        ReactiveFormsModule,
        TranslateModule,
        BlYearPickerModule,
        ConfirmDialog2Module,
        BlGenericDialogModule,
        BlButtonModule,
        EditableTableModule,
        FormErrorModule,
        BlAttachmentModule,
        HorizontalGaugeModule,
        SelectSearchModule,
        BlMultiGroupSearchModule,
        TimeModule,
        BlIconModule,
        MatCheckboxModule,
        FormsModule,
        BlGaugeModule,
        MatCardModule,
        MatDividerModule,
        SharedUiModule,
        MatSnackBarModule,
        BlTextAreaModule,
        BlElementsDirectiveModule,
        MatCardModule,
        MatTabsModule,
        HighlightModule,
        EditableTable2Module,
        MatDatepickerModule,
        BlCardModule,
        BlShortcutModule,
        MatDatepickerModule,
        BlCardExpensionPanelModule,
        BlActionBannerModule,
        BlSplitButtonModule,
        AppLayoutModule,
        TimeModule,
        BlIconModule,
        HorizontalGaugeModule,
        BlActionBannerModule,
        BlCheckboxModule,
        BlSlideToggleComponentModule,
        BlRadioComponentModule,
        BlWorkflowModule,
        BlCounterModule,
        BlTaskModule,
        BlDatepickerRangeModule,
        BlChipsModule,
        BlErrorModule,
        BlStickyHeaderModule,
        BlDashboardListModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        BlIconPickerModule,
        BlColorPickerModule,
        BlColorCirclesModule,
        BlNotificationModule,
        BlNotificationModalModule,
        BlVerticalMenuModule,
    ],
  exports: [SAMPLE_COMPONENTS],
})
export class BlSampleUtilitiesModule {}
