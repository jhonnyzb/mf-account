
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDetailByIdModel } from '../models/response/productDetail.model';
import { ResponseBaseModel } from '../models/response/responseBase.model';




@Injectable({
  providedIn: 'root'
})
export abstract class ProductRepository {
 
  abstract getProductId(productId: number): Observable<ResponseBaseModel<ProductDetailByIdModel>>;
 
}