import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToasterService } from '@bl/shared';
import { FileInfo, MultiAttachmentValidators } from '@esedit-md/shared-ui';
import { SampleAbstractComponent, SampleFormGroup } from '../../SampleAbstractComponent';
import { FileOrFileInfo } from '../../../../../../../libs/shared-ui/src/lib/components/basic/bl-multi-attachment/file-or-fileInfo-type';

type BLFileFormGroupe = {
  attachmentsList: FileOrFileInfo[] | null,
}
@Component({
  selector: 'bl-multi-attachment-sample',
  templateUrl: './bl-multi-attachment-sample.component.html',
  styleUrls: ['./bl-multi-attachment-sample.component.scss'],
})
export class BlMultiAttachmentSampleComponent implements SampleAbstractComponent<BLFileFormGroupe>, OnInit {

  constructor(private fb: UntypedFormBuilder,
              private toasterService: ToasterService) {

  }
  public formGroup: SampleFormGroup<BLFileFormGroupe>;
  public formGroupReadOnly :  SampleFormGroup<BLFileFormGroupe>;
  public formGroup2 :  SampleFormGroup<BLFileFormGroupe>;

  filesList : FileOrFileInfo[] = [];

  ngOnInit(): void {
    // define your list of files

    this.filesList.push(new FileInfo('file1.pdf', 250 * 1024, new Date(), ''))
    this.filesList.push(new FileInfo('file2.pdf', 250 * 1024, new Date(), ''))

   this.formGroupReadOnly = new FormGroup({
    attachmentsList: new FormControl<FileOrFileInfo[] | null>(this.filesList),
  });

    this.formGroup = new FormGroup({
      attachmentsList: new FormControl<FileOrFileInfo[] | null>(null),
    });

    this.formGroup2 = this.fb.group({
      attachmentsList: [null, [
        Validators.required,
        MultiAttachmentValidators.acceptExtension(['pdf','png']),
        MultiAttachmentValidators.nbFilesAllowed(2)]]
    });
  }


  onSubmitMultiList() {
  if (this.formGroup.valid) {
    let filesList : FileOrFileInfo []= this.formGroup.value.attachmentsList!;

      if(filesList && filesList!=null && filesList.length != 0 ){
        filesList.map((file : FileOrFileInfo) =>{
        if(file != null){
          if(typeof file != 'string'){
          return file.name;
          }
        }
        return '';
        });
        this.validateSuccess(filesList);
      }else{
    this.toasterService.error('Veuillez choisir un document');
    }
  }else{
    this.toasterService.error('Formulaire non valid');
  }
}

  validateSuccess(filesList: FileOrFileInfo[]) {
    let filesNames : string []= [] ;
    filesList.forEach((element : FileOrFileInfo) => {
      if(typeof element != 'string' ){
        filesNames.push(element!.name);
      }
    });
    this.toasterService.success('Fichier(s) ajouté(s) : '.concat(String(filesNames)));
  }

/**
 *
 * @param s : size in octets
 * @returns : size in Mo as string
 */
  sizeMo(s: number): string {
    return `(${Math.round((s / 1024 / 1024 + Number.EPSILON) * 100) / 100} Mo)`;
  }

  /**
   * open the selected file in new window
   * @param obj : File | FileInfo | string | null
   * @returns
   */
  openFile(obj: any){

    let win: Window | null = null;
    if(obj instanceof Blob){

      win = this.openBlob(obj);
    }
    return win;
  }

  /**
   * open the file of type Blob on new window
   */
  private openBlob(blob: Blob, win: any = null): Window | null{
    const url = URL.createObjectURL(blob);
    if(win){
      win.location = `${url}`;
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
}
