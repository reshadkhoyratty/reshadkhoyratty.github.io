import {Component, ViewEncapsulation} from '@angular/core';
import {ToasterService} from '@bl/shared';
import {BlSnackbarService} from '../../../../../../../libs/shared-ui/src/lib/services/bl-snackbar.service';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'bl-snackbar-sample',
    templateUrl: './bl-snackbar-sample.component.html',
})
export class BlSnackbarSampleComponent {

    public accessibilityParam = false;
    public withAction = false;

    constructor(private snackBarService: BlSnackbarService, public toasterService: ToasterService) {
    }

    public openSuccessCustomSnackBar(message: string, accessibilityParam: boolean): void {
        if (accessibilityParam == false)
            this.snackBarService.openSuccessSnackBar(message, false, 'succesSnackBar');
        else
            this.snackBarService.openSuccessSnackBar(message, true, 'succesSnackBar_with_close_button');
    }

    public openWarningCustomSnackbar(message: string, accessibilityParam: boolean): void {
        if (accessibilityParam == false)
            this.snackBarService.openWarningSnackbar(message, false, 'warningSnackBar');
        else
            this.snackBarService.openWarningSnackbar(message, true, 'warningSnackBar_with_close_button');
    }

    public openErrorCustomSnackbar(message: string, accessibilityParam: boolean): void {
        if (accessibilityParam == false)
            this.snackBarService.openErrorSnackbar(message, false, 'errorSnackBar');
        else
            this.snackBarService.openErrorSnackbar(message, true, 'errorSnackBar_with_close_button');
    }



}
