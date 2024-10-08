import { NgModule } from "@angular/core";
import { AccountComponent } from "./account.component";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { AccountOrdersComponent } from "./account-orders/account-orders.component";
import { MyPointsComponent } from "./my-points/my-points.component";
import { OrderStatusComponent } from "./account-orders/order-status/order-status.component";
import { CommonModule } from "@angular/common";
import { AccountRoutingModule } from "./account-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { UiModule } from "../../ui.module";
import { RecaptchaModule } from "ng-recaptcha";
import { SharedModule } from "../../shared/shared.module";
import { PasswordChangeRepository } from "src/app/core/repositories/passwordChange.repository";
import { PasswordChangeService } from "src/app/infrastructure/services/password-change.service";
import { FormUpdateDataComponent } from "./form-update-data/form-update-data.component";
import { MenuProfileComponent } from "./menu-profile/menu-profile.component";
import { AccountRepository } from "src/app/core/repositories/account.respository";
import { AccountService } from "src/app/infrastructure/services/account.service";
import { DetailAccountComponent } from "./detail-account/detail-account.component";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { ProductRepository } from "src/app/core/repositories/product.repository";
import { ProductService } from "src/app/infrastructure/services/product.service";
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ToastGenericService } from "src/app/infrastructure/services/toast-generic.service";
import { ToastGenericRepository } from "src/app/core/repositories/toastGeneric.repository";
import { CodeRepository } from "src/app/core/repositories/code.respository";
import { CodeService } from "src/app/infrastructure/services/code.service";

@NgModule({
  declarations: [
    AccountComponent,
    DetailAccountComponent,
    ChangePasswordComponent,
    AccountOrdersComponent,
    MyPointsComponent,
    OrderStatusComponent,
    FormUpdateDataComponent,
    MenuProfileComponent,
    ContactUsComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    UiModule,
    RecaptchaModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [
    { provide: PasswordChangeRepository, useClass: PasswordChangeService },
    { provide: AccountRepository, useClass: AccountService },
    { provide: ProductRepository, useClass: ProductService },
    { provide: ToastGenericRepository, useClass: ToastGenericService },
    { provide: CodeRepository, useClass: CodeService},
  ]

})

export class AccountModule { }
