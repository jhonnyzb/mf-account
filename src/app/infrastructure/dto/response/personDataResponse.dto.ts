export interface PersonDataResponseDto {
  personId: number
  accountId: number
  programId: number
  person: PersonResponseDto
}

export interface PersonResponseDto {
  personTypeId: number
  personTypeName: string
  identificationTypeId: number
  identificationTypeName: string
  identificationNumber: string
  verificationDigit: any
  names: string
  lastNames: string
  genderId: number
  genderName: string
  civilStatusId: any
  civilStatusName: string
  typePhoneId1: number
  typePhoneName1: string
  phone1: string
  telephoneExtension1: string
  typePhoneId2: any
  typePhoneName2: string
  phone2: string
  telephoneExtension2: string
  email: string
  stratumId: number
  stratumName: string
  statusId: number
  statusName: string
  fullName: string
  addressResidence: string
  neighborhoodResidence: string
  cityResidenceId: string
  cityResidenceName: string
  stateProvinceResidenceId: string
  stateProvinceResidenceName: string
  countryResidenceId: number
  countryResidenceName: string
  account: AccountResponseDto
}

export interface AccountResponseDto {
  affiliationDate: string
  statusId: number
  statusName: string
  statusDate: string
  desaffiliationDate: any
  observations: string
  clusterId: number
  clusterName: string
  acceptHabeasData: boolean
  acceptTermsAndConditions: boolean
  dateAcceptTermsAndConditions: string
  fromPublicCreation: boolean
  pointsBalance: number
  pointsIssued: number
  pointName: string
  affiliation: AffiliationResponseDto
}

export interface AffiliationResponseDto {
  affiliationId: number
  agencyId: number
  agencyName: string
  regionals: any
  affiliationDate: string
  desaffiliationDate: string
  affiliationClassId: number
  affiliationClassName: string
  externalCode: string
}
