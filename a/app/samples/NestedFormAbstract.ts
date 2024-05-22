import {FormControl, FormGroup} from '@angular/forms';
//  NOT WORKING YET - limitation angular 16
export type NestedFormGroup<T> = FormGroup<{
    [K in keyof T]: FormControl<T[K]>;
    //[K in keyof T]: FormGroup<{any:any;}>;
}>;

export abstract class NestedFormAbstractComponent<T> {

    public formGroup: NestedFormGroup<T>;

}

