import { Injectable, inject } from '@angular/core';
import { ResponseBaseModel } from '../../core/models/response/responseBase.model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PasswordChangeRepository } from '../../core/repositories/passwordChange.repository';
import { ChangePasswordConfigFormMapper } from '../../core/mappers/changePasswordConfigForm.mapper';
import { ChangePasswordRequestModel } from '../../core/models/request/changePasswordConfigFormRequest.model';
import { environment } from 'src/environment.ts/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordChangeService implements PasswordChangeRepository {

  http: HttpClient = inject(HttpClient);

  changePassword(data: ChangePasswordRequestModel): Observable<ResponseBaseModel<any>> {
    let request = ChangePasswordConfigFormMapper.changePasswordConfirmFormDomainToApi(data)
    return this.http.post<ResponseBaseModel<null>>(environment.apiValepro + `/auth-user-api/api/v1/user/change-password`, request)
      .pipe(
        map((data: ResponseBaseModel<any>) => {
          return data;
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new ResponseBaseModel(
            error.error.CodeId,
            error.error.Message,
            error.error.Data
          ))
        })
      );
  }
}
