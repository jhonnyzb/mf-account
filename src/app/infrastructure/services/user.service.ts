import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { UserRepository } from 'src/app/core/repositories/user.respository';
import { UpdateUserRequestModel } from 'src/app/core/models/request/updateUserFormRequest.model';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';
import { ResponseBaseDto } from '../dto/response/responseBase.dto';
import { UpdateUserPropertiesResponseDto } from '../dto/response/updateUserFormResponse.dto';
import { ErrorResponseModel } from 'src/app/core/models/response/responseError.model';
import { UserMapper } from 'src/app/core/mappers/user.mapper';
import { UpdateUserPropertiesResponseModel } from 'src/app/core/models/response/updateUserFormResponse.model';
import { environment } from 'src/environment.ts/environment';
import { PersonDataResponseModel } from 'src/app/core/models/response/personDataResponse.model';




@Injectable({
  providedIn: "root",
})
export class UserService implements UserRepository {

  constructor(
    private http: HttpClient,
  ) { }

  getUpdateUserForm(userId: string, referenceTableId: number, isWebResponsive: boolean): Observable<ResponseBaseModel<UpdateUserPropertiesResponseModel>> {
    return this.http.get<ResponseBaseDto<UpdateUserPropertiesResponseDto>>(`${environment.apiValepro}/affiliations-api/api/v1/affiliated/get-affiliated-user?userId=${userId}&referenceTableId=${referenceTableId}&isWebResponsive=${isWebResponsive}`).
      pipe(
        map((response) => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: UserMapper.configFormApiToDomain(response.data)
          }
        }),
        catchError((error: HttpErrorResponse) => {
          let errorResponse: ResponseBaseModel<ErrorResponseModel[]> = {
            codeId: error.error.CodeId,
            message: error.error.Message,
            data: error.error.Data
          }
          return throwError(() => errorResponse);
        })
      );
  }

  updateUserForm(data: UpdateUserRequestModel): Observable<ResponseBaseModel<any>> {
    let request = UserMapper.updateUserFormDomainToApi(data)
    return this.http.put<ResponseBaseModel<null>>(`${environment.apiValepro}/affiliations-api/api/v1/affiliated/update-affiliated-user`, request)
      .pipe(
        map((data: ResponseBaseModel<any>) => {
          return data;
        }),
        catchError((error: HttpErrorResponse) => {
          let errorResponse: ResponseBaseModel<ErrorResponseModel[]> = {
            codeId: error.error.codeId,
            message: error.error.message,
            data: error.error.data
          }
          return throwError(() => errorResponse);
        })
      );
  }

  getUserData(personId: number): Observable<ResponseBaseModel<PersonDataResponseModel>> {
    return this.http.get<ResponseBaseDto<PersonDataResponseModel>>(`${environment.apiValepro}/affiliations-api/api/v1/user/get-user-data?personId=${personId}`).
      pipe(
        map((response) => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: UserMapper.mapPersonDataResponseDtoToModel(response.data)
          }
        }),
        catchError((error: HttpErrorResponse) => {
          let errorResponse: ResponseBaseModel<ErrorResponseModel[]> = {
            codeId: error.error.codeId,
            message: error.error.message,
            data: error.error.data
          }
          return throwError(() => errorResponse);
        })
      );
  }



}
