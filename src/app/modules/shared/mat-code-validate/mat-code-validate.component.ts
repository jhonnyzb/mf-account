import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, inject, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageEnum } from 'src/app/core/enums/languageEnum';
import { DialogParams } from 'src/app/core/models/gtm-models/dialogParams.model';
import { SendCodeRequestModel, SendCodeResponseModel } from 'src/app/core/models/request/sendCode.model';
import { validateCodeRquesteModel } from 'src/app/core/models/request/validateCode.model';
import { GenericListResponseModel } from 'src/app/core/models/response/genericResponse.model';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';
import { ErrorResponseModel } from 'src/app/core/models/response/responseError.model';
import { CodeRepository } from 'src/app/core/repositories/code.respository';
import { TablesRepository } from 'src/app/core/repositories/tables.repository';
import { validateCodeResponseDto } from 'src/app/infrastructure/dto/request/validateCode.dto';
import { CodeService } from 'src/app/infrastructure/services/code.service';
import { DialogService } from 'src/app/infrastructure/services/dialog.service';
import { VerificationService } from 'src/app/infrastructure/services/verification.service';




@Component({
  selector: 'app-mat-code-validate',
  templateUrl: './mat-code-validate.component.html',
  styleUrls: ['./mat-code-validate.component.scss'],
  providers: [{ provide: CodeRepository, useClass: CodeService }],
})
export class MatCodeValidateComponent implements OnInit {
  codeCompleteControl: string = '';
  emptyCode: boolean = false;
  minutes: string = '';
  seconds: string = '';
  invalidCode: boolean = false;
  date = new Date('2020-01-01 00:05');
  isresend = false;
  otpCode: number;
  isLoading: boolean = false;


  verificationService = inject(VerificationService);



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MatCodeValidateComponent>,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private codeRepository: CodeRepository,
  ) {
    this.otpCode = data.otpCode;
    document.addEventListener('closePopUp', () => {
      if (dialogRef) {
        this.closeDialog(true);
      }
    });

  }

  ngOnInit(): void {
    this.date = new Date();
    this.date.setMinutes(this.date.getMinutes() + 5);
    this.countDown();
  }

  onCodeCompleted(code: string): void {
    this.codeCompleteControl = code;
  }




  countDown(): void {
    let padLeft = (n: any) => '00'.substring(0, '00'.length - n.length) + n;
    let interval = setInterval(() => {
      let now = new Date();
      let distance = this.date.getTime() - now.getTime();

      if (distance < 0) {
        clearInterval(interval);
        this.minutes = '00';
        this.seconds = '00';
        this.isresend = true;
        return;
      }

      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.minutes = padLeft(minutes.toString());
      this.seconds = padLeft(seconds.toString());
    }, 1000);

  }

  closeDialog(result: boolean) {
    this.dialogRef.close(result);
  }

  resendCode() {
    this.closeDialog(true);
    this.generateCode();
  }



  validateCode() {
    if (this.codeCompleteControl === '') {
      this.emptyCode = true;
      return;
    }
    let data: validateCodeRquesteModel = {
      ConceptId: this.otpCode,
      OtpCode: this.codeCompleteControl
    }
    this.codeRepository.validateCode(data).subscribe({
      next: (res: ResponseBaseModel<validateCodeResponseDto>) => {
        if (res.data.verified === true) {
          this.verificationService.emitVerification(true, this.otpCode);
          this.closeDialog(true);
          this.isLoading = true;
          return;
        } else {
          this.invalidCode = true;
        }
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        if (error.data[0].ErrorCode == "1221") {
          this.invalidCode = true;
          this.emptyCode = false;
        }
        if (error.data[0].ErrorCode == "1016") {
          let params: DialogParams = {
            success: true,
            page: undefined,
            btnshow: false,
            textTittle: error.data[0].ErrorMessage,
            typeRute: false
          };
          this.dialogService.openRequestCodeValidateDialog(params);
        }

      }
    });
  }

  generateCode() {
    let request: SendCodeRequestModel = {
      ConceptId: this.otpCode
    }
    this.codeRepository.generateCode(request).subscribe({
      next: (res: ResponseBaseModel<SendCodeResponseModel>) => {
        let params: DialogParams = {
          success: true,
          page: undefined,
          textTittle: "El código de verificación fue enviado",
          confirmText: "a tu número de celular: " + res.data.hiddenPhone + " o al correo electrónico: " + res.data.hiddenEmail,
          btnshow: false,
          typeRute: true,
          otpCode: this.otpCode
        };
        this.dialogService.openRequestCodeValidateDialog(params);
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        let params: DialogParams = {
          success: true,
          page: undefined,
          btnshow: false,
          textTittle: error.data[0].ErrorMessage,
          typeRute: false
        };
        this.dialogService.openRequestCodeValidateDialog(params);
      }
    })
  }

}
