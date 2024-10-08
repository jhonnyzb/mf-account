import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { saveSession } from "../core/encryptData";

@Injectable({
  providedIn: 'root'
})
export class ConfigUtil {
  defaultProgram = 6;
  userToken!: string | null;
  constructor(
    private router: Router,
    private http: HttpClient) { }

  urlChangeEmit() {
    const miEvento = new CustomEvent('urlChangeEmit');
    document.dispatchEvent(miEvento);
  }

  contentChangeEmit() {
    const miEvento = new CustomEvent('contentChangeEmit');
    document.dispatchEvent(miEvento);
  }

  setUrl(url: string, name: string) {
    saveSession(JSON.stringify({ url: url, name: name }), 'urlSaved')
    this.urlChangeEmit();
  }

  logout() {
    this.userToken = null;
    localStorage.setItem('programId', sessionStorage.getItem('programId'))
    localStorage.setItem('program', sessionStorage.getItem('program'))
    localStorage.setItem('RegisterOnWebResponsive', sessionStorage.getItem('RegisterOnWebResponsive'))
    localStorage.setItem('configVisual', sessionStorage.getItem('configVisual'))
    localStorage.setItem('passwordMinlength', sessionStorage.getItem('passwordMinlength'))
    sessionStorage.clear();
    sessionStorage.setItem('program', localStorage.getItem('program'));
    sessionStorage.setItem('programId', localStorage.getItem('programId'));
    sessionStorage.setItem('RegisterOnWebResponsive', localStorage.getItem('RegisterOnWebResponsive'));
    sessionStorage.setItem('configVisual', localStorage.getItem('configVisual'));
    sessionStorage.setItem('passwordMinlength', localStorage.getItem('passwordMinlength'));
    localStorage.removeItem('program');
    localStorage.removeItem('programId');
    this.router.navigate(['/login']);
  }


}
