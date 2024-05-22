import {Component, EventEmitter} from '@angular/core';
import {ToasterService} from '@bl/shared';
import {BlDialogService, ConfirmDialogConfigModel, IconClassEnum, WaitDialogConfigModel} from '@esedit-md/shared-ui';
import {TranslateService} from '@ngx-translate/core';
import {timer} from 'rxjs';

@Component({
    selector: 'bl-dialog-sample',
    templateUrl: './bl-dialog-sample.component.html',
})
export class BlDialogSampleComponent {
    isButtonWithIcon: boolean = false;
    // Exemple d'utilisation : Message spécifique métier
    private isCustomized: boolean = true;

    constructor(
        private blDialogService: BlDialogService,
        public translate: TranslateService,
        private toasterService: ToasterService
    ) {
    }

    // Exemple d'utilisation : Message d'action réussie
    openSuccessDialog() {
        const successEvent = new EventEmitter();
        successEvent.subscribe((resp) =>
            this.toasterService.success('successEvent '.concat(resp.data))
        );
        const closeEvent = new EventEmitter();
        closeEvent.subscribe((resp) =>
            this.toasterService.success('closeEvent '.concat(resp.data))
        );
        this.blDialogService.openSuccessDialog(
            {data: 'Success'},
            'sample.dialog.success.title',
            'sample.dialog.success.text',
            successEvent,
            closeEvent,
            'MyDialogSuccessTestLabel',
            this.isButtonWithIcon
        );
    }

    // Exemple d'utilisation : Message d'erreur Client
    openErrorDialog() {
        const errorEvent = new EventEmitter();
        errorEvent.subscribe((resp) =>
            this.toasterService.success('errorEvent '.concat(resp.data))
        );
        const closeEvent = new EventEmitter();
        closeEvent.subscribe((resp) =>
            this.toasterService.success('closeEvent '.concat(resp.data))
        );
        this.blDialogService.openErrorDialog(
            {data: 'Error'},
            'sample.dialog.error.title',
            'sample.dialog.error.text',
            errorEvent,
            closeEvent,
            '',
            this.isButtonWithIcon
        );
    }

    // Exemple d'utilisation : Message d'erreur Serveur
    openTechnicalErrorDialog() {
        const technicalErrorEvent = new EventEmitter();
        technicalErrorEvent.subscribe((resp) =>
            this.toasterService.success('technicalErrorEvent '.concat(resp.data))
        );
        const closeEvent = new EventEmitter();
        closeEvent.subscribe((resp) =>
            this.toasterService.success('closeEvent '.concat(resp.data))
        );
        this.blDialogService.openTechnicalErrorDialog(
            {data: 'Technical Error'},
            'sample.dialog.technicalError.title',
            'sample.dialog.technicalError.text',
            technicalErrorEvent,
            closeEvent,
            '',
            this.isButtonWithIcon
        );
    }

    // Exemple d'utilisation : Message de confirmation de sauvegarde
    openSaveDialog() {
        const saveEvent = new EventEmitter();
        saveEvent.subscribe((resp) =>
            this.toasterService.success('saveEvent '.concat(resp.data))
        );
        const notSaveEvent = new EventEmitter();
        notSaveEvent.subscribe((resp) =>
            this.toasterService.success('notSaveEvent '.concat(resp.data))
        );
        const cancelEvent = new EventEmitter();
        cancelEvent.subscribe((resp) =>
            this.toasterService.success('cancelEvent '.concat(resp.data))
        );
        const closeEvent = new EventEmitter();
        closeEvent.subscribe((resp) =>
            this.toasterService.success('closeEvent '.concat(resp.data))
        );
        this.blDialogService.openSaveDialog(
            {data: 'Save'},
            'sample.dialog.save.title',
            saveEvent,
            notSaveEvent,
            cancelEvent,
            closeEvent,
            '',
            this.isButtonWithIcon
        );
    }

    openSaveDialogBloc() {
        const saveEvent = new EventEmitter();
        saveEvent.subscribe((resp) => {
                this.toasterService.success('saveEvent '.concat(resp.data));
                timer(5000).subscribe(() => this.blDialogService.closeDialog());
            }
        );
        const notSaveEvent = new EventEmitter();
        notSaveEvent.subscribe((resp) => {
                this.toasterService.success('notSaveEvent '.concat(resp.data));
                timer(950).subscribe(() => this.blDialogService.closeDialog());
            }
        );
        const cancelEvent = new EventEmitter();
        cancelEvent.subscribe((resp) =>
            this.toasterService.success('cancelEvent '.concat(resp.data))
        );
        const closeEvent = new EventEmitter();
        closeEvent.subscribe((resp) =>
            this.toasterService.success('closeEvent '.concat(resp.data))
        );
        this.blDialogService.openSaveDialog(
            {data: 'Save'},
            'sample.dialog.save.title',
            saveEvent,
            notSaveEvent,
            cancelEvent,
            closeEvent,
            '',
            this.isButtonWithIcon,
            new WaitDialogConfigModel('sample.dialog.wait.title', 'sample.dialog.wait.text', 1000)
        );
    }

    // Exemple d'utilisation : Message de confirmation de suppression
    openDeleteDialog() {
        const deleteEvent = new EventEmitter();
        deleteEvent.subscribe((resp) =>
            this.toasterService.success('deleteEvent '.concat(resp.data))
        );
        const cancelEvent = new EventEmitter();
        cancelEvent.subscribe((resp) =>
            this.toasterService.success('cancelEvent '.concat(resp.data))
        );
        const closeEvent = new EventEmitter();
        closeEvent.subscribe((resp) =>
            this.toasterService.success('closeEvent '.concat(resp.data))
        );
        this.blDialogService.openDeleteDialog(
            {data: 'Delete'},
            'sample.dialog.delete.title',
            deleteEvent,
            cancelEvent,
            closeEvent,
            '',
            this.isButtonWithIcon
        );
    }

    openInfoDialog(){
        const rollbackEvent  = new EventEmitter();
        rollbackEvent.subscribe((resp) =>
            this.toasterService.success('pages.basic.tableEditable2.dialog.rollback')
        );
        const resetEvent = new EventEmitter();
        resetEvent.subscribe((resp) => {
                this.toasterService.warning('pages.basic.tableEditable2.dialog.unsave');
            }
        );
        const closeEvent = new EventEmitter();
        closeEvent.subscribe((resp) =>
            this.toasterService.success('closeEvent ')
        );
        this.blDialogService.openInfoDialog(
            null,
            'pages.basic.tableEditable2.dialog.form-uncompleted',
            'pages.basic.tableEditable2.dialog.rollback',
            'pages.basic.tableEditable2.dialog.unsave',
            rollbackEvent,
            resetEvent,
            closeEvent,
            'save_list_confirm_dialog',
            false
        );
    }
    openCustomDialog(timeoutBlockerMs?: number) {
        const yesEvent = new EventEmitter();
        yesEvent.subscribe((resp) => {
                this.toasterService.success('yesEvent '.concat(resp.data));
                if (timeoutBlockerMs) timer(5000).subscribe(() => this.blDialogService.closeDialog());
            }
        );
        const noEvent = new EventEmitter();
        noEvent.subscribe((resp) => {
                this.toasterService.success('noEvent '.concat(resp.data));
                if (timeoutBlockerMs) timer(950).subscribe(() => this.blDialogService.closeDialog());
            }
        );
        const cancelEvent = new EventEmitter();
        cancelEvent.subscribe((resp) =>
            this.toasterService.success('cancelEvent '.concat(resp.data))
        );
        const closeEvent = new EventEmitter();
        closeEvent.subscribe((resp) =>
            this.toasterService.success('closeEvent '.concat(resp.data))
        );
        const data = {data: 'Custom'};

        const confirmDialogConfig: ConfirmDialogConfigModel = {
            imgUrl: IconClassEnum.note_pencil,
            iconColor: '#5BB351',
            iconAddCircle: true,
            title: this.translate.instant('sample.dialog.custom.title', data),
            text: this.translate.instant('sample.dialog.custom.text', data),
            isButtonWithIcon: this.isButtonWithIcon,
            yesButtonTxt: {
                titleButton: this.translate.instant('sample.dialog.custom.yesButtonTxt'),
                icon: IconClassEnum.check
            },
            noButtonTxt: {
                titleButton: this.translate.instant('sample.dialog.custom.noButtonTxt'),
                icon: IconClassEnum.close
            },
            cancelButtonTxt: {
                titleButton: this.translate.instant('sample.dialog.custom.cancelButtonTxt'),
                icon: IconClassEnum.rollback
            },
            isCustomized: true,
            closeButtonTxt: this.translate.instant(
                'sample.dialog.custom.closeButtonTxt'
            ),
            yesEvent: yesEvent,
            noEvent: noEvent,
            waitDialogConfig: new WaitDialogConfigModel('sample.dialog.wait.title', 'sample.dialog.wait.text', timeoutBlockerMs),
        };

        this.blDialogService.openCustomDialog(
            data,
            confirmDialogConfig,
            yesEvent,
            noEvent,
            cancelEvent,
            closeEvent,
            this.isCustomized
        );
    }
}
