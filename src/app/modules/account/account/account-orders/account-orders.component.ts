
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MixPaymentdDto } from 'src/app/infrastructure/dto/request/mixPayment.dto';
import { GTMSelectContent } from 'src/app/core/models/gtm-models/gtmSelectContent.model';
import { CartUtil } from 'src/app/utils/CartUtil';
import { ProgramUtil } from 'src/app/utils/ProgramUtil';
import { DialogService } from 'src/app/infrastructure/services/dialog.service';
import { getSession } from 'src/app/core/encryptData';
import { LoginValeproResponseModel } from 'src/app/core/models/response/loginValeproResponse.model';

@Component({
  selector: 'app-account-orders',
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.scss']
})
export class AccountOrdersComponent implements OnInit {

  mixPayment!: MixPaymentdDto;
  user: LoginValeproResponseModel = getSession<LoginValeproResponseModel>('accountValepro');
  initialRegis = 0;
  itemsPerPage = 5;
  itemsOrder: any = [];
  item: any = {};
  totalItems = 0;
  currentPage: number = 1;
  isLoading = false;
  totalPuntos: number = 0;
  CANCELADO = "Cancelado (a)"
  public counts = ["En preparación", "En camino", "Entregado"];
  public orderStatus = "En preparación"


  constructor(
    private dialogService: DialogService,
    private router: Router,
    private programUtil: ProgramUtil,


    private cartUtil: CartUtil
  ) {
    this.user = getSession<LoginValeproResponseModel>('accountValepro');
   }

  ngOnInit(): void {
    this.mixPayment = this.programUtil.getLocalMixPayment();
  }

  setStatusClassById(idEstado: number) {
    let trackingClass = "";
    switch (idEstado) {

      case 1:
        trackingClass = "in-preparation";
        break;
      case 2:
        trackingClass = "in-preparation";
        break;
      case 43:
        trackingClass = "in-preparation";
        break;
      case 22:
        trackingClass = "in-transit";
        break;
      case 7:
        trackingClass = "canceled";
        break;
      case 25:
        trackingClass = "delivered";
        break;
    }
    return "round-status " + trackingClass;
  }

  //paginador
  pageChanged(page: number) {
    this.currentPage = page;
    this.calculateNextRegister(page);
  }

  calculateNextRegister(page: number) {
    this.initialRegis = (page * this.itemsPerPage) - this.itemsPerPage;
  }
  goCatalog() {
    this.router.navigateByUrl('/main/catalog')
  }
  goContact() {
    this.router.navigateByUrl('/main/account/contact')
  }
  reintentPay(product: any) {
    this.sendGtmDataCart('Reintentar pago', product);
    let url = this.programUtil.getLocalMixPayment().RedirecionAppUrl;
    window.open(url + '?IDPedido=' + product.IDPedido + '&webAppRequest=true', '_blank');
    this.router.navigate(['/main']);
  }

  status(product: any) {
    this.sendGtmDataCart("Ver Resumen", product);
    this.router.navigate(['/main/account/order-status'], { queryParams: { idOrder: product.IDPedido } });
  }

  addCart(product: any) {
    this.cartUtil.addProduct(product, product.Cantidad, "");
    this.router.navigate(['main/redeem/order-detail']);
  }

  sendGtmDataCart(parameterText: string, product: any) {
    let tagData: GTMSelectContent = {
      event: "select_content",
      ParameterLocation: "Perfil - Mis pedidos",
      ParameterType: "botón",
      ParameterCategory: "Perfil",
      ParameterTarget: "Perfil",
      IDAccount: this.user.AccountId,
      IDProgram: this.user.ProgramId,
      IDPerson: this.user.PersonId,
      UserName: this.user.UserName,
      ParameterText: `Mis pedidos - ` + parameterText,
      ParameterItemID: product.IDPedido.toString(),
      Currency: '',
      value: ''
    };
    window.parent.postMessage(JSON.stringify(tagData), '*');
  }

}
