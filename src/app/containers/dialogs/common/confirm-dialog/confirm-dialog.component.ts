import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmDialogInputDataModel, ConfirmDialogOutputDataModel } from './confirm-dialog.model';
import { takeUntil } from 'rxjs';
import { keyCodes } from '@constants';
import { PCOBaseDialogComponent } from '../base-dialog.component';

const defaultConfirmData: ConfirmDialogInputDataModel = {
    header: 'Confirm',
    confirmationText: 'Are You sure?',
    okText: 'Ok',
    cancelText: 'Cancel',
    icon: 'contact_support',
    showCancel: true,
    notOkText: '',
    showNotOk: false,
};

@Component({
    standalone: true,
    selector: 'pco-confirm-dialog',
    templateUrl: 'confirm-dialog.component.html',
    imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
})
export class PCOConfirmDialogComponent extends PCOBaseDialogComponent {
    readonly data: ConfirmDialogInputDataModel;

    constructor(
        private _dialogRef: MatDialogRef<PCOConfirmDialogComponent, ConfirmDialogOutputDataModel>,
        @Inject(MAT_DIALOG_DATA) data: Partial<ConfirmDialogInputDataModel>
    ) {
        super();
        this.data = { ...defaultConfirmData, ...data };
        this.keyCodePressed.pipe(takeUntil(this.destroy$)).subscribe((keyCode) => {
            switch (keyCode) {
                case keyCodes.enter:
                    this.ok();
                    break;
                case keyCodes.escape:
                    this.cancel();
                    break;
            }
        });
    }

    protected ok(): void {
        this._dialogRef.close({ confirm: true });
    }

    protected notOk(): void {
        this._dialogRef.close({ confirm: false });
    }

    protected cancel(): void {
        this._dialogRef.close({ confirm: null });
    }
}
