import {FormControl, FormGroup} from '@angular/forms';

export type SampleFormGroup<T> = FormGroup<{
    [K in keyof T]: FormControl<T[K]>;
}>;

export abstract class SampleAbstractComponent<T> {

    public formGroup: SampleFormGroup<T>;

}
