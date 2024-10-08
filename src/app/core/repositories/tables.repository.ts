import { Observable } from "rxjs";
import { GenericListResponseModel } from "../models/response/genericResponse.model";
import { ResponseBaseModel } from "../models/response/responseBase.model";

export abstract class TablesRepository{
  abstract getReferentialData(tableId: number, languageId: number): Observable<ResponseBaseModel<GenericListResponseModel[]>>;
  abstract getClusters(programId: number): Observable<ResponseBaseModel<GenericListResponseModel[]>>;
  abstract getCountries(languageId: number, isCurrent: number, onlyAssetsToBuildLoyalty: number): Observable<ResponseBaseModel<GenericListResponseModel[]>>;
  abstract getDepartments(languageId: number, countryCode: string): Observable<ResponseBaseModel<GenericListResponseModel[]>>;
  abstract getCities(languageId: number, countryCode: string, departmentCode: string, regionCode?:string): Observable<ResponseBaseModel<GenericListResponseModel[]>>;
}
