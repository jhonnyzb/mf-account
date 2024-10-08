import { CategoryModel } from "./categories.model";


export class ProductDetailByIdModel {
    constructor(
      public Award: ProductDetailModel,
    ) { }
  }
  
  export class ProductDetailModel {
    constructor(
      public AwardId: number,
      public AwardIdERP: number,
      public Code: string,
      public Type: string,
      public SecondaryCode: string,
      public SupplierReference: string,
      public Status: boolean,
      public ShortName: string,
      public LongName: string,
      public Description: string,
      public BrandId: string,
      public BrandName: string,
      public CostCenterId: string,
      public Weight: number,
      public CategoryName: string,
      public CategoryId: number,
      public Color: string,
      public ProgramId: number,
      public Points: number,
      public Cost: number,
      public Combo: boolean,
      public Observations: string,
      public WarrantyNotes: string,
      public ProductCharacteristics: ProductCharacteristicModel[],
      public ProfitabilityPercentage: number,
      public EnergizerCatalogue: boolean,
      public Feature: boolean,
      public ProductClass: number,
      public Category: CategoryModel,
      public AwardImages: ProductImageModel[],
      public ProductClassAuxiliaryMessage: string,
    ) { }
  }
  
  
  export class ProductImageModel {
    constructor(
      public AwardImageId: number,
      public AwardId: number,
      public ImageName: string,
      public ImagePath: string,
    ) { }
  }
  
  
  export class ProductCharacteristicModel {
    constructor(
      public Id: number,
      public Name: string,
      public Value: string,
  
    ) { }
  }
  
  
