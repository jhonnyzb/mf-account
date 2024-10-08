import { Observable } from "rxjs";

import { ChangePasswordRequestModel } from "../models/request/changePasswordConfigFormRequest.model";
import { ResponseBaseModel } from "../models/response/responseBase.model";

export abstract class PasswordChangeRepository {
  abstract changePassword(programId: ChangePasswordRequestModel): Observable<ResponseBaseModel<null>>
}
