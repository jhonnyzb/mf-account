
import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { UiModule } from "./ui.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CodeInputModule } from "angular-code-input";
import { MatConfirmDialogComponent } from "./mat-confirm-dialog/mat-confirm-dialog.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { TablesRepository } from "src/app/core/repositories/tables.repository";
import { TablesService } from "src/app/infrastructure/services/tables.service";
import { UserRepository } from "src/app/core/repositories/user.respository";
import { UserService } from "src/app/infrastructure/services/user.service";
import { MenuProfileComponent } from "./menu-profile/menu-profile.component";
import { MatConfirmAwardComponent } from "./mat-confirm-award/mat-confirm-award.component";
import { MatCodeValidateComponent } from "./mat-code-validate/mat-code-validate.component";
import { MatRequestGenerateCodeDialogComponent } from "./mat-request-generate-code-dialog/mat-request-generate-code-dialog.component";

@NgModule({
  declarations: [
    SpinnerComponent,
    MatConfirmDialogComponent,
    MenuProfileComponent,
    MatConfirmAwardComponent,
    MatCodeValidateComponent,
    MatRequestGenerateCodeDialogComponent
  ],
  exports: [
    SpinnerComponent,
    MatConfirmDialogComponent,
    MenuProfileComponent,
    MatConfirmAwardComponent,
    MatCodeValidateComponent,
    MatRequestGenerateCodeDialogComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CodeInputModule.forRoot({
      codeLength: 6,
      isCharsCode: false,
      code: ''
    }),
  ],
  providers: [
    { provide: TablesRepository, useClass: TablesService },
    { provide: UserRepository, useClass: UserService },
    DatePipe
  ]
})
export class SharedModule { }
