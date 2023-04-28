import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { MenuComponent } from './components/layout-area/menu/menu.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ProductsListComponent } from './components/product-area/products-list/products-list.component';
import { ProductsCardComponent } from './components/product-area/products-card/products-card.component';
import { CartListComponent } from './components/cart-area/cart-list/cart-list.component';
import { CartLineComponent } from './components/cart-area/cart-line/cart-line.component';
import { AddProductComponent } from './components/product-area/add-product/add-product.component';
import { EditProductComponent } from './components/product-area/edit-product/edit-product.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {  MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { OrderDetailsComponent } from './components/order-area/order-details/order-details.component';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { JwtInterceptor } from './utils/jwt.interceptor';
import { ReceiptComponent } from './components/order-area/receipt/receipt.component';
import { HighlighterPipe } from './utils/highlighter.pipe';
import { FooterComponent } from './components/layout-area/footer/footer.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { ChartComponent } from './components/order-area/chart/chart.component';
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import { OrderComponent } from './components/order-area/order/order.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
  
  declarations: [
    CanvasJSChart,
    LayoutComponent,
    HeaderComponent,
    MenuComponent,
    HomeComponent,
    PageNotFoundComponent,
    RegisterComponent,
    LoginComponent,
    ProductsListComponent,
    ProductsCardComponent,
    CartListComponent,
    CartLineComponent,
    AddProductComponent,
    EditProductComponent,
    OrderDetailsComponent,
    ReceiptComponent,
    HighlighterPipe,
    FooterComponent,
    ChartComponent,
    OrderComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatNativeDateModule ,
    CreditCardDirectivesModule,
    HotToastModule.forRoot()

  ],
  providers: [
    {useClass: JwtInterceptor, provide: HTTP_INTERCEPTORS, multi: true},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }


  ],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
