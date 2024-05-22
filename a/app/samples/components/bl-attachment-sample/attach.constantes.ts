export const declaration = `import { AttachmentModule } from '@bl/elements';

@NgModule({
    imports: [
        AttachmentModule
    ],
})`;

export const fullExampleTs = `export class AttachmentComponent {

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      fileCtrl: [null, [
        Validators.required,
        AttachmentValidators.maxSize(1024*500),
        AttachmentValidators.acceptExtension('pdf')]]
    });
  }

  onFileChange(e) {
    console.log(e);
  }
  
  /**
   * open the selected file in new window
   * @param obj : File | FileInfo | string | null
   * @returns 
   */
  openFile(obj: any): Window | null{
    let win: Window | null = null;
    if(obj instanceof Blob){
      win = this.openBlob(obj);
    }
     return win;
  }

  /**
   * open the file of type Blob on new window
   */
  openBlob(blob: Blob, win: any = null): Window | null{
    const url = URL.createObjectURL(blob);
    if(win){
      win.location = "`+"${url}"+`";
    }else {
      win = window.open(url, '_blank');
    }
    this.logIfWindowIsBlocked(win);
    return win;
  }

  /**
   * Logs if the specified has been blocked.
   * @param win
   */
  private logIfWindowIsBlocked(win: Window) {
    setTimeout(() => {
      if (win.closed) {
        console.log('new window/tab has been closed/blocked!');
      }
    }, 250);
  }

}`;
export const fullExampleTemplate = `<form [formGroup]="form">
  <mat-form-field>
    <bl-attachment #file
                   formControlName="fileCtrl"
                   [placeholder]="'Piece Jointe (pdf)'"
                   [accept]="'.pdf'">
    </bl-attachment>
    <bl-attachment-chooser matSuffix [for]="file" [removable]="true"></bl-attachment-chooser>
    <mat-error *ngIf="form.controls['fileCtrl'].hasError('required')">
      Le document est obligatoire
    </mat-error>
    <mat-error *ngIf="form.controls['fileCtrl'].hasError('maxSize')">
      La taille maximale du document est de 500 Ko
    </mat-error>
    <mat-error *ngIf="form.controls['fileCtrl'].hasError('acceptExtension')">
      Le fichier doit être au format PDF
    </mat-error>
  </mat-form-field>
  <button mat-raised-button>Submit</button>
</form>`;

export const fullExample2Ts = `export class AttachmentComponent {

  constructor(private fb: FormBuilder) {
  }

  form2: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.form2 = this.fb.group({
      fileCtrl2: [null, [
        Validators.required,
        AttachmentValidators.maxSize(1024 * 500),
        AttachmentValidators.acceptExtension('pdf')]]
    });
    this.form2.reset({fileCtrl2: new FileInfo('test.pdf', 250 * 1024,new Date(),'')});
  }

  sizeMo(s: number): string {
    return \`(\${Math.round(((s / 1024 / 1024) + Number.EPSILON) * 100) / 100} Mo)\`;
  }
}`;

export const readonlyExampleTemplate = `<mat-form-field>
    <bl-attachment [value]="readOnlyFile"
                      [accept]="'.pdf'"
                      (select)="openFile($event)">
    </bl-attachment>
</mat-form-field>`;

export const readonlyExampleTs = ` export class AttachmentComponent {
      readOnlyFile : FileInfo;

      constructor(private fb: UntypedFormBuilder) {
        // initialize a readOnly file 
        this.readOnlyFile = new FileInfo('test-file.pdf', 250 * 1024,new Date(),'');
      }
    }`
  ;

export const  fullExampleTemplate2 = `  <form [formGroup]="form2" class="d-flex flex-column align-items-center">
    <mat-form-field style="width: 250px; width: 75%" appearance="fill">
      <mat-label>Pièce Jointe (pdf)</mat-label>
      <bl-attachment #file2
                     formControlName="fileCtrl2"
                     [accept]="'.pdf'"
                     [convertSizeFunc]="sizeMo"
                     (change)="onFileChange($event)"
                     (select)="openFile($event)">
         </bl-attachment>
      </bl-attachment>
      <bl-attachment-chooser matSuffix [for]="file2" [removable]="true"></bl-attachment-chooser>
      <mat-error *ngIf="form.controls['fileCtrl'].hasError('required')">
        Le document est obligatoire
      </mat-error>
      <mat-error *ngIf="form.controls['fileCtrl'].hasError('maxSize')">
        La taille maximale du document est de 500 Ko
      </mat-error>
      <mat-error *ngIf="form.controls['fileCtrl'].hasError('acceptExtension')">
        Le fichier doit être au format PDF
      </mat-error>
    </mat-form-field>
    <button mat-raised-button>Submit</button>
  </form>`;