import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogParams } from 'src/app/core/models/gtm-models/dialogParams.model';
import { DialogService } from 'src/app/infrastructure/services/dialog.service';

@Component({
  selector: 'app-mat-request-generate-code-dialog',
  templateUrl: './mat-request-generate-code-dialog.component.html',
  styleUrls: ['./mat-request-generate-code-dialog.component.scss']
})
export class MatRequestGenerateCodeDialogComponent {

  dialogIcon = "";
  confirmText = "";
  isButton!: boolean;
  textconten: string;
  rute: boolean;
  otpCode: number;



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MatRequestGenerateCodeDialogComponent>,
    private router: Router,
    private dialogService: DialogService,

  ) {
    this.dialogIcon = data.success ? "../../../../assets/img/check-circle.svg" : "../../../../assets/img/Icon-material-error.svg";
    this.confirmText = data.confirmText;
    this.isButton = data.btnshow;
    this.textconten = data.textTittle;
    this.rute = data.typeRute;
    this.otpCode = data.otpCode;
    document.addEventListener('closePopUp', () => {
      if (dialogRef) {
        this.closeDialog();
      }
    });
  }

  closeDialog() {
    this.dialogRef.close(false);
    if (this.rute == true) {
      let params: DialogParams = {
        success: true,
        page: undefined,
        otpCode: this.otpCode
      }
      this.dialogService.openCodeValidateDialog(params);
    }

  }
  cerrarDialogo(): void {

    this.dialogRef.close(false);

  }
  confirmado(): void {

    if (this.data.page == null) {
      this.dialogRef.close(true);
    } else {
      this.router.navigate([this.data.page]);
      this.dialogRef.close(true);
    }

  }
  checkRouteUrl() {
    return this.router.url == '/main/redeem/cart';
  }

}
