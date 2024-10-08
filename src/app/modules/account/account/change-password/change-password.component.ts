import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { DialogParams } from "src/app/core/models/gtm-models/dialogParams.model";
import { Params } from "src/app/utils/Utils";
import { DialogService } from "src/app/infrastructure/services/dialog.service";
import { getSession } from "src/app/core/encryptData";
import { PasswordChangeRepository } from 'src/app/core/repositories/passwordChange.repository';
import { ErrorResponseModel } from "src/app/core/models/response/responseError.model";
import { ResponseBaseModel } from "src/app/core/models/response/responseBase.model";
import { ChangePasswordRequestDto, Info } from "src/app/infrastructure/dto/request/changePasswordConfigFormRequest.dto";
import { LoginValeproResponseModel } from "src/app/core/models/response/loginValeproResponse.model";
import { SendCodeRequestModel, SendCodeResponseModel } from "src/app/core/models/request/sendCode.model";
import { CodeRepository } from "src/app/core/repositories/code.respository";
import { VerificationService } from "src/app/infrastructure/services/verification.service";
import { take } from "rxjs";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent {
  hide = true;
  hideOld = true;
  hideNew = true;
  hideRepeat = true;
  hideRepeate = true;
  formChangePassword!: FormGroup;
  submitted = false;
  parameters: Params = new Params();
  passwordMinlength = getSession<number>('passwordMinlength');
  user: LoginValeproResponseModel = getSession<LoginValeproResponseModel>('accountValepro');
  isLoading = false;
  isErrorShown = false;
  verificationService = inject(VerificationService);
  isConceptIdPw = 89;

  constructor(
    private fb: FormBuilder,
    private passwordChangeRepository: PasswordChangeRepository,
    private dialogService: DialogService,
    private codeRepository: CodeRepository
  ) {
    this.initializeForm();
    this.user = getSession<LoginValeproResponseModel>('accountValepro');
  }

  private initializeForm(): void {
    this.formChangePassword = this.fb.group({
      Password: ['', Validators.required],
      NewPassword: ['', [Validators.required, Validators.minLength(this.passwordMinlength)]],
      NewPasswordVerified: ['', [Validators.required, Validators.minLength(this.passwordMinlength)]],
    });
  }

  onSubmit(): void {
    if (this.formChangePassword.invalid) {
      this.showDialog('Por favor verifique los campos.');
      return;
    }

    this.submitted = true;
    if (this.passwordsDoNotMatch()) {
      this.showDialog('Las claves no coinciden');
      return;
    }

    interface VerificationData {
      verified: boolean;
      code: number;
    }

    this.generateCode();
    this.verificationService.verification$.pipe(take(1)).subscribe((data: VerificationData) => {
      if (data.verified && data.code === 89) {
        this.sendData(this.formChangePassword.value);
      }
    });
  }

  private passwordsDoNotMatch(): boolean {
    return this.formChangePassword.get('NewPassword')?.value !== this.formChangePassword.get('NewPasswordVerified')?.value;
  }

  private showDialog(message: string): void {
    const dialogParams: DialogParams = {
      msg: undefined,
      page: undefined,
      success: false,
      confirmText: '',
      btnshow: false,
    };
    this.dialogService.openConfirmDialog(message, dialogParams);
  }

  private generateCode(): void {
    const request: SendCodeRequestModel = {
      ConceptId: this.isConceptIdPw
    };
    this.codeRepository.generateCode(request).subscribe({
      next: (res: ResponseBaseModel<SendCodeResponseModel>) => {
        this.openValidationDialog("El código de verificación fue enviado", `a tu número de celular: ${res.data.hiddenPhone} o al correo electrónico: ${res.data.hiddenEmail}`, true);
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        this.openValidationDialog(error.data[0].ErrorMessage, undefined, false);
      }
    });
  }

  private openValidationDialog(title: string, text?: string, typeRute: boolean = false): void {
    const params: DialogParams = {
      success: true,
      page: undefined,
      textTittle: title,
      confirmText: text || '',
      btnshow: false,
      typeRute,
      otpCode: this.isConceptIdPw
    };
    this.dialogService.openRequestCodeValidateDialog(params);
  }

  private sendData(info: Info): void {
    this.isLoading = true;
    const request: ChangePasswordRequestDto = {
      UserName: this.user.UserName,
      CurrentPassword: info.Password,
      NewPassword: info.NewPassword,
      NewPasswordVerified: info.NewPasswordVerified,
      ProgramId: getSession<number>('programId'),
    };

    this.passwordChangeRepository.changePassword(request).subscribe({
      next: (response: ResponseBaseModel<null>) => {
        this.showSuccessDialog(response.message);
        this.isLoading = false;
        this.isErrorShown = false;
        this.resetForm();
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        this.isLoading = false;
        if (!this.isErrorShown) {
          if (error?.data?.[0]?.ErrorMessage) {
            this.showDialog(error.data[0].ErrorMessage)
            return;
          }
          this.showDialog(error.message);
          this.isErrorShown = true;
        }
        return;
      }
    });
  }

  private showSuccessDialog(message: string): void {
    const params: DialogParams = {
      success: true,
      page: undefined,
      btnshow: false,
      textTittle: message,
      typeRute: false
    };
    this.dialogService.openRequestCodeValidateDialog(params);
  }

  private resetForm(): void {
    this.formChangePassword.reset();
    this.isLoading = false;
    this.isErrorShown = false;
    this.toggleHide('submitted');
  }

  toggleHide(field: string): void {
    this[field] = !this[field];
  }
}
