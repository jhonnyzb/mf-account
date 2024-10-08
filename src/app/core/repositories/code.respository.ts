import { Observable } from "rxjs";
import { ResponseBaseDto } from "src/app/infrastructure/dto/response/responseBase.dto";
import { SendCodeRequestModel, SendCodeResponseModel } from "../models/request/sendCode.model";
import { validateCodeRquesteModel, validateCodeResponseModel } from "../models/request/validateCode.model";

export abstract class CodeRepository {
  abstract generateCode(data: SendCodeRequestModel): Observable<ResponseBaseDto<SendCodeResponseModel>>
  abstract validateCode(data: validateCodeRquesteModel): Observable<ResponseBaseDto<validateCodeResponseModel>>
}
