import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { getSession, saveSession } from "src/app/core/encryptData";
import { DialogParams } from "src/app/core/models/gtm-models/dialogParams.model";
import { GTMSelectContent } from "src/app/core/models/gtm-models/gtmSelectContent.model";
import { FastMenuItemModel } from "src/app/core/models/response/fastMenuItem.model";
import { GetQuickMenuModel } from "src/app/core/models/response/fastMenuListResponse.model";
import { LoginValeproResponseModel } from "src/app/core/models/response/loginValeproResponse.model";
import { DialogService } from "src/app/infrastructure/services/dialog.service";
import { ConfigUtil } from "src/app/utils/ConfigUtil";


@Component({
  selector: "app-menu-profiles",
  templateUrl: "./menu-profile.component.html",
  styleUrls: ["./menu-profile.component.scss"],
})
export class MenuProfileComponent implements OnInit {
  @Input() contentClass!: string;

  selectedOption: any;
  @Output() chooseOption = new EventEmitter();
  user: LoginValeproResponseModel;
  menu: GetQuickMenuModel = getSession<GetQuickMenuModel>('menuProfile');
  listMenu: FastMenuItemModel[] = [];
  iconMenuUser: string;

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

  getMenu() {
    this.menu = getSession<GetQuickMenuModel>('menuProfile');
    this.listMenu = this.menu.MenuItems.filter(x => x.Active);
  }

  getIconForPath(path: string): string {
    switch (path) {
      case "/main/account/detail-account":
        return 'person';
      case "/main/dashboard/monitoring-report":
        return 'insert_drive_file';
      case "/main/account/my-orders":
        return 'local_shipping';
      case "/main/account/points":
        return 'flag';
      case "/main/account/change-password":
        return 'lock';
      default:
        return 'star';
    }
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
