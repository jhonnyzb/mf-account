export interface validateCodeRequestDto {
   ConceptId: number
   OtpCode: string
}
export interface validateCodeResponseDto {
   verified: boolean
}