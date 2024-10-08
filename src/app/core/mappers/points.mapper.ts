import { PointsDto } from "src/app/infrastructure/dto/response/pointsResponse.dto";
import { PointsModel } from "../models/response/pointsResponse.model";


export class PointsMapper {
    static fromApiToDomain(dto: PointsDto): PointsModel {
        return {
            MyPoints: {
                PointsAvaliable: dto.myPoints.pointsAvaliable,
                PointsAboutToExpire: dto.myPoints.pointsAboutToExpire,
                NextExpirationDate: dto.myPoints.nextExpirationDate,
                Data: dto.myPoints.data.map((item, _) => {
                    return {
                        TransactionId: item.transactionId,
                        TransactionType: item.transactionType,
                        Detail: item.detail,
                        Date: item.date,
                        Points: item.points
                    }
                }),
                Pagination : {
                    PageSize : dto.myPoints.pagination.pageSize,
                    PageNumber: dto.myPoints.pagination.pageNumber,
                    TotalPages: dto.myPoints.pagination.totalPages,
                    TotalElements : dto.myPoints.pagination.totalElements

                }

            }
        };
    }
}