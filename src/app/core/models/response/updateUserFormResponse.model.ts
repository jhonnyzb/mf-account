import { GenericListResponseModel } from "./genericResponse.model";

export class UpdateUserPropertiesResponseModel{
  constructor(public FormAttributes: GetUserAffiliationResponseModel[]) {}
}


export class GetUserAffiliationResponseModel {
  constructor(
    public FormAttributeId: number,
    public Label: string,
    public Placeholder: string,
    public Name: string,
    public Type: string,
    public RegularExpression: string,
    public Length: number,
    public DataSource: number,
    public Required: boolean,
    public Editable: boolean,
    public Value: string,
    public listAsigned: GenericListResponseModel[],
    public errorMessageRegularExpression: string,
  ) { }
}
