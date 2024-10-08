import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountOrdersComponent } from './account-orders/account-orders.component';
import { OrderStatusComponent } from './account-orders/order-status/order-status.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DetailAccountComponent } from './detail-account/detail-account.component';
import { MyPointsComponent } from './my-points/my-points.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes: Routes = [

  {
    path: 'points',
    component: MyPointsComponent,
    data: { title: 'Mis puntos' },
  },

  {
    path: 'my-orders',
    component: AccountOrdersComponent,
    data: { title: 'Mis pedidos' },
  },
  {
    path: 'order-status',
    component: OrderStatusComponent,
    data: { title: 'Estado de tus pedidos' },
  },

  {
    path: 'change-password',
    component: ChangePasswordComponent,
    data: { title: 'Cambiar contraseña' },
  },
  {
    path: '',
    component: ChangePasswordComponent,
    data: { title: 'Cambiar contraseña' },
  },
  {
    path: 'detail-account',
    component: DetailAccountComponent,
    data: { title: 'Actualización de datos' },
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
    data: { title: 'Contactenos' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
