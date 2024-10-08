import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ContactUsRequestModel } from "../models/request/contact-us.model";
import { ResponseBaseModel } from "../models/response/responseBase.model";

@Injectable({
    providedIn: 'root'
})
export abstract class ContactUsRepository {
    abstract contactSalesForce(contactUs: ContactUsRequestModel): Observable<ResponseBaseModel<null>>;
}
