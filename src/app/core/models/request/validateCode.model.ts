export class validateCodeRquesteModel {
 constructor(
    public ConceptId: number,
    public OtpCode: string
 ){}
}
export class validateCodeResponseModel {
 constructor(
    public verified: boolean
 ){}
}