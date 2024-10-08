import  * as CryptoJS from "crypto-js";
const ENCRIPTKEY = "V4l3pr0US3r"

export const saveSession = (data: any, key: string) => {
  let encripted = CryptoJS.AES.encrypt(JSON.stringify(data), ENCRIPTKEY + key).toString();
  sessionStorage.setItem(key, encripted)
}

export const getSession = <T>(key: string): any => {
  try{
    let data = sessionStorage.getItem(key);
    const valueDescrypt = CryptoJS.AES.decrypt(data, ENCRIPTKEY + key).toString(CryptoJS.enc.Utf8);
    if (!valueDescrypt) {
      throw new Error('Error al descifrar el valor almacenado en sessionStorage');
    }
    return JSON.parse(valueDescrypt) as T
  } catch(e){
    return  null;
  }
}
