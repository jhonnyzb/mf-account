
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export abstract class AddressRepository {

  abstract getAddress(AccountId: number): Observable<any>;

}
