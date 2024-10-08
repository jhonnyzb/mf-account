import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Optional, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { getSession, saveSession } from 'src/app/core/encryptData';
import { Parameters } from 'src/app/core/enums/enums';
import { LanguageEnum } from 'src/app/core/enums/languageEnum';
import { OnlyAssetsToBuildLoyalty } from 'src/app/core/enums/onlyAssetsToBuildLoyaltyEnum';
import { StatusEnum } from 'src/app/core/enums/statusEnum';
import { DialogParams, DialogParamsAward } from 'src/app/core/models/gtm-models/dialogParams.model';
import { GTMSelectContent } from 'src/app/core/models/gtm-models/gtmSelectContent.model';
import { AttributeModel, UpdateUserRequestModel } from 'src/app/core/models/request/updateUserFormRequest.model';
import { GenericListResponseModel } from 'src/app/core/models/response/genericResponse.model';
import { LoginValeproResponseModel } from 'src/app/core/models/response/loginValeproResponse.model';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';
import { ErrorResponseModel } from 'src/app/core/models/response/responseError.model';
import { UpdateUserPropertiesResponseModel, GetUserAffiliationResponseModel } from 'src/app/core/models/response/updateUserFormResponse.model';
import { TablesRepository } from 'src/app/core/repositories/tables.repository';
import { UserRepository } from 'src/app/core/repositories/user.respository';
import { DialogService } from 'src/app/infrastructure/services/dialog.service';
import { ProgramUtil } from 'src/app/utils/ProgramUtil';
import { FormUpdateDataComponent } from '../form-update-data/form-update-data.component';
import { PersonDataResponseModel } from 'src/app/core/models/response/personDataResponse.model';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { ProductDetailByIdModel } from 'src/app/core/models/response/productDetail.model';
import { ProductRepository } from 'src/app/core/repositories/product.repository';
import { CodeRepository } from 'src/app/core/repositories/code.respository';
import { SendCodeRequestModel, SendCodeResponseModel } from 'src/app/core/models/request/sendCode.model';

import { VerificationService } from 'src/app/infrastructure/services/verification.service';
import { distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-account',
  templateUrl: './detail-account.component.html',
  styleUrls: ['./detail-account.component.scss']
})
export class DetailAccountComponent implements OnInit {
  @Output() verificationSuccess = new EventEmitter<boolean>();

  isLoading: boolean = false;
  submitted: boolean = false;
  updateForm!: FormGroup;
  anio: number = new Date().getFullYear();
  programId: number = getSession<number>('programId');
  configForm!: UpdateUserPropertiesResponseModel;
  userValepro: LoginValeproResponseModel = getSession<LoginValeproResponseModel>('accountValepro');
  segment!: GenericListResponseModel;
  datePipe: DatePipe = inject(DatePipe);
  user: LoginValeproResponseModel = getSession<LoginValeproResponseModel>('accountValepro');
  verificationService = inject(VerificationService);
  isConceptId: number = 88;
  private verificationSubscription: Subscription;
  isLoadUpdate = false;

  //#region ConfigForm
  documentType: GetUserAffiliationResponseModel;
  document: GetUserAffiliationResponseModel;
  firstName: GetUserAffiliationResponseModel;
  secondName: GetUserAffiliationResponseModel;
  firstLastName: GetUserAffiliationResponseModel;
  secondLastName: GetUserAffiliationResponseModel;
  country: GetUserAffiliationResponseModel;
  department: GetUserAffiliationResponseModel;
  city: GetUserAffiliationResponseModel;
  email: GetUserAffiliationResponseModel;
  addressResidence: GetUserAffiliationResponseModel;
  neighborhoodResidence: GetUserAffiliationResponseModel;
  phone: GetUserAffiliationResponseModel;
  isReady: boolean = false;
  validate: boolean = false;
  //#endregion



  constructor(
    private programUtil: ProgramUtil,
    private dialogService: DialogService,
    private fb: FormBuilder,
    private userRepository: UserRepository,
    private tableRepository: TablesRepository,
    private router: Router,
    @Optional() public dialogRef: MatDialogRef<FormUpdateDataComponent>,
    private productRepository: ProductRepository,
    private codeRepository: CodeRepository
  ) {
    this.user = getSession<LoginValeproResponseModel>('accountValepro');

  }


  ngOnInit(): void {
    this.getReferentialData(40)
    this.updateForm = this.fb.group({
    });
    this.loadForm();
  }

  trimValue(controlName: string): void {
    const control = this.updateForm.get(controlName);
    if (control && typeof control.value === 'string') {
      control.setValue(control.value.trim());
    }
  }


  loadForm() {
    this.isLoading = true;
    this.userRepository.getUpdateUserForm(this.userValepro.UserId, 1, true).subscribe({
      next: (response: ResponseBaseModel<UpdateUserPropertiesResponseModel>) => {
        this.configForm = response.data;
        this.documentType = this.configForm.FormAttributes.find(x => x.FormAttributeId == 1);
        this.document = this.configForm.FormAttributes.find(x => x.FormAttributeId == 2);
        this.firstName = this.configForm.FormAttributes.find(x => x.FormAttributeId == 3);
        this.secondName = this.configForm.FormAttributes.find(x => x.FormAttributeId == 4);
        this.firstLastName = this.configForm.FormAttributes.find(x => x.FormAttributeId == 5);
        this.secondLastName = this.configForm.FormAttributes.find(x => x.FormAttributeId == 6);
        this.country = this.configForm.FormAttributes.find(x => x.FormAttributeId == 9);
        this.department = this.configForm.FormAttributes.find(x => x.FormAttributeId == 10);
        this.city = this.configForm.FormAttributes.find(x => x.FormAttributeId == 11);
        this.email = this.configForm.FormAttributes.find(x => x.FormAttributeId == 8);
        this.addressResidence = this.configForm.FormAttributes.find(x => x.FormAttributeId == 12);
        this.neighborhoodResidence = this.configForm.FormAttributes.find(x => x.FormAttributeId == 13);
        this.phone = this.configForm.FormAttributes.find(x => x.FormAttributeId == 7);
        this.configForm.FormAttributes.forEach((field: GetUserAffiliationResponseModel) => {

          let control = new FormControl(field.Type == 'L' ? 0 : field.Type == 'D' ? new Date() : field.Type == 'M' ? [0] : '');

          if (field.Name == 'CountryResidenceId') {
            saveSession(field.Value, 'countryFromCreateId');
            this.getDepartments('StateProvinceResidenceId', Number(field.Value))
          }

          if (field.Name == 'StateProvinceResidenceId') {
            this.getCities('CityResidenceId', this.configForm.FormAttributes.filter((value) => value.Name == 'CountryResidenceId')[0].Value, field.Value)
          }

          control.setValue(field.Value);
          if (field.Type === 'checkbox') {
            this.updateForm.addControl(field.FormAttributeId.toString(), control);
          }
          if (field.Required) {
            control.addValidators(Validators.required);
            this.updateForm.addControl(field.FormAttributeId.toString(), control);
          }
          if (field.Length > 0) {
            control.addValidators(Validators.maxLength(field.Length));
            this.updateForm.addControl(field.FormAttributeId.toString(), control);
          }
          if (field.RegularExpression) {
            control.addValidators(Validators.pattern(field.RegularExpression));
            this.updateForm.addControl(field.FormAttributeId.toString(), control);
          }


          if (field.Editable) {
            control.enable();
          } else {
            control.disable();
          }


          if (field.Type == 'L' && field.FormAttributeId != 23) {
            this.getListGeneral(field.DataSource, field.Name);
            control.setValue(Number(field.Value || 0))
          } else if (field.Type == 'L' && field.FormAttributeId == 23) {
            control.setValue(field.Value)
          }

          if (field.Type == 'D') {

            if (field.Value == '') {
              control.setValue(field.Value);
            } else {
              let dateSplited = field.Value.split('/');
              let day = parseInt(dateSplited[0], 10);
              let month = parseInt(dateSplited[1], 10) - 1;
              let year = parseInt(dateSplited[2], 10);
              let date = new Date(year, month, day);
              control.setValue(new Date(date));
            }

          }
          this.updateForm.addControl(field.FormAttributeId.toString(), control)
        });
        this.isLoading = false;
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        console.error(error.message);
        this.isLoading = false;
      },
      complete: () => {
        this.isReady = true
      }
    });
  }

  getListGeneral(id: number, name: string) {
    if (name == 'StateProvinceResidenceId' || name == 'CityResidenceId') {
      return;
    }
    if (name == 'CountryResidenceId') {
      this.getCountries(name);
      return;
    }

    if (name == 'ClusterId') {
      this.getClusters(name);
      return;
    }
    this.getReferentialList(id, name);
  }

  getReferentialList(id: number, name: string) {
    this.tableRepository.getReferentialData(id, LanguageEnum.Spanish).subscribe({
      next: (data: ResponseBaseModel<GenericListResponseModel[]>) => {
        this.setListToItem(data.data, name);
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        console.error(error.message);
      }
    });
  }
  getReferentialData(id: number) {
    this.tableRepository.getReferentialData(id, LanguageEnum.Spanish).subscribe({
      next: (data: ResponseBaseModel<GenericListResponseModel[]>) => {
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        console.error(error.message);
      }
    });
  }

  generateCode() {
    let request: SendCodeRequestModel = {
      ConceptId: this.isConceptId
    }
    this.isLoadUpdate = true;
    this.codeRepository.generateCode(request).subscribe({
      next: (res: ResponseBaseModel<SendCodeResponseModel>) => {
        this.isLoadUpdate = false;
        let params: DialogParams = {
          success: true,
          page: undefined,
          textTittle: "El código de verificación fue enviado.",
          confirmText: "a tu número de celular: " + res.data.hiddenPhone + " o al correo electrónico: " + res.data.hiddenEmail,
          btnshow: false,
          typeRute: true,
          otpCode: this.isConceptId
        };
        this.dialogService.openRequestCodeValidateDialog(params);
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        this.isLoadUpdate = false;
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



  getClusters(name: string) {
    this.tableRepository.getClusters(this.programId).subscribe({
      next: (data: ResponseBaseModel<GenericListResponseModel[]>) => {
        this.setListToItem(data.data, name);
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        console.error(error.message);
      }
    })
  }

  getCountries(name: string) {
    this.tableRepository.getCountries(LanguageEnum.Spanish, StatusEnum.isCurrent, OnlyAssetsToBuildLoyalty.own).subscribe({
      next: (data: ResponseBaseModel<GenericListResponseModel[]>) => {
        this.setListToItem(data.data, name);
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        console.error(error.message);
      }
    });
  }

  getDepartments(name: string, value: number) {
    this.tableRepository.getDepartments(LanguageEnum.Spanish, value.toString()).subscribe({
      next: (data: ResponseBaseModel<GenericListResponseModel[]>) => {
        this.setListToItem(data.data, name);
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        console.error(error.message);
      }
    });
  }

  getCities(name: string, countryCode: string, departmentCode: string,) {
    this.tableRepository.getCities(LanguageEnum.Spanish, countryCode, departmentCode).subscribe({
      next: (data: ResponseBaseModel<GenericListResponseModel[]>) => {
        this.setListToItem(data.data, name);
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        console.error(error.message);
      }
    });
  }

  setListToItem(list: GenericListResponseModel[], name: string) {
    this.configForm.FormAttributes.forEach(item => {
      if (item.Name == name) {
        item.listAsigned = list;
      }
    });
  }

  changeListLocation(name: string, value: number) {
    if (name == 'CountryResidenceId') {
      let val = this.updateForm.get(value.toString())?.value;
      saveSession(val, 'countryFromCreateId');
      this.getDepartments('StateProvinceResidenceId', val);
      return;
    }

    if (name == 'StateProvinceResidenceId') {
      let country: string = getSession('countryFromCreateId');
      let department = this.updateForm.get(value.toString())?.value;
      this.getCities('CityResidenceId', country, department);
    }

  }

  onSubmit() {
    this.submitted = true;
    if (this.updateForm.invalid) {
      let params: DialogParams = {
        success: false,
        msg: undefined,
        page: undefined,
        confirmText: "",
        btnshow: false,
      };
      this.dialogService.openConfirmDialog("Por favor, valida los campos.", params);
      this.submitted = false;
      return
    };
    this.generateCode();

    this.verificationSubscription = this.verificationService.verification$.pipe(
      distinctUntilChanged((prev, curr) => prev.code === curr.code && prev.verified === curr.verified)
    ).subscribe((data) => {
      if (data.verified && data.code === 88) {
        this.isLoading = true;
        const attributes: AttributeModel[] = [];

        Object.keys(this.updateForm.controls).forEach(item => {
          let attribute = this.configForm.FormAttributes.filter(x => x.FormAttributeId.toString() == item)[0];
          if (attribute.Type == 'D') {
            let date
            try {
              date = this.datePipe.transform(this.updateForm.get(item)?.value, 'dd/MM/yyyy');
            } catch (e) {
              date = null;
            }
            attributes.push({ formAttributeId: Number(item), value: date ? date : '' });

          }
          else {
            attributes.push({ formAttributeId: Number(item), value: `${this.updateForm.get(item)?.value}` });
          }
        });

        const modelRequest: UpdateUserRequestModel = {
          programId: getSession<number>('programId'),
          userId: this.userValepro.UserId,
          referenceTableId: Parameters.referenceTableId,
          isWebResponsive: true,
          attributes: attributes
        };
        this.sendDataUpdate(modelRequest);
        this.sendTagData();
        return
      }

    });
  }

  sendDataUpdate(modelRequest: UpdateUserRequestModel) {
    this.isLoadUpdate = true;
    this.userRepository.updateUserForm(modelRequest).subscribe({
      next: (response: ResponseBaseModel<any>) => {
        this.isLoadUpdate= false;
        let params: DialogParams = {
          success: true,
          page: undefined,
          btnshow: false,
          textTittle: response.message,
          typeRute: false
        };

        // Código para cuando el flujo de actualización de datos proviene del producto del catalogo
        this.dialogService.openRequestCodeValidateDialog(params).afterClosed().subscribe((resp)=>{
          const updateDataCatalog = getSession<string>('wr-c-update-data');
          if (updateDataCatalog === 'init') {
            this.getProduct();
          }
        });
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        this.isLoading = false;
        this.isLoadUpdate = false;
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


  getUserData() {
    this.userRepository.getUserData(this.user.PersonId).subscribe({
      next: (response: ResponseBaseModel<PersonDataResponseModel>) => {
        saveSession(response.data, 'userData')
        const miEvento = new CustomEvent('userDataEvent', { detail: response.data });
        document.dispatchEvent(miEvento);
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        console.error(error.message);
      }
    })
  }

  async sendTagData() {
    let tagData: GTMSelectContent = {
      event: "select_content",
      ParameterTarget: "Perfil",
      ParameterLocation: "Perfil Actualización de datos",
      ParameterType: "botón",
      ParameterCategory: "Perfil",
      IDAccount: this.user.AccountId,
      IDProgram: this.user.ProgramId,
      IDPerson: this.user.PersonId,
      UserName: this.user.UserName,
      ParameterText: "Perfil - Actualizar datos.",
      ParameterItemID: "0",
      Currency: "",
      value: ""
    };
    window.parent.postMessage(JSON.stringify(tagData), '*');
  }

  onChangeCountry(event: MatSelectChange) {
    this.updateForm.patchValue({ '10': null });
    this.updateForm.patchValue({ '11': null });
    this.getDepartments('StateProvinceResidenceId', event.value.toString());
  }

  onChangeDepartment(event: MatSelectChange) {
    this.updateForm.patchValue({ '11': null });
    this.getCities('CityResidenceId', this.updateForm.get('9')?.value, event.value.toString());
  }

  getProduct() {
    const productSave = getSession<ProductDetailByIdModel>('wr-c-product');
    this.productRepository.getProductId(productSave.AwardId).subscribe({
      next: (resp) => {
        saveSession(resp.data.Award, 'wr-c-product')
        const dialogParams: DialogParamsAward = {
          Msg: null,
          Page: null,
          TypeAward: productSave.ProductClass
        };
        this.dialogService.openConfirmDialogProduct(resp.data.Award.ProductClassAuxiliaryMessage, dialogParams)
          .afterClosed().subscribe((resp) => {
            if (resp.flag) {
              saveSession(resp.phoneId, 'wr-c-phone-id');
              saveSession('end', 'wr-c-update-data');
              this.router.navigate(['main/catalog/detail']);
            }
          })
      },
      error: (error) => { }
    })
  }

  ngOnDestroy() {
    const updateData = getSession<string>('wr-c-update-data');
    if (updateData && updateData !== 'end') {
      sessionStorage.removeItem('wr-c-update-data');
    }

    if (this.verificationSubscription) {
      this.verificationSubscription.unsubscribe();
    }
  }

}

