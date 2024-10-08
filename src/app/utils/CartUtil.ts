
import { Injectable } from "@angular/core";
import { MixedPaymentValueResponseDto } from "../infrastructure/dto/response/mixedPaymentValueResponse.dto";
import { getSession, saveSession } from "../core/encryptData";


@Injectable({
  providedIn: 'root'
})
export class CartUtil {
  mostrarNota!: boolean;

  numberOfCartItemsEvent(cartItems: number) {
    const miEvento = new CustomEvent('numberOfCartItemsEvent', { detail: cartItems });
    document.dispatchEvent(miEvento);
  }

  mapProduct(product: any, counter: any, params: any) {
    return {
      ProductId: product.IDPremio,
      CategoryId: product.IDCategoria,
      CampaingId: product.IDCampana,
      CatalogId: product.IDCatalogo,
      Image: product.Imagen,
      Points: product.Puntos ? product.Puntos : product.PuntosXUnidad,
      PointName: product.NombrePunto,
      UUID: product.UUID,
      Name: product.Nombre,
      NameShort: product.NombreCorto,
      Description: product.Descripcion,
      MinimunAmount: product.CantidadMinARedimir,
      Amount: counter,
      ClassId: product.IDClasePremio,
      DeliveryType: product.TipoEntrega,
      Params: params,
      ParametrosRedimir: product.ParametrosRedimir,
      SolicitaConfirmacionDatos: product.SolicitaConfirmacionDatos
    };
  }

  addProduct(data: any, counter: any, params: any) {
    let cart = this.getCart();
    let product = this.mapProduct(data, counter, params);
    if (this.isProductIn(cart, product)) {
      //actualizar cantidad del producto en el carrito
      this.updateProduct(cart, product);
      this.saveCart(cart);
      return;
    }
    //agregar al carrito
    cart.push(product);
    this.saveCart(cart);
  }


  calculateTotalPoints() {
    let cart = this.getCart();
    let result = 0;
    for (let index = 0; index < cart.length; index++) {
      const element = cart[index];
      result += element.Amount * element.Points;
    }
    return result;
  }

  isProductIn(cart: any[], product: any) {
    let result = false;
    for (let index = 0; index < cart.length; index++) {
      const element = cart[index];
      if (element.ProductId == product.ProductId) {
        result = true;
        break;
      }
    }
    return result;
  }



  updateProduct(cart: any[], product: any) {
    for (let index = 0; index < cart.length; index++) {
      const element = cart[index];
      if (element.ProductId == product.ProductId) {
        element.Amount = element.Amount + product.Amount;

        //si tiene parametros adicionales nuevos, se actualiza al producto
        if (product.Params != undefined && product.Params != "") {
          element.Params = product.Params;
        }
      }
    }
  }


  async mixedPaymentValues(ammountToPay: number, points: number) {
    let valuesMixedPayment: MixedPaymentValueResponseDto = {
      AmmountToPay: ammountToPay,
      Points: points
    };
    saveSession(valuesMixedPayment, 'm-p-v')
  }
  clearMixPaymentValues() {
    sessionStorage.removeItem("m-p-v");
  }

  getCountItems(cart: any[]) {
    let result = 0;
    for (let index = 0; index < cart.length; index++) {
      const element = cart[index];
      result += element.Amount;
    }
    return result;
  }


  saveCart(cart: any) {
    this.mixedPaymentValues(0, this.calculateTotalPoints());
    saveSession(cart, 'cart')
    this.cartEmitter(cart);
  }

  cartEmitter(cart: any) {
    let countItems = this.getCountItems(cart);
    this.numberOfCartItemsEvent(countItems);
  }


  getCart(): any[] {

    let cart: [] = [];
    let dataCart = null
    if (sessionStorage.getItem("cart")) {
      dataCart = getSession<any>('cart');
    }

    if (dataCart != undefined && dataCart != null) {
      dataCart = getSession<any>('cart');
      cart = dataCart;
    }
    return cart;
  }


}
