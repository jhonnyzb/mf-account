import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpCacheService {
  objectToParams(obj: any) {
    let params = Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&');
    return params ? '?' + params : '';
  }
}
