import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getSession } from 'src/app/core/encryptData';
import { GenericListResponseModel } from 'src/app/core/models/response/genericResponse.model';
import { PersonDataResponseModel, PersonResponseModel } from 'src/app/core/models/response/personDataResponse.model';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';
import { ErrorResponseModel } from 'src/app/core/models/response/responseError.model';
import { TablesRepository } from 'src/app/core/repositories/tables.repository';
import { LanguageEnum } from "src/app/core/enums/languageEnum";
import { ToastGenericRepository } from 'src/app/core/repositories/toastGeneric.repository';
import { environment } from 'src/environment.ts/environment';
import { LoginValeproResponseModel } from 'src/app/core/models/response/loginValeproResponse.model';
import { ContactUsService } from 'src/app/infrastructure/services/contactUs.service';
import { ContactUsRequestDto } from 'src/app/infrastructure/dto/request/contactUsRequest.dto';
import { DialogService } from 'src/app/infrastructure/services/dialog.service';
import { DialogParams } from 'src/app/core/models/gtm-models/dialogParams.model';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  user: LoginValeproResponseModel = getSession<LoginValeproResponseModel>('accountValepro');
  formContactUs: FormGroup;
  dataAccount: PersonResponseModel;
  reasonList: GenericListResponseModel[] = [];
  captcha: string = '';
  AttemptsCaptcha: number = 0;
  keyCaptcha: string = environment.keyRecaptcha;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private tableRepository: TablesRepository,
    private toastGenericRepository: ToastGenericRepository,
    private _contactUsService: ContactUsService,
    private dialogService: DialogService

  ) {
    this.user = getSession<LoginValeproResponseModel>('accountValepro');
    this.createForm();
    this.getUserData();
    this.getReferentialList(295);
  }

  createForm(): void {
    this.formContactUs = this.fb.group({
      documentType: [{ value: '', disabled: true }, Validators.required],
      documentNumber: [{ value: '', disabled: true }, [Validators.required]],
      city: [{ value: '', disabled: true }, [Validators.required]],
      phone: [{ value: '', disabled: true }, [Validators.required]],
      email: [{ value: '', disabled: true }, [Validators.required]],
      CodeId: ['', [Validators.required]],
      OrderId: [''],
      Message: ['', [Validators.required]]
    });
  }

  getUserData() {
    this.dataAccount = getSession<PersonDataResponseModel>('userData').person;
    this.formContactUs.get('documentType').setValue(this.dataAccount.identificationTypeName);
    this.formContactUs.get('documentNumber').setValue(this.dataAccount.identificationNumber);
    this.formContactUs.get('city').setValue(this.dataAccount.cityResidenceName);
    this.formContactUs.get('phone').setValue(this.dataAccount.phone1);
    this.formContactUs.get('email').setValue(this.dataAccount.email);
    this.formContactUs.updateValueAndValidity();
  }

  navigateToDetailAccount() {
    this.router.navigate(['/main/account/detail-account']);
  }

  getReferentialList(id: number) {
    this.tableRepository.getReferentialData(id, LanguageEnum.Spanish).subscribe({
      next: (data: ResponseBaseModel<GenericListResponseModel[]>) => {
        this.reasonList = data.data;
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        this.toastGenericRepository.genericErrorMessage();
      }
    });
  }

  resolved(token: string) {
    this.captcha = token;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.formContactUs.invalid) return;
    if (this.captcha == '' || this.captcha == null) return;
    const request: ContactUsRequestDto = {
      AccountId: this.user.AccountId,
      CodeId: this.formContactUs.get('CodeId').value,
      OrderId: this.formContactUs.get('OrderId').value ? Number(this.formContactUs.get('OrderId').value) : null,
      Message: this.formContactUs.get('Message').value
    };
    this._contactUsService.contactSalesForce(request).subscribe({
      next: (response: ResponseBaseModel<null>) => {
        const dialogParams: DialogParams = {
          msg: undefined,
          page: undefined,
          success: true,
          confirmText: '',
          btnshow: false,
        };
        this.dialogService.openConfirmDialog(response.message, dialogParams);
        this.formContactUs.reset();
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        let dialogParams: DialogParams = {
          msg: undefined,
          page: undefined,
          success: false,
          confirmText: '',
          btnshow: false,

        };
        this.dialogService.openConfirmDialog(error.message, dialogParams);
      },
    });
  }
}
