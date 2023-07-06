import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SalesAuthComponent } from './sales-auth/sales-auth.component';
import { SalesHomeComponent } from './sales-home/sales-home.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'sales', component: SalesAuthComponent},
  {path:'sales-home',component: SalesHomeComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
