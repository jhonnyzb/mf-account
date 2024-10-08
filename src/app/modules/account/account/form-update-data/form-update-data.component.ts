import { DatePipe } from "@angular/common";
import { Component, Input, Optional, inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { getSession, saveSession } from "src/app/core/encryptData";
import { Parameters } from "src/app/core/enums/enums";
import { LanguageEnum } from "src/app/core/enums/languageEnum";
import { OnlyAssetsToBuildLoyalty } from "src/app/core/enums/onlyAssetsToBuildLoyaltyEnum";
import { StatusEnum } from "src/app/core/enums/statusEnum";
import { DialogParams } from "src/app/core/models/gtm-models/dialogParams.model";
import { GTMSelectContent } from "src/app/core/models/gtm-models/gtmSelectContent.model";
import { AttributeModel } from "src/app/core/models/request/saveUserFormRequest.model";
import { UpdateUserRequestModel } from "src/app/core/models/request/updateUserFormRequest.model";
import { GenericListResponseModel } from "src/app/core/models/response/genericResponse.model";
import { LoginValeproResponseModel } from "src/app/core/models/response/loginValeproResponse.model";
import { ResponseBaseModel } from "src/app/core/models/response/responseBase.model";
import { ErrorResponseModel } from "src/app/core/models/response/responseError.model";
import { GetUserAffiliationResponseModel, UpdateUserPropertiesResponseModel } from "src/app/core/models/response/updateUserFormResponse.model";
import { TablesRepository } from "src/app/core/repositories/tables.repository";
import { UserRepository } from "src/app/core/repositories/user.respository";
import { DialogService } from "src/app/infrastructure/services/dialog.service";
import { ProgramUtil } from "src/app/utils/ProgramUtil";

@Component({
  selector: "app-form-update-data",
  templateUrl: "./form-update-data.component.html",
  styleUrls: ["./form-update-data.component.scss"],
})
export class FormUpdateDataComponent {

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

  constructor(
    private programUtil: ProgramUtil,
    private dialogService: DialogService,
    private fb: FormBuilder,
    private userRepository: UserRepository,
    private tableRepository: TablesRepository,
    @Optional() public dialogRef: MatDialogRef<FormUpdateDataComponent>
  ) {
    this.user = getSession<LoginValeproResponseModel>('accountValepro');

  }


  ngOnInit(): void {
    this.updateForm = this.fb.group({
    });
    this.loadForm();
  }


  loadForm() {
    this.isLoading = true;
    this.userRepository.getUpdateUserForm(this.userValepro.UserId, 1, true).subscribe({
      next: (response: ResponseBaseModel<UpdateUserPropertiesResponseModel>) => {
        this.configForm = response.data;
        this.configForm.FormAttributes.forEach((field: GetUserAffiliationResponseModel) => {

          let control = new FormControl(field.Type == 'R' ? false : field.Type == 'L' ? 0 : field.Type == 'D' ? new Date() : field.Type == 'M' ? [0] : '');

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

          if (field.Type == 'L') {
            this.getListGeneral(field.DataSource, field.Name);
            control.setValue(Number(field.Value || 0))
          }
          if (field.Type == 'R') {
            control.setValue(field.Value == "True")
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
        confirmText: ""
      };
      this.dialogService.openConfirmDialog("Por favor, valida los campos.", params);
      this.submitted = false;
      return
    };
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

    this.sendTagData()
  }

  sendDataUpdate(modelRequest: UpdateUserRequestModel) {
    this.userRepository.updateUserForm(modelRequest).subscribe({
      next: (response: ResponseBaseModel<any>) => {
        const params: DialogParams = {
          success: true,
          msg: undefined,
          page: undefined,
          confirmText: ''
        };
        this.isLoading = false;
        this.dialogService.openConfirmDialog(response.message, params);
      },
      error: (error: ResponseBaseModel<ErrorResponseModel[]>) => {
        this.isLoading = false;
        let dialogParams: DialogParams = {
          msg: undefined,
          page: undefined,
          success: false,
          confirmText: ''
        };
        this.dialogService.openConfirmDialog(error.message, dialogParams);
      },
    });
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

}
