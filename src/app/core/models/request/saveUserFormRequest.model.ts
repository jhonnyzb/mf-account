import { GenericListResponseModel } from "../response/genericResponse.model";

export class SaveUserRequestModel {
  constructor(
    public programId: number,
    public referenceTableId: number,
    public attributes: AttributeModel[]
  ) {}
}

export class AttributeModel {
  constructor(
    public formAttributeId: number,
    public value: string
  ) {}
}
