import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToasterService} from '@bl/shared';
import {BlTableConfig} from '@esedit-md/shared-ui';
import {TranslateService} from '@ngx-translate/core';
import {ClipboardService} from 'ngx-clipboard';

@Component({
    selector: 'bl-dialog-view-config',
    templateUrl: 'bl-dialog-view-config.component.html',
    styleUrls: ['bl-dialog-view-config.component.scss']
})
export class BlDialogViewConfigComponent {
    public config: BlTableConfig;

    constructor(
        public dialogRef: MatDialogRef<BlDialogViewConfigComponent>,
        @Inject(MAT_DIALOG_DATA) public data: BlTableConfig,
        private clipboardApi: ClipboardService, protected toasterService: ToasterService, protected translateService: TranslateService
    ) {
        this.config = data;
    }

    public close(): void {
        this.dialogRef.close();
    }

    public copyConf(): void {
        this.clipboardApi.copy(JSON.stringify(this.config));
        this.toasterService.success(this.translateService.instant('sample.datatable.config.copied'))
    }
}
