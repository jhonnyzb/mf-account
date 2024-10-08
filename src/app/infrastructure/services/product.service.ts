import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ProductDetailByIdModel } from 'src/app/core/models/response/productDetail.model';
import { ResponseBaseModel } from 'src/app/core/models/response/responseBase.model';
import { ProductRepository } from 'src/app/core/repositories/product.repository';
import { ProductByIdResponseDto } from '../dto/response/productsById.dto';
import { ProductMapper } from 'src/app/core/mappers/product.mapper';
import { ErrorResponseModel } from 'src/app/core/models/response/responseError.model';
import { environment } from 'src/environment.ts/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService implements ProductRepository {

  private baseUrl = '/award-catalogs-api/api/v1';
  constructor(
    private http: HttpClient,
  ) { }

  getProductId(productId: number): Observable<ResponseBaseModel<ProductDetailByIdModel>> {
    return this.http.get<ResponseBaseModel<ProductByIdResponseDto>>(`${environment.apiValepro}${this.baseUrl}/Awards/get-award-by-id?AwardId=${productId}`)
      .pipe(
        map(response => {
          return {
            codeId: response.codeId,
            message: response.message,
            data: ProductMapper.mapResponseProductByIdApiToDomain(response.data)
          }
        }),
        catchError((error: HttpErrorResponse) => {
          let errorResponse: ResponseBaseModel<ErrorResponseModel[]> = {
            codeId: error.error.codeId,
            message: error.error.Message,
            data: error.error.Data
          }
          return throwError(() => errorResponse);
        }))
  }
}
