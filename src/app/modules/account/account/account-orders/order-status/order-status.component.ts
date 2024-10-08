import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { getSession } from "src/app/core/encryptData";
import { LoginValeproResponseModel } from "src/app/core/models/response/loginValeproResponse.model";
import { CartUtil } from "src/app/utils/CartUtil";

@Component({
  selector: "app-order-status",
  templateUrl: "./order-status.component.html",
  styleUrls: ["./order-status.component.scss"],
})
export class OrderStatusComponent implements OnInit {
  currentPage: number = 1;
  initialRegis = 0;
  itemsPerPage = 5;
  totalItems = 0;
  itemsOrder :any[]= [];
  address: any[] = [];
  lstPremios: any[] = [];
  IDPedido: any ;
  totalPuntos: number = 0;
  principalAddress: any = {};
  listaPremios: any = {};
  user: LoginValeproResponseModel = getSession<LoginValeproResponseModel>('accountValepro');
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartUtil: CartUtil
  ) { }
  //
  ngOnInit(): void {

    this.IDPedido = this.route.snapshot.queryParamMap.get("idOrder");
    this.getUser();
  }

  getUser() {
    this.user = getSession<LoginValeproResponseModel>('accountValepro');
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.calculateNextRegister(page);
  }

  calculateNextRegister(page: number) {
    this.initialRegis = page * this.itemsPerPage - this.itemsPerPage;
  }

  setStatusClassById(idEstado: number) {
    let trackingClass = "";
    switch (idEstado) {
      case 1:
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
  addCart() {
    this.itemsOrder.forEach((product:any) => {
      product.Imagen = product.ImagenPremio;
      this.cartUtil.addProduct(product, product.Cantidad, "");
    });
    this.router.navigate(['main/redeem/order-detail']);
  }
}
