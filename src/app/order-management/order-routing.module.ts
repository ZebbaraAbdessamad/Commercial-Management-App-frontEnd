import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './components/order-list/order-list.component';
import { NgModule } from '@angular/core';


const routes: Routes = [
  { path:'list',component: OrderListComponent  },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
