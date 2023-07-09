import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SalesAuthComponent } from './sales-auth/sales-auth.component';
import { SalesHomeComponent } from './sales-home/sales-home.component';
import { AuthGuard } from './auth.guard';
import { SalesAddProductComponent } from './sales-add-product/sales-add-product.component';
import { SalesUpdateProductsComponent } from './sales-update-products/sales-update-products.component';

const routes: Routes = [
  {
    path:'', 
    component: HomeComponent
  },
  {
    path:'sales', 
    component: SalesAuthComponent
  },
  {
    path:'sales-home',
    component: SalesHomeComponent, 
    canActivate: [AuthGuard]
  },
  {
    path:'sales-add-product', 
    component: SalesAddProductComponent, 
    canActivate: [AuthGuard]
  },
  {
    path:'sales-update-product/:id', // id is added in the url to updated the date of that id {new method learned}. and it is by routing so, check router link also for id  
    component: SalesUpdateProductsComponent, 
     canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
