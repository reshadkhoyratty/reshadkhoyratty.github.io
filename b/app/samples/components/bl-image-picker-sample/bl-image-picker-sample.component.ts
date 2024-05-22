import {Component, EventEmitter, OnInit} from '@angular/core';
import {ToasterService} from '@bl/shared';
import {BlDialogService, BlGenericDialogConfig, IconClassEnum} from '@esedit-md/shared-ui';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {BlImageModel} from '../../../../../../../libs/shared-ui/src/lib/models/bl-image-model';
import {BlImagePickerService} from '../../../../../../../libs/shared-ui/src/lib/services/bl-image-picker.service';
import {BlImagePickerDialogComponent} from './bl-image-picker-dialog/bl-image-picker-dialog.component';

@Component(
    {
        selector:'bl-image-picker-sample',
        templateUrl:'./bl-image-picker-sample.component.html',
        styleUrls:['./bl-image-picker-sample.component.scss']
    }
)

export class BlImagePickerSampleComponent implements OnInit{

    selectedImage$: Observable<BlImageModel>;

    imagesList: BlImageModel[] = [
        {
            title: "blue-sea",
            src: "assets/img/image-picker/blue-sea.png",
            description: "exemple avec description : mer bleue"
        },
        {
            title: "bike",
            src: "assets/img/image-picker/bike-sunset.png"
        },
        {
            title: "bulldog",
            src: "assets/img/image-picker/bulldog.png"
        },
        {
            title: "calanque",
            src: "assets/img/image-picker/calanque.png"
        },
        {
            title: "daisies",
            src: "assets/img/image-picker/daisies.png"
        },
        {
            title: "dunes",
            src: "assets/img/image-picker/dunes.png"
        },
        {
            title: "french-flag",
            src: "assets/img/image-picker/french-flag.png"
        },
        {
            title: "green-butterfly",
            src: "assets/img/image-picker/green-butterfly.png"
        },
        {
            title: "heart-shaped-leaves",
            src: "assets/img/image-picker/heart-shaped-leaves.png"
        },
        {
            title: "lake-sunset",
            src: "assets/img/image-picker/lake-sunset.png"
        },
        {
            title: "little-golden-retriever",
            src: "assets/img/image-picker/little-golden-retriever.png"
        },
        {
            title: "milky-way",
            src: "assets/img/image-picker/milky-way.png"
        },
        {
            title: "mountain-clouds",
            src: "assets/img/image-picker/mountain-clouds.png"
        },
        {
            title: "mountain-landscape",
            src: "assets/img/image-picker/mountain-landscape.png"
        },
        {
            title: "orange-pink-flowers",
            src: "assets/img/image-picker/orange-pink-flowers.png"
        },
        {
            title: "red-butterfly",
            src: "assets/img/image-picker/red-butterfly.png"
        },
        {
            title: "red-cat",
            src: "assets/img/image-picker/red-cat.png"
        },
        {
            title: "surf-waves",
            src: "assets/img/image-picker/surf-waves.png"
        },
        {
            title: "umbrellas",
            src: "assets/img/image-picker/umbrellas.png"
        },
        {
            title: "white-black-cat",
            src: "assets/img/image-picker/white-black-cat.png"
        }
    ];

    constructor(
        private blDialogService: BlDialogService,
        private blImagePickerService: BlImagePickerService,
        private toasterService: ToasterService,
        private translateService: TranslateService,
    ) {
    }

    ngOnInit() {
        this.getSelectedImage()
    }

    getSelectedImage(){
        this.selectedImage$ = this.blImagePickerService.selectedImage;
    }

    openImagePickerGenericDialog(list: BlImageModel[]) {
        const dialogConfig: BlGenericDialogConfig = {
            data: list,
            title: this.translateService.instant('pages.variables.image-picker.dialog-title'),
            yesButtonTxt: {
                titleButton: 'bl-dialog.saveButtonTxt',
                icon: IconClassEnum.save_fill
            },
            cancelButtonTxt: {
                titleButton: 'bl-dialog.cancelButtonTxt',
                icon: IconClassEnum.rollback_fill
            },
            closeButtonTxt: {titleButton: 'bl-dialog.closeButtonTxt'},
            isButtonWithIcon: true,
            testLabel: "imagePickerDialog"
        }
        const responseEvent = new EventEmitter();
        responseEvent.subscribe((resp) => {
            if (resp === 'yes') {
                this.getSelectedImage();
                this.toasterService.success('bl-image-picker-snackbar-success');
            }
            if (resp === 'cancel' || resp === 'close')
                this.toasterService.warning("bl-image-picker-snackbar-cancel");
        });
        this.blDialogService.openGenericDialog(BlImagePickerDialogComponent, dialogConfig, responseEvent);
    }

}
