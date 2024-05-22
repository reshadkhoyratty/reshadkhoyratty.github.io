import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import {
  BlButtonModule,
  BlCardModule,
  BlCheckboxModule,
  BlDatepickerModule,
  BlIconModule,
  BlListBoxModule,
  BlMultiCardTemplateModule,
  BlPageTemplateModule,
  BlTemplatePanelsFormsModule,
  BlTextFieldModule,
  EditableTable2Module,
  FormErrorModule,
  BlTableModule,
  BlFilterTablePanelModule,
  BlRadioComponentModule,
} from '@esedit-md/shared-ui';
import { TranslateModule } from '@ngx-translate/core';
import { CodeTabModule } from '../../util/code-tab/code-tab.module';
import { BlPageTemplateSampleComponent } from '../template/bl-page-template-sample/bl-page-template-sample.component';
import { MatDividerModule } from '@angular/material/divider';
import { BlComplexFormSampleComponent } from './bl-complex-form-sample/bl-complex-form-sample.component';
import { BlSimpleFormSampleComponent } from './bl-simple-form-sample/bl-simple-form-sample.component';
import { BlContentSelectorDirective } from 'libs/shared-ui/src/lib/directives/bl-content-selector.directive';
import { BlStepperModule } from 'libs/shared-ui/src/lib/components/style/bl-stepper/bl-stepper-module';
import { BlStepModule } from 'libs/shared-ui/src/lib/components/style/bl-stepper/bl-step/bl-step.module';
import { BlTabGroupFormSampleComponent } from './bl-tab-group-form-sample/bl-tab-group-form-sample.component';
import { BlTabGroupFormPageComponent } from '../../pages/template/bl-tab-group-form-page/bl-tab-group-form-page.component';
import { MatTabsModule } from '@angular/material/tabs';
import { BlTabGroupModule } from 'libs/shared-ui/src/lib/components/style/bl-tabs/bl-tab-group/bl-tab-group.module';
import { BlTemplateAccessibilitySampleComponent } from './bl-template-accessibility-sample/bl-template-accessibility-sample.component';
import { BlExpensionFormsSampleComponent } from './bl-expension-forms-sample/bl-expension-forms-sample.component';
import { BlFormSelectorDirective } from '../../../../../../libs/shared-ui/src/lib/directives/bl-form-selector.directive';
import { BlEditableListTemplateSampleComponent } from './bl-editable-list-template-sample/bl-editable-list-template-sample.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BlErrorModule } from 'libs/shared-ui/src/lib/components/basic/bl-error/bl-error.module';
import { BlTemplateTableSampleComponent } from './bl-template-table-sample/bl-template-table-sample.component';
import {AppLayoutModule} from "@bl/bl-app-layout";
import { BlTableWithFilterUpTemplateSampleComponent } from '../components/tables-samples/bl-table-with-filter-up-template-sample/bl-table-with-filter-up-template-sample.component';
import {BlStepperFormSampleComponent} from "./bl-stepper-form-sample/bl-stepper-form-sample.component";

const TEMP_COMPONENTS = [
  BlPageTemplateSampleComponent,
  BlComplexFormSampleComponent,
  BlSimpleFormSampleComponent,
  BlTabGroupFormSampleComponent,
  BlTemplateAccessibilitySampleComponent,
  BlEditableListTemplateSampleComponent,
  BlExpensionFormsSampleComponent,
  BlTemplateTableSampleComponent,
  BlStepperFormSampleComponent,
  BlTableWithFilterUpTemplateSampleComponent
];

@NgModule({
  declarations: [
    TEMP_COMPONENTS,
    BlTabGroupFormSampleComponent,
    BlTabGroupFormPageComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    BlContentSelectorDirective,
    BlPageTemplateModule,
    BlMultiCardTemplateModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    MatCardModule,
    BlIconModule,
    BlDatepickerModule,
    BlCheckboxModule,
    MatRadioModule,
    MatDividerModule,
    MatTabsModule,
    FormErrorModule,
    BlTextFieldModule,
    BlListBoxModule,
    BlButtonModule,
    BlCardModule,
    CodeTabModule,
    BlCardModule,
    BlTabGroupModule,
    BlTemplatePanelsFormsModule,
    BlFormSelectorDirective,
    BlPageTemplateModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    EditableTable2Module,
    MatTooltipModule,
    BlStepModule,
    BlStepperModule,
    BlErrorModule,
    BlTableModule,
    AppLayoutModule,
    AppLayoutModule,
    BlTableModule,
    BlFilterTablePanelModule,
    BlRadioComponentModule,
  ],
  exports: [TEMP_COMPONENTS],
})
export class BlTemplateSampleModule {}
