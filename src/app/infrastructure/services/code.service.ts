import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment.ts/environment';
import { ResponseBaseDto } from '../dto/response/responseBase.dto';
import { CodeRepository } from 'src/app/core/repositories/code.respository';
import { SendCodeRequestModel, SendCodeResponseModel } from 'src/app/core/models/request/sendCode.model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { SendCodeResponseDto } from '../dto/request/sendCode.dto';
import { CodeMapper } from 'src/app/core/mappers/code.mapper';
import { ErrorResponseModel } from 'src/app/core/models/response/responseError.model';
import { validateCodeResponseModel, validateCodeRquesteModel } from 'src/app/core/models/request/validateCode.model';
import { validateCodeResponseDto } from '../dto/request/validateCode.dto';


@Injectable({
  providedIn: 'root'
})
export class CodeService implements CodeRepository {


  constructor(
    private http: HttpClient,
  ) { }

  generateCode(data: SendCodeRequestModel): Observable<ResponseBaseDto<SendCodeResponseModel>> {
    let request = CodeMapper.sendCodeFromDomainToApi(data)
    return this.http.post<ResponseBaseDto<SendCodeResponseDto>>(`${environment.apiValepro}/auth-user-api/api/v1/OTP/send-code`, request)
      .pipe(
        map((response: ResponseBaseDto<SendCodeResponseDto>) => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: CodeMapper.sendCodeFromApiToDomain(response.data)
          }
        }),
        catchError((error: HttpErrorResponse) => {
          let errorResponse: ResponseBaseDto<ErrorResponseModel[]> = {
            codeId: error.error.CodeId,
            message: error.error.Message,
            data: error.error.Data
          }
          return throwError(() => errorResponse);
        }));
  }
  validateCode(data: validateCodeRquesteModel): Observable<ResponseBaseDto<validateCodeResponseModel>> {
    let request = CodeMapper.validateCodeFromDomainToApi(data)
    return this.http.post<ResponseBaseDto<validateCodeResponseDto>>(`${environment.apiValepro}/auth-user-api/api/v1/OTP/verify-code`, request)
      .pipe(
        map((response: ResponseBaseDto<validateCodeResponseDto>) => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: CodeMapper.validateCodeFromApiToDomain(response.data)
          }
        }),
        catchError((error: HttpErrorResponse) => {
          let errorResponse: ResponseBaseDto<ErrorResponseModel[]> = {
            codeId: error.error.CodeId,
            message: error.error.Message,
            data: error.error.Data
          }
          return throwError(() => errorResponse);
        }));
  }

}

