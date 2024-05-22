import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatOptionModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {
    BlButtonModule,
    BlCalendarModule,
    BlDatepickerModule,
    BlDatepickerRangeModule,
    BlFabMenuModule,
    BlIconModule,
    BlMonthPickerModule,
    BlSplitButtonModule,
    BlTransverseMenuModule,
    BlVerticalMenuModule,
    BlYearPickerModule,
    TimeModule
} from '@esedit-md/shared-ui';
import {TranslateModule} from '@ngx-translate/core';
import {BlCalendarSampleComponent} from './bl-calendar-sample/bl-calendar-sample.component';
import {BlDatepickerRangeSampleComponent} from './bl-datepicker-range-sample/bl-datepicker-range-sample.component';
import {BlDatepickerSampleComponent} from './bl-datepicker-sample/bl-datepicker-sample.component';
import {BlMonthPickerSampleComponent} from './bl-month-picker-sample/bl-month-picker-sample.component';
import {BlTimeSampleComponent} from './bl-time-sample/bl-time-sample.component';
import {BlYearpickerSampleComponent} from './bl-year-picker-sample/bl-year-picker-sample.component';

const SAMPLE_COMPONENTS = [
    BlCalendarSampleComponent,
    BlDatepickerSampleComponent,
    BlDatepickerRangeSampleComponent,
    BlMonthPickerSampleComponent,
    BlYearpickerSampleComponent,
    BlTimeSampleComponent
];

@NgModule({
    declarations: [SAMPLE_COMPONENTS],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        BlButtonModule,
        BlSplitButtonModule,
        BlTransverseMenuModule,
        BlFabMenuModule,
        BlVerticalMenuModule,
        MatCardModule,
        BlIconModule,
        BlYearPickerModule,
        BlMonthPickerModule,
        MatFormFieldModule,
        TimeModule,
        BlYearPickerModule,
        BlDatepickerModule,
        MatOptionModule,
        BlDatepickerRangeModule,
        BlCalendarModule,
        MatSelectModule,

    ],
    exports: [SAMPLE_COMPONENTS],
    providers: [],
})
export class DateTimeSampleModule {
}
