import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';

const routes: Routes = [
  { path:'list',component: CustomersListComponent  },
  { path:'edit-customer/:id',component: EditCustomerComponent  },

];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
