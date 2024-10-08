import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TablesRepository } from '../../core/repositories/tables.repository';
import { GenericListResponseModel } from '../../core/models/response/genericResponse.model';
import { ResponseBaseModel } from '../../core/models/response/responseBase.model';
import { getSession } from '../../core/encryptData';
import { EnvironmentModel } from '../../core/models/environment.model';
import { TablesMapper } from '../../core/mappers/tables.mapper';
import { ClustersDto } from '../dto/response/clustersList.dto';
import { DavipolaResponseDto } from '../dto/response/davipolaResponse.dto';
import { ReferentialTableResponseDto } from '../dto/response/referentialTable.dto';
import { ReferentialTableRequestDto } from '../dto/request/referentialTableRequest.dto';
import { ResponseBaseDto } from '../dto/response/responseBase.dto';
import { environment } from 'src/environment.ts/environment';

@Injectable({
  providedIn: 'root'
})
export class TablesService implements TablesRepository {

  constructor(private http: HttpClient) { }


  getReferentialData(tableId: number, languageId: number): Observable<ResponseBaseModel<GenericListResponseModel[]>> {
    let requestDto: ReferentialTableRequestDto = {
      languageId: languageId,
      tableId: tableId
    }
    return this.http.post<ResponseBaseDto<ReferentialTableResponseDto[]>>(environment.apiValepro + '/transversal-api/api/v1/ReferenceTable/get-reference-tables', requestDto).pipe(map((data) => {
      return {
        codeId: data.codeId,
        message: data.message,
        data: data.data.map((data) => { return TablesMapper.referentialTablesApiToDomain(data) })
      }
    }))
  }

  getCountries(languageId: number, isCurrent: number, onlyAssetsToBuildLoyalty: number): Observable<ResponseBaseModel<GenericListResponseModel[]>> {
    return this.http.get<ResponseBaseDto<DavipolaResponseDto[]>>(environment.apiValepro + `/transversal-api/api/v1/divipola/get-countries?languageId=${languageId}&isCurrent=${isCurrent}&onlyAssetsToBuildLoyalty=${onlyAssetsToBuildLoyalty}`)
      .pipe(map(response => {
        return {
          codeId: response.codeId,
          message: response.message,
          data: response.data.map(data => TablesMapper.davipolaApiToDomain(data))
        }
      }));
  }


  getCities(languageId: number, countryCode: string, departmentCode: string, regionCode: string): Observable<ResponseBaseModel<GenericListResponseModel[]>> {
    return this.http.get<ResponseBaseDto<DavipolaResponseDto[]>>(environment.apiValepro + `/transversal-api/api/v1/divipola/get-cities?languageId=${languageId}&countryCode=${countryCode}&departmentCode=${departmentCode}&regionCode=${regionCode}&regionCode=${regionCode}`)
      .pipe(map(response => {
        return {
          codeId: response.codeId,
          message: response.message,
          data: response.data.map(data => TablesMapper.davipolaApiToDomain(data))
        }
      }));
  }

  getDepartments(languageId: number, countryCode: string): Observable<ResponseBaseModel<GenericListResponseModel[]>> {
    return this.http.get<ResponseBaseDto<DavipolaResponseDto[]>>(environment.apiValepro + `/transversal-api/api/v1/divipola/get-departments?languageId=${languageId}&countryCode=${countryCode}`)
      .pipe(map(response => {
        return {
          codeId: response.codeId,
          message: response.message,
          data: response.data.map(data => TablesMapper.davipolaApiToDomain(data))
        }
      }));
  }

  getClusters(programId: number): Observable<ResponseBaseModel<GenericListResponseModel[]>> {
    return this.http.get<ResponseBaseDto<ClustersDto[]>>(environment.apiValepro + `/program-public-api/api/v1/CLuster/get-clusters?ProgramId=${programId}`)
      .pipe(map((response) => {
        return {
          codeId: response.codeId,
          message: response.message,
          data: response.data.map((data) => { return TablesMapper.clusterApiToDomain(data) })
        }
      }));

  }
}
