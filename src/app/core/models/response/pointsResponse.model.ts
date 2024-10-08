export class Point {
    constructor(
        public PointsAvaliable: number,
        public PointsAboutToExpire: number,
        public NextExpirationDate: string,
        public Data: Transaction[],
        public Pagination: Pagination
    ) { }
}


export class Transaction {
    constructor(
        public TransactionId: number,
        public TransactionType: number,
        public Detail: string,
        public Date: string,
        public Points: number
    ) { }
}

export class Pagination {
    constructor(
        public PageSize: number,
        public PageNumber: number,
        public TotalElements: number,
        public TotalPages: number
    ) { }
}


export class PointsModel {
    constructor(
        public MyPoints: Point
    ) { }
}
