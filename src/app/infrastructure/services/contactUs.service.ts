import { Injectable, inject } from '@angular/core';
import { ResponseBaseModel } from '../../core/models/response/responseBase.model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environment.ts/environment';
import { ContactUsRepository } from 'src/app/core/repositories/contact-us.repository';
import { ContactUsRequestModel } from 'src/app/core/models/request/contact-us.model';
import { ContactUsFormMapper } from 'src/app/core/mappers/contactUs.mapper';

@Injectable({
    providedIn: 'root'
})
export class ContactUsService implements ContactUsRepository {

    http: HttpClient = inject(HttpClient);

    contactSalesForce(data: ContactUsRequestModel): Observable<ResponseBaseModel<any>> {
        let request = ContactUsFormMapper.ContactUsFormDomainToApi(data);
        return this.http.post<ResponseBaseModel<null>>(environment.apiValepro + `/affiliations-api/api/v1/ContactSalesForce/post-send-salesforce`, request)
            .pipe(
                map((data: ResponseBaseModel<any>) => {
                    return data;
                }),
                catchError((error: HttpErrorResponse) => {
                    return throwError(() => new ResponseBaseModel(
                        error.error.CodeId,
                        error.error.Message,
                        error.error.Data
                    ));
                })
            );
    }
}
