export class ContactUsRequestModel {
    constructor(
        public AccountId: number,
        public CodeId: number,
        public OrderId: number,
        public Message: string
    ) { }
}
