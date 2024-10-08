import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { ToastGenericRepository } from 'src/app/core/repositories/toastGeneric.repository';

@Injectable({
  providedIn: 'root'
})
export class ToastGenericService implements  ToastGenericRepository {

  constructor(private toastrService: ToastrService) { }


  genericErrorMessage() {
    this.toastrService.error('Lo sentimos, ha ocurrido un error inesperado en el sistema. Por favor, inténtalo de nuevo más tarde.', undefined, {
      timeOut: 7000,
      progressBar: false,
      disableTimeOut: 'extendedTimeOut',
      progressAnimation: 'increasing',
      tapToDismiss: false,
      positionClass: 'toast-top-center',
      closeButton: true,
    });
  }
}
