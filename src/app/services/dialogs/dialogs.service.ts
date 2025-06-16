import { ComponentType } from "@angular/cdk/portal";
import { Injectable, TemplateRef } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogInputDataModel, ConfirmDialogOutputDataModel, PCOConfirmDialogComponent } from "@dialogs/common";
import { filter, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DialogsService {
  constructor(
    private _dialog: MatDialog,
  ) { }

  public openDialog<TDialog, TDialogInput, TDialogOutput, TOutput>(
    componentOrTemplateRef: ComponentType<TDialog> | TemplateRef<TDialog>,
    data: TDialogInput,
    mapper: (value: TDialogOutput) => TOutput,
    minWidth = 400,
    minHeight?: number,
    closeOnNavigation = true,
    disableClose = true,
    autoFocus = false,
    customPanelClasses: ReadonlyArray<string> = []
  ): Promise<TOutput | any> {
    return (
      this._dialog
        .open<TDialog, TDialogInput, TDialogOutput | any>(componentOrTemplateRef, {
          data: data,
          closeOnNavigation,
          disableClose,
          autoFocus,
          minWidth,
          minHeight,
          maxWidth: '100vw',
          maxHeight: '100vh',
          panelClass: ['pco-dialog', ...customPanelClasses],
        })
        .afterClosed()
        /* filter((value) => !!value) condition added because of If dialog.close() don't pass
          any return parameter then it's throwing an error.
        */

        .pipe(
          filter((value) => !!value),
          map((value) => mapper(value))
        )
        .toPromise()
    );
  }

  public customConfirm(data?: Partial<ConfirmDialogInputDataModel>): Promise<boolean | null> {
    return this.openDialog<PCOConfirmDialogComponent, Partial<ConfirmDialogInputDataModel>, ConfirmDialogOutputDataModel, boolean | null>(
      PCOConfirmDialogComponent,
      data || {},
      (value) => value.confirm
    );
  }

  public confirm(text?: string, header?: string): Promise<boolean | null> {
    return this.customConfirm(text ? { confirmationText: text, header: header || 'Confirm' } : { header: header || 'Confirm' });
  }

  public info(text: string, header?: string): Promise<boolean | null> {
    return this.customConfirm({ confirmationText: text, icon: 'info', showCancel: false, header: header || 'Información' });
  }
}
