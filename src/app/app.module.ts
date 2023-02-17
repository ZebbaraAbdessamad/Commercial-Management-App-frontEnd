import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerManagementModule } from './customer-management/customer-management.module';
import { InvoiceManagementModule } from './invoice-management/invoice-management.module';
import { ProductManagementModule } from './product-management/product-management.module';
import { OrderManagementModule } from './order-management/order-management.module';
import { ProfileManagementModule } from './profile-management/profile-management.module';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomerManagementModule,
    InvoiceManagementModule,
    ProductManagementModule,
    OrderManagementModule,
    ProfileManagementModule,
    SharedModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
