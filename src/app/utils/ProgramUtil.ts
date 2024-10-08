import { Injectable } from '@angular/core';
import { MixPaymentdDto } from '../infrastructure/dto/request/mixPayment.dto';
import { getSession } from '../core/encryptData';


@Injectable({
  providedIn: 'root'
})
export class ProgramUtil {
  constructor() { }

  getLocalMixPayment(): MixPaymentdDto {
    let data!: MixPaymentdDto;
    if (sessionStorage.getItem('mp-data')) {
      data = getSession<MixPaymentdDto>('mp-data');
    }
    return data;
  }

}
