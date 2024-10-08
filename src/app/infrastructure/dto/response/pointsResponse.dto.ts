export interface PointDto {
    pointsAvaliable: number;
    pointsAboutToExpire: number;
    nextExpirationDate: string;
    data: TransactionsDto[];
    pagination: PaginationDto;
}


export interface TransactionsDto {
    transactionId: number;
    transactionType: number;
    detail: string;
    date: string;
    points: number;
}

export interface PaginationDto {
    pageSize: number;
    pageNumber: number;
    totalElements: number;
    totalPages: number;
}


export interface PointsDto {
    myPoints: PointDto;
}
