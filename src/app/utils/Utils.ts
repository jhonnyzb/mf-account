import { ActivatedRoute } from '@angular/router';
import { getSession } from '../core/encryptData';


export class Utils {
    constructor(private route: ActivatedRoute) { }

    emitProgram(){
      const miEvento = new CustomEvent('programEvent');
      document.dispatchEvent(miEvento);
    }

    getParamsfromURL(): Params{
      let params = new Params();
      if(localStorage.getItem('params')){
        params = JSON.parse(localStorage.getItem('params')??'');
      }
      return params;
    }

    setParamsfromURL(programId:number) {
        const parameters: Params = new Params();
        if (programId){
          parameters.programId = programId;
        }
        localStorage.setItem('params', JSON.stringify(parameters));
        this.emitProgram();
    }

    containDataAdditional(product: any){
      let result = false;
      if(product.ParametrosRedimir != undefined
        && product.ParametrosRedimir != null
        && product.ParametrosRedimir.length > 0){
          result = true;
      }
      return result;
    }

    formatVariblesRedemption(variablesForm: any){
      let data = "";
      for (const [key, value] of Object.entries(variablesForm)) {
        data += key + "_" + value + "$";
      }

      //quitar ultimo $
      data = data.slice(0, -1)

      return data;
    }

}

export class Params {
    programId: number = getSession<number>('programId');
    accountId: number = 0;
}
