export interface ProductByIdResponseDto {
    award: ProductDetailDto,
  }
  
  export interface ProductDetailDto {
    awardId: number,
    awardIdERP: number,
    code: string,
    type: string,
    secondaryCode: string,
    supplierReference: string,
    status: boolean,
    shortName: string,
    longName: string,
    description: string,
    brandId: string,
    brandName: string,
    costCenterId: string,
    weight: number,
    categoryName: string,
    categoryId: number,
    color: string,
    programId: number,
    points: number,
    cost: number,
    combo: boolean,
    observations: string,
    warrantyNotes: string,
    productCharacteristics: ProductCharacteristicDto[],
    profitabilityPercentage: number,
    energizerCatalogue: boolean,
    feature: boolean,
    productClass: number,
    category: CategoryDto,
    awardImages: ProductImageDto[],
    productClassAuxiliaryMessage: string,
  }
  
  export interface CategoryDto {
    categoryId: number,
    name: string,
    iconName: string,
    programId: number,
  }
  
  export interface ProductImageDto {
    awardImageId: number,
    awardId: number,
    imageName: string,
    imagePath: string,
  }
  
  
  export interface ProductCharacteristicDto {
    id: number,
    name: string,
    value: string,
  }
  