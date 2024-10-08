import { SendCodeRequestDto, SendCodeResponseDto } from "src/app/infrastructure/dto/request/sendCode.dto"
import { validateCodeRequestDto, validateCodeResponseDto } from "src/app/infrastructure/dto/request/validateCode.dto"
import { SendCodeRequestModel, SendCodeResponseModel } from "../models/request/sendCode.model"
import { validateCodeRquesteModel, validateCodeResponseModel } from "../models/request/validateCode.model"

export class CodeMapper{
  static sendCodeFromDomainToApi(model: SendCodeRequestModel): SendCodeRequestDto {
    return {
      ConceptId: model.ConceptId,
    }
  }

  static sendCodeFromApiToDomain(dto: SendCodeResponseDto): SendCodeResponseModel {
    return {
      success: dto.success,
      hiddenEmail: dto.hiddenEmail,
      hiddenPhone: dto.hiddenPhone,
    }
  }
  static validateCodeFromDomainToApi(model: validateCodeRquesteModel): validateCodeRequestDto {
    return {
      ConceptId: model.ConceptId,
      OtpCode: model.OtpCode
    }
  }

  static validateCodeFromApiToDomain(dto: validateCodeResponseDto): validateCodeResponseModel {
    return {
      verified: dto.verified
    }
  }

}
