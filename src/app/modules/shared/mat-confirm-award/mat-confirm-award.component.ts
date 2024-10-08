import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { getSession, saveSession } from 'src/app/core/encryptData';

@Component({
  selector: 'app-mat-confirm-award',
  templateUrl: './mat-confirm-award.component.html',
  styleUrls: ['./mat-confirm-award.component.scss']
})
export class MatConfirmAwardComponent {

  operators = [];
  selectedOperatorCodeId: number | null = null;
  isvalid = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MatConfirmAwardComponent>,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.getOperatorPhone()
  }

  getOperatorPhone(){
    this.operators = getSession('wr-c-operatorsphone');
  }

  closeDialog() {
    let obj = { flag: false, phoneId: null }
    this.dialogRef.close(obj);
  }

  goConfirm(){
    if (this.data.typeAward === 6) {
      if (this.selectedOperatorCodeId === null) {
        this.isvalid = false;
        return;
      }
    }
    const phoneId =  this.selectedOperatorCodeId ? this.selectedOperatorCodeId : null; 
    let obj = { flag: true, phoneId }
    this.dialogRef.close(obj);
  }

  goUpdateData() {
    this.dialogRef.close(false);
    this.router.navigate(['/main/account/detail-account'])
  }

  onChange(){ 
    this.isvalid = true;
  }

}
