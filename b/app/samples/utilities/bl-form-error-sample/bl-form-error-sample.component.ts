import {ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {LayoutService} from '@bl/bl-app-layout';
import {ToasterService} from '@bl/shared';
import { EditableTableColumn, FormErrorDisplayComponent } from '@esedit-md/shared-ui';

@Component({
  selector: 'bl-form-error-sample',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bl-form-error-sample.component.html'
})
export class BlFormErrorSampleComponent implements OnInit {
  @HostBinding('style.flex-grow') flexGrow = '1';
  @HostBinding('style.min-height') minHeight = '0';
  @HostBinding('style.min-width') minWidth = '0';
  @HostBinding('style.display') display = 'flex';

  public formLabels  = '';

  @ViewChild(FormErrorDisplayComponent, {static: true}) formErrorDisplay: FormErrorDisplayComponent;
  formGroup: UntypedFormGroup;
  cols: EditableTableColumn[];
  requiredName : string ;

  constructor(private fb: UntypedFormBuilder,
              public layout: LayoutService,
              private ts: ToasterService) {
  }

  ngOnInit(): void {
   this.formLabels = 'pages.basic.form-error.form.';
    this.formGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      table: [[]]
    });

    this.requiredName = "Le prénom est requis";
  }

  validForm() {
    Object.keys(this.formGroup.controls).forEach(controlName => {
      this.formGroup.controls[controlName].markAsTouched();
    });
    if (this.formGroup.invalid) {
      this.ts.error('Formulaire invalide');
      // accessibility
      setTimeout(() => {
        this.formErrorDisplay.focus();
      }, 500);
    } else {
      this.ts.success('Envoi du formulaire réussi !');
    }
  }

  warning() {
    this.ts.warning('Il y a eu un problème lors de l\'envoi du formulaire');
  }

  reset() {
    this.formGroup.reset();
  }
}
