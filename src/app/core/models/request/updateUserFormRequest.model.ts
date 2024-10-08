export class UpdateUserRequestModel {
  constructor(
    public userId: string,
    public programId: number,
    public referenceTableId: number,
    public isWebResponsive: boolean = false,
    public attributes: AttributeModel[]
  ) {}
}

export class AttributeModel {
  constructor(
    public formAttributeId: number,
    public value: string
  ) {}
}
