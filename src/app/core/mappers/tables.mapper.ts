import { ClustersDto } from "../../infrastructure/dto/response/clustersList.dto";
import { DavipolaResponseDto } from "../../infrastructure/dto/response/davipolaResponse.dto";
import { ReferentialTableResponseDto } from "../../infrastructure/dto/response/referentialTable.dto";
import { GenericListResponseModel } from "../models/response/genericResponse.model";

export class TablesMapper{

  static davipolaApiToDomain(dto:  DavipolaResponseDto): GenericListResponseModel {
    return {
      codeId: Number(dto.codeId),
      name: capitalizeString(dto.name)
    }
  }

  static clusterApiToDomain(dto:  ClustersDto): GenericListResponseModel {
    return {
      codeId: Number(dto.clusterId),
      name: dto.name
    }
  }

  static referentialTablesApiToDomain(dto: ReferentialTableResponseDto): GenericListResponseModel {
    return {
      codeId: Number(dto.codeId),
      name: dto.description1
    }
  }
}

function capitalizeString(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
