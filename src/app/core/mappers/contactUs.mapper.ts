import { ContactUsRequestDto } from "src/app/infrastructure/dto/request/contactUsRequest.dto";
import { ContactUsRequestModel } from "../models/request/contact-us.model";

export class ContactUsFormMapper {

    static ContactUsFormDomainToApi(model: ContactUsRequestModel): ContactUsRequestDto {
        return model
    }

}
