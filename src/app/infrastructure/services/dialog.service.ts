import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogParams, DialogParamsAward } from "src/app/core/models/gtm-models/dialogParams.model";
import { MatCodeValidateComponent } from "src/app/modules/shared/mat-code-validate/mat-code-validate.component";
import { MatConfirmAwardComponent } from "src/app/modules/shared/mat-confirm-award/mat-confirm-award.component";
import { MatConfirmDialogComponent } from "src/app/modules/shared/mat-confirm-dialog/mat-confirm-dialog.component";
import { MatRequestGenerateCodeDialogComponent } from "src/app/modules/shared/mat-request-generate-code-dialog/mat-request-generate-code-dialog.component";


@Injectable({
  providedIn: "root",
})
export class DialogService {

  constructor(private dialog: MatDialog) { }


  openConfirmDialog(msg: any, dialogParams?: DialogParams) {
    return this.dialog.open(MatConfirmDialogComponent, {
      width: 'auto',
      panelClass: 'confirm-dialog',
      disableClose: true,
      data: {
        message: msg,
        page: dialogParams?.page,
        confirmText: dialogParams?.confirmText,
        success: dialogParams?.success
      }
    });
  }

  openRequestCodeValidateDialog(dialogParams?: DialogParams) {
    return this.dialog.open(MatRequestGenerateCodeDialogComponent, {
      width: '624',
      panelClass: 'confirm-dialog',
      disableClose: true,
      data: {
        textTittle: dialogParams?.textTittle,
        btnshow: dialogParams?.btnshow,
        page: dialogParams?.page,
        confirmText: dialogParams?.confirmText,
        success: dialogParams?.success,
        typeRute: dialogParams?.typeRute,
        otpCode: dialogParams?.otpCode

      }
    });
  }

  openConfirmDialogProduct(msg: string, dialogParamsAward?: DialogParamsAward) {
    return this.dialog.open(MatConfirmAwardComponent, {
      width: '600px',
      height: '500px',
      panelClass: 'confirm-dialog',
      disableClose: false,
      data: {
        message: msg,
        typeAward: dialogParamsAward.TypeAward
      }
    });
  }

  openCodeValidateDialog(dialogParams?: DialogParams) {
    return this.dialog.open(MatCodeValidateComponent, {
      width: '996px',
      panelClass: 'dialog-popup-code',
      disableClose: true,
      data: {
        otpCode: dialogParams?.otpCode
      }
    });
  }

}
