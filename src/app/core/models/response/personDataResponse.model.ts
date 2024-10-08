export class PersonDataResponseModel {
  constructor(
    public personId: number,
    public accountId: number,
    public programId: number,
    public person: PersonResponseModel
  ) { }
}

export class PersonResponseModel {
  constructor(
    public personTypeId: number,
    public personTypeName: string,
    public identificationTypeId: number,
    public identificationTypeName: string,
    public identificationNumber: string,
    public verificationDigit: any,
    public names: string,
    public lastNames: string,
    public genderId: number,
    public genderName: string,
    public civilStatusId: any,
    public civilStatusName: string,
    public typePhoneId1: number,
    public typePhoneName1: string,
    public phone1: string,
    public telephoneExtension1: string,
    public typePhoneId2: any,
    public typePhoneName2: string,
    public phone2: string,
    public telephoneExtension2: string,
    public email: string,
    public stratumId: number,
    public stratumName: string,
    public statusId: number,
    public statusName: string,
    public fullName: string,
    public addressResidence: string,
    public neighborhoodResidence: string,
    public cityResidenceId: string,
    public cityResidenceName: string,
    public stateProvinceResidenceId: string,
    public stateProvinceResidenceName: string,
    public countryResidenceId: number,
    public countryResidenceName: string,
    public account: AccountResponseModel
  ) { }
}

export class AccountResponseModel {
  constructor(
    public affiliationDate: string,
    public statusId: number,
    public statusName: string,
    public statusDate: string,
    public desaffiliationDate: any,
    public observations: string,
    public clusterId: number,
    public clusterName: string,
    public acceptHabeasData: boolean,
    public acceptTermsAndConditions: boolean,
    public dateAcceptTermsAndConditions: string,
    public fromPublicCreation: boolean,
    public pointsBalance: number,
    public pointsIssued: number,
    public pointName: string,
    public affiliation: AffiliationResponseModel
  ) { }
}

export class AffiliationResponseModel {
  constructor(
    public affiliationId: number,
    public agencyId: number,
    public agencyName: string,
    public regionals: any,
    public affiliationDate: string,
    public desaffiliationDate: string,
    public affiliationClassId: number,
    public affiliationClassName: string,
    public externalCode: string
  ) { }
}
