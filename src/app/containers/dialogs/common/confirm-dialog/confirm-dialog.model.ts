export interface ConfirmDialogInputDataModel {
  header: string;
  confirmationText: string;
  okText: string;
  cancelText?: string;
  icon: string;
  showCancel: boolean;
  notOkText: string;
  showNotOk: boolean;
}

export interface ConfirmDialogOutputDataModel {
  confirm: boolean | null;
}
