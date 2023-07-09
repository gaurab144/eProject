import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SalesAuthComponent } from './sales-auth/sales-auth.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SalesHomeComponent } from './sales-home/sales-home.component';
import { SalesAddProductComponent } from './sales-add-product/sales-add-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SalesUpdateProductsComponent } from './sales-update-products/sales-update-products.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SalesAuthComponent,
    SalesHomeComponent,
    SalesAddProductComponent,
    SalesUpdateProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
