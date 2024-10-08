import { ChangePasswordRequestDto } from "../../infrastructure/dto/request/changePasswordConfigFormRequest.dto";
import { ChangePasswordRequestModel } from "../models/request/changePasswordConfigFormRequest.model";

export class ChangePasswordConfigFormMapper {

  static changePasswordConfirmFormDomainToApi(model: ChangePasswordRequestModel): ChangePasswordRequestDto {
    return model
  }

}
