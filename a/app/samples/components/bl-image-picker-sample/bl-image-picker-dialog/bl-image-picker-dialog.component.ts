import {Component, OnInit, ViewChild} from '@angular/core';
import {BlGenericDialogComponent, IconClassEnum} from '@esedit-md/shared-ui';
import {BlImageModel} from '../../../../../../../../libs/shared-ui/src/lib/models/bl-image-model';
import {BlImagePickerService} from '../../../../../../../../libs/shared-ui/src/lib/services/bl-image-picker.service';

@Component(
    {
        selector:'bl-image-picker-dialog',
        templateUrl:'./bl-image-picker-dialog.component.html'
    /*
     <bl-generic-dialog #imagePickerDialog
        (yesEvent)="event('yes')"
        (cancelEvent)="event('cancel')">
        <div bl-generic-dialog__content>
            <h4 class="bl-zt-h4">{{'sample.image-picker.dialog-sub-title' | translate}}</h4>
            <bl-image-picker [imagesList]="imagesList"
                              [selectedImage]="selectedImage"
                              (selectImage)="selectImage($event)"></bl-image-picker>
        </div>
     </bl-generic-dialog>
     */
    }
)

export class BlImagePickerDialogComponent implements OnInit{

    @ViewChild('imagePickerDialog', {static: true}) imagePickerDialog: BlGenericDialogComponent

    imagesList:BlImageModel[];
    selectedImage: BlImageModel;

    protected readonly IconClassEnum = IconClassEnum;

    constructor(
        private blImagePickerService: BlImagePickerService,
    ) {
    }

    ngOnInit() {
        this.imagesList = this.imagePickerDialog.dialogConfig.data;
        this.selectedImage = this.blImagePickerService.selectedImage.getValue();
    }

    selectImage(image: BlImageModel){
        this.selectedImage = image;
    }

    saveImageSelection(){
        this.blImagePickerService.setSelectedImage(this.selectedImage);
    }

    event(code: string) {
        if(code==='yes')
            this.saveImageSelection()
    }

}