
import { ProductCharacteristicModel, ProductDetailByIdModel, ProductDetailModel, ProductImageModel } from "../models/response/productDetail.model";
import { CategoryModel } from "../models/response/categories.model";
import { CategoryDto, ProductByIdResponseDto, ProductCharacteristicDto, ProductDetailDto, ProductImageDto } from "src/app/infrastructure/dto/response/productsById.dto";
export class ProductMapper {

  static mapResponseProductImage(dto: ProductImageDto): ProductImageModel {
    return new ProductImageModel(
      dto.awardImageId,
      dto.awardId,
      dto.imageName,
      dto.imagePath
    );
  }

  static mapResponseAwardCharacteristics(dto: ProductCharacteristicDto): ProductCharacteristicModel {
    return new ProductCharacteristicModel(
      dto.id,
      dto.name,
      dto.value
    );
  }

  static mapResponseCategory(dto: CategoryDto): CategoryModel {
    return new CategoryModel(
      dto.categoryId,
      dto.name,
      dto.iconName,
      dto.programId
    );
  }

  static ProductByIdFromApitoDomain(dto: ProductDetailDto): ProductDetailModel {
    return new ProductDetailModel(
      dto.awardId,
      dto.awardIdERP,
      dto.code,
      dto.type,
      dto.secondaryCode,
      dto.supplierReference,
      dto.status,
      dto.shortName,
      dto.longName,
      dto.description,
      dto.brandId,
      dto.brandName,
      dto.costCenterId,
      dto.weight,
      dto.categoryName,
      dto.categoryId,
      dto.color,
      dto.programId,
      dto.points,
      dto.cost,
      dto.combo,
      dto.observations,
      dto.warrantyNotes,
      dto.productCharacteristics.length > 0 ? dto.productCharacteristics.map((variable) => this.mapResponseAwardCharacteristics(variable)) : [],
      dto.profitabilityPercentage,
      dto.energizerCatalogue,
      dto.feature,
      dto.productClass,
      this.mapResponseCategory(dto.category),
      dto.awardImages.length > 0 ? dto.awardImages.map((variable) => this.mapResponseProductImage(variable)) : [],
      dto.productClassAuxiliaryMessage
    );
  }

  static mapResponseProductByIdApiToDomain(dto: ProductByIdResponseDto): ProductDetailByIdModel {
    return new ProductDetailByIdModel(
      this.ProductByIdFromApitoDomain(dto.award)
    );
  }

}
