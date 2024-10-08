export class SendCodeRequestModel {
    constructor(
        public ConceptId: number
    ) { }
}

export class SendCodeResponseModel {
    constructor(
        public success: boolean,
        public hiddenEmail: string,
        public hiddenPhone: string
    ) { }
}
