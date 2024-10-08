import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { getSession } from 'src/app/core/encryptData';
import { EnvironmentModel } from 'src/app/core/models/environment.model';
import { PointsModel } from 'src/app/core/models/response/pointsResponse.model';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';
import { AccountRepository } from 'src/app/core/repositories/account.respository';
import { environment } from 'src/environment.ts/environment';
import { ResponseBaseDto } from '../dto/response/responseBase.dto';
import { PointsDto } from '../dto/response/pointsResponse.dto';
import { PointsMapper } from 'src/app/core/mappers/points.mapper';


@Injectable({
  providedIn: 'root'
})
export class AccountService implements AccountRepository {


  constructor(
    private http: HttpClient,
  ) { }

  getTransactionsPoints(page: number, pageSize: number): Observable<ResponseBaseDto<PointsModel>> {
    return this.http.get<ResponseBaseDto<PointsDto>>(`${environment.apiValepro}/transactions-api/api/v1/transactions/my-points?page=${page}&pageSize=${pageSize}`)
      .pipe(
        map(response => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: PointsMapper.fromApiToDomain(response.data)
          }
        })
      );
  }
}
