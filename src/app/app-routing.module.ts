import { OrderComponent } from './components/order-area/order/order.component';
import { EditProductComponent } from './components/product-area/edit-product/edit-product.component';
import { AddProductComponent } from './components/product-area/add-product/add-product.component';
import { ProductsListComponent } from './components/product-area/products-list/products-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home-area/home/home.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [
  { path: "list/:id", component: ProductsListComponent , canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent },
  {path: 'login', component: LoginComponent },
    {path: 'home', component: HomeComponent },
    {path: 'add', component: AddProductComponent , canActivate: [AuthGuard]},
    {path: 'edit/:id', component: EditProductComponent, canActivate: [AuthGuard] },
    {path: 'order', component: OrderComponent , canActivate: [AuthGuard]},
    {path: '', redirectTo: '/home', pathMatch: "full" },
    {path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
