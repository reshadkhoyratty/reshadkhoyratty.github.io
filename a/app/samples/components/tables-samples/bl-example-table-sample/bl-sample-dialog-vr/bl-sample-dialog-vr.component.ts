import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'bl-sample-dialog-vr',
    templateUrl: './bl-sample-dialog-vr.component.html'
})
export class BlSampleDialogVrComponent {
    public data: any;

    constructor(private dialogRef: MatDialogRef<BlSampleDialogVrComponent>, @Inject(MAT_DIALOG_DATA) data: any) {
        this.data = data.val;
    }

    public close(): void {
        this.dialogRef.close();
    }
}
