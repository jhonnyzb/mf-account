import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mat-confirm-dialog',
  templateUrl: './mat-confirm-dialog.component.html',
  styleUrls: ['./mat-confirm-dialog.component.scss']
})
export class MatConfirmDialogComponent {

  dialogIcon = "";
  confirmText = "";
  isButton!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MatConfirmDialogComponent>,
    private router: Router
  ) {
    this.dialogIcon = data.success ? "../../../../assets/img/check-circle.svg" : "../../../../assets/img/Icon-material-error.svg";
    this.confirmText = data.confirmText || "Aceptar";
    this.isButton = data.btnshow;
    document.addEventListener('closePopUp', () => {
      if (dialogRef) {
        this.closeDialog();
      }
    });
  }

  closeDialog() {
    this.dialogRef.close(false);

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
