export class UpdateUserRequestDto {
 userId?: string;
 programId?: number;
 referenceTableId?: number;
 isWebResponsive: boolean = false;
 attributes?: AttributeDto[]

}

export class AttributeDto {
 formAttributeId?: number;
 value?: string
}
