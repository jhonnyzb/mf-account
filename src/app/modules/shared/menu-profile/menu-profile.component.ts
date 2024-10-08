import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { getSession, saveSession } from "src/app/core/encryptData";
import { DialogParams } from "src/app/core/models/gtm-models/dialogParams.model";
import { GTMSelectContent } from "src/app/core/models/gtm-models/gtmSelectContent.model";
import { LoginValeproResponseModel } from "src/app/core/models/response/loginValeproResponse.model";
import { DialogService } from "src/app/infrastructure/services/dialog.service";
import { ConfigUtil } from "src/app/utils/ConfigUtil";


@Component({
  selector: "app-menu-profile",
  templateUrl: "./menu-profile.component.html",
  styleUrls: ["./menu-profile.component.scss"],
})
export class MenuProfileComponent implements OnInit {
  @Input() contentClass!: string;

  menuProfile: any[] = [];

  selectedOption: any;
  @Output() chooseOption = new EventEmitter();
  user: LoginValeproResponseModel;

  constructor(
    private router: Router,
    private configUtil: ConfigUtil,
    private dialogService: DialogService,
  ) {
    if (sessionStorage.getItem("menuSelectedOption") != null) {
      this.selectedOption =
        getSession('menuSelectedOption');
    }
    setTimeout(() => {
      this.getMenu();
    }, 400);

    this.user = getSession<LoginValeproResponseModel>('accountValepro');
  }

  ngOnInit(): void {
    this.getMenu();
  }

  getMenu(data?: any) {
    this.menuProfile = [];
    let menu = getSession('menuProfile');
    Object.values(menu).forEach((item: any) => {
      this.menuProfile.push(item);
    });
  }

  misPuntos() {
    this.router.navigate(["/main/account/points"]);
  }

  logout() {
    let dialogParams: DialogParams = {
      success: false,
      confirmText: "Sí",
      msg: undefined,
      page: undefined
    };
    this.dialogService
      .openConfirmDialog("¿Estás seguro que quieres cerrar sesión?", dialogParams)
      .afterClosed()
      .subscribe((confirmado: boolean) => {
        if (confirmado) {
          this.sendGtmLogoutData();
          this.configUtil.logout();
          this.router.navigate(['/login']);
        }
      });

  }

  goTo(item: any) {
    this.chooseOption.emit()
    this.sendGtmData(item);
    if (item.NombreObjeto == "logout-system") {
      this.logout();
      return;
    }
    saveSession(JSON.stringify(item.Nombre), 'menuSelectedOption');
  }

  sendGtmData(descripcion: any) {
    let tagData: GTMSelectContent = {
      event: "select_content",
      ParameterTarget: "Home",
      ParameterLocation: "Cabecera",
      ParameterType: 'Botón',
      ParameterCategory: "Perfil de Usuario",
      IDAccount: this.user.AccountId,
      IDProgram: this.user.ProgramId,
      IDPerson: this.user.PersonId,
      UserName: this.user.UserName,
      ParameterText: descripcion.Nombre,
      ParameterItemID: descripcion.IDPagina,
      Currency: "",
      value: ""
    };
    window.parent.postMessage(JSON.stringify(tagData), '*');
  }

  sendGtmLogoutData() {
    let tagData: GTMSelectContent = {
      event: "select_content",
      ParameterTarget: "Perfil",
      ParameterLocation: "Perfil - Cerrar sesión",
      ParameterType: "botón",
      ParameterCategory: "Cerrar sesión",
      UserName: this.user.UserName,
      IDAccount: this.user.AccountId,
      IDProgram: this.user.ProgramId,
      IDPerson: this.user.PersonId,
      ParameterText: "Cerrar sesión - confirmación",
      ParameterItemID: "0",
      Currency: "",
      value: ""
    };
    window.parent.postMessage(JSON.stringify(tagData), '*');

  }
}
