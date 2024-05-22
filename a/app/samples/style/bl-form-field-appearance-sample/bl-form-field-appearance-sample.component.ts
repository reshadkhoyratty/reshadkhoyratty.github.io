import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatFormFieldAppearance} from '@angular/material/form-field';
import {BlBasicObject, BlListBoxComponent} from '@esedit-md/shared-ui';
import {SampleAbstractComponent} from '../../SampleAbstractComponent';

type BlMatformFieldFormGroup = {
    style: BlBasicObject | null,
    period: string | null,
    autocomplete: BlBasicObject | null

}

@Component({
    selector: 'bl-form-field-appearance-sample',
    templateUrl: 'bl-form-field-appearance-sample.component.html',
})
export class BlFormFieldAppearanceSampleComponent extends SampleAbstractComponent<BlMatformFieldFormGroup> implements OnInit {
    public lstAppearance: BlBasicObject[] = [];
    public appearanceSelected = 'fill' as MatFormFieldAppearance;
    @ViewChild(BlListBoxComponent) smListboxComponent: BlListBoxComponent;
    public lst: BlBasicObject[] = [];

    public ngOnInit(): void {
        this.lstAppearance.push({
            id: 1,
            label: 'fill'
        });

        for (let i = 0; i < 20; i++) {
            this.lst.push({id: i, label: 'Option ' + i});
        }
        this.formGroup = new FormGroup<any>({
            style: new FormControl<BlBasicObject | null>(this.lstAppearance[0]),
            period: new FormControl<string | null>(null),
            autocomplete: new FormControl<BlBasicObject | null>(null)
        });

    }

    public changeStyle(): void {
        this.appearanceSelected = 'fill';
        if (this.formGroup.controls['style'].value?.label) {
            this.appearanceSelected = this.formGroup.controls['style'].value.label as MatFormFieldAppearance;
        }
    }

    addOutline() {
        this.lstAppearance.push({
            id: 2,
            label: 'outline'
        });
    }
}
