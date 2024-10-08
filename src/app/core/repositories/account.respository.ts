import { Observable } from "rxjs";
import { PointsModel } from "../models/response/pointsResponse.model";
import { ResponseBaseDto } from "src/app/infrastructure/dto/response/responseBase.dto";

export abstract class AccountRepository{
  abstract getTransactionsPoints(page: number, pageSize: number): Observable<ResponseBaseDto<PointsModel>>;

}
