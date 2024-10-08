export interface SendCodeRequestDto{
    ConceptId: number
}

export interface SendCodeResponseDto {
    success: boolean
    hiddenEmail: string
    hiddenPhone: string
}
