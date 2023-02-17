import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { DeleteCustomerComponent } from './components/delete-customer/delete-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    CustomersListComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    DeleteCustomerComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbRatingModule

  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbRatingModule
  ],
})
export class CustomerManagementModule { }
