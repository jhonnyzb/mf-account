export interface UpdateUserPropertiesResponseDto{
  formAttributes: GetUserUpdateResponseDto[];
}

export interface GetUserUpdateResponseDto {
    formAttributeId: number
    label: string
    placeholder: string
    name: string
    type: string
    regularExpression: string | null
    length: number | null
    dataSource: number | null
    required: boolean
    editable: boolean
    value: string,
    errorMessageRegularExpression: string | null
  }
