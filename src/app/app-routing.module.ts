;
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'customer', loadChildren: () => import('./customer-management/customer-management.module').then(m => m.CustomerManagementModule) },
  { path: 'invoice', loadChildren: () => import('./invoice-management/invoice-management.module').then(m => m.InvoiceManagementModule) },
  { path: 'products', loadChildren: () => import('./product-management/product-management.module').then(m => m.ProductManagementModule) },
  { path: 'orders', loadChildren: () => import('./order-management/order-management.module').then(m => m.OrderManagementModule) },
  { path: '**', redirectTo: 'customer/list'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
