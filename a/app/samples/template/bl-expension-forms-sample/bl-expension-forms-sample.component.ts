import {Location} from '@angular/common';
import {AfterViewInit, Component, OnInit, ViewChild,} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn,} from '@angular/forms';
import {LayoutService} from '@bl/bl-app-layout';
import {ToasterService} from '@bl/shared';
import {BlConfirmMessage, BlDialogService, FormErrorDisplayComponent, IconClassEnum, IconInfos, PanelTitle,} from '@esedit-md/shared-ui';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {SampleAbstractComponent} from '../../SampleAbstractComponent';
import { I } from '@angular/cdk/keycodes';

type BlLibelleFormGroup = {
    label1: string | null;
    label2: string | null;
    label3: string | null;
    label4: string | null;
    label5: string | null;
    label6: string | null;
    label7: string | null;
    checkbox1: boolean | null;
    checkbox2: boolean | null;
};

@Component({
    selector: 'bl-expension-forms-sample',
    templateUrl: 'bl-expension-forms-sample.component.html',
})
export class BlExpensionFormsSampleComponent
    extends SampleAbstractComponent<BlLibelleFormGroup>
    implements OnInit, AfterViewInit {
    public customErrorsMap = new Map<string, string>();
    public pageIcon: IconClassEnum = IconClassEnum.pencil;
    public iconsHeader : IconInfos[];
    
    @ViewChild(FormErrorDisplayComponent, {static: true})
    formErrorDisplay: FormErrorDisplayComponent;

    panelTitles: PanelTitle[] = [
        {name : 'Ajouter une variable',icon : null },
        {name : 'Attribuer une famille',icon : null },
        {name : 'Cadre statutaire',icon : null },
        {name : 'Modification du journal',icon : null }
    ];

    constructor(
        private toastr: ToastrService,
        private blDialogService: BlDialogService,
        private fb: FormBuilder,
        private ts: ToasterService,
        public layout: LayoutService,
        private translate: TranslateService,
        private location: Location
    ) {
        super();
    }

    ngAfterViewInit() {
        this.formGroup.controls.label7.addValidators(
            this.specificFormat(this.formGroup.controls.label7)
        );
        this.formGroup.controls.label7.addValidators(
            this.specificFormat2(this.formGroup.controls.label7)
        );
    }

    public ngOnInit(): void {
        this.formGroup = new FormGroup({
            label1: new FormControl<string | null>('Test 1'),
            label2: new FormControl<string | null>('Test 2'),
            label3: new FormControl<string | null>('Test 3'),
            label4: new FormControl<string | null>('Test 4'),
            label5: new FormControl<string | null>('Test 5'),
            label6: new FormControl<string | null>('Test 6'),
            label7: new FormControl<string | null>('Test 7'),
            checkbox1: new FormControl<boolean | null>(true),
            checkbox2: new FormControl<boolean | null>(false),
        });
        this.customErrorsMap.set('required', 'form.error.required');
        this.customErrorsMap.set('mina', 'bl-decimal.error.badformat');
        this.customErrorsMap.set('minc', 'form.error.libelle.size.too.long');

        let icon1 = {
            class: IconClassEnum.file_plus,
            size: 2,
            color: '#ff9800',
            testLabel: 'icon-home'

        }
        let icon2 = {
            class: IconClassEnum.users,
            size: 2,
            color: '#2196f3',
            testLabel: 'icon-home'
        }
        let icon3 = {
            class: IconClassEnum.pencil_light,
            size: 2,
            color: '#009688',
            testLabel: 'icon-home'

        }
        let icon4 = {
            class: IconClassEnum.clock,
            size: 2,
            color: '#e91e63',
            testLabel: 'icon-home'
        }
        this.iconsHeader = [
            icon1, icon2, icon3, icon4
        ];
    }

    public onSubmitForm() {
        if (this.formGroup.invalid) {
            this.ts.error('Formulaire invalide !');
            // accessibility
            setTimeout(() => {
                this.formErrorDisplay.focus();
            }, 500);
        }
        if (this.formGroup.valid) {
            this.toastr.success(this.translate.instant('viewer.form.valid'));
            const confirm: BlConfirmMessage = {
                title: 'viewer.form.dialog.text',
                closeButtonTxt: 'viewer.form.dialog.close',
                yesButtonTxt: 'viewer.form.dialog.ok',
                iconType: 'success',
                text: JSON.stringify(this.formGroup.value),
            };

            this.blDialogService.openConfirmDialog(confirm, null);

        }
    }

    public cancelAction() {
        this.formGroup.reset();

        this.ts.warning('Formulaire vidé !');
    }

    public getToPreviousPage() {
        // go back to the previouse page
        this.location.back();
    }

    private specificFormat(formControl: FormControl | undefined): ValidatorFn {
        return (): ValidationErrors | null => {
            if (formControl && formControl.value) {
                const textValue: string | null = this.formGroup.controls.label7.value;
                if (textValue?.includes('a')) {
                    return {mina: true};
                }
            }
            return null;
        };
    }

    private specificFormat2(formControl: FormControl | undefined): ValidatorFn {
        return (): ValidationErrors | null => {
            if (formControl && formControl.value) {
                const textValue: string | null = this.formGroup.controls.label7.value;
                if (textValue?.includes('c')) {
                    return {minc: true};
                }
            }
            return null;
        };
    }
}
