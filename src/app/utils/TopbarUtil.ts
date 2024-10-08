import { Injectable } from "@angular/core";
import { descrypt, encrypt } from "./sesion-util";


@Injectable({
  providedIn: 'root'
})
export class TopbarUtil {

  constructor() {}

  getMenuProfileSessionStorage() {
    let me: any = {};
    // && sessionStorage.getItem("token")
    if (sessionStorage.getItem("menuProfile")) {
      me = descrypt(sessionStorage.getItem("menuProfile") ?? '', 'menuProfile') ;
    }
    return me;
  }

}
