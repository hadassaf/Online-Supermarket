import OrderModel  from 'src/app/models/order-model';
import  CartModel  from 'src/app/models/cart-model';
import { AuthService } from '../../../services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { OrderService } from '../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../../auth-area/login/login.component';
import CategoryModel from 'src/app/models/category-model';
import { CategoryService } from 'src/app/services/category.service';
import { ConfigService } from 'src/app/utils/config.service';
import { NotifierService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public constructor(
    public dialog:MatDialog, 
    public orderService:OrderService, 
    public productService:ProductsService, 
    public cartService:CartService,
    public auth:AuthService, 
    public router:Router,
    public categoryService:CategoryService,
    public config:ConfigService,
    public notifier:NotifierService
    ){  }
    public counterProducts = 0;
    public counterOrders = 0;
    public counterItems = 0;
    public productsAmount:number;
    public ordersAmount:number;
    public itemsAmount:number;
    public categories :CategoryModel[]
    public totalPrice:any;
    public cart:CartModel
    public order:OrderModel

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(LoginComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  public async ngOnInit(): Promise<void> {
    try {      
      this.categories = await this.categoryService.getCategories()      
      this.productsAmount =  await this.productService.getProductsAmount()
      this.ordersAmount =  await this.orderService.getOrdersAmount()  
      this.increment(this.ordersAmount)
      this.incrementProducts(this.productsAmount)
      if(this.auth.user?._id){        
        this.order = (await this.orderService.getLastOrder(this.auth.user?._id) as any)[0]
        this.totalPrice  = this.cartService.totalPrice.toFixed(2)   
      }else{
        this.openDialog('100ms', '100ms')
      }
    } catch (error:any) {
      this.notifier.toast.error(error.error)
    }
  } 
    increment(num:number) {      
      const interval= setInterval(()=>{
        this.counterOrders++
       }, 100); 
      setTimeout(() => {
        clearInterval(interval)
      },num*100)
    }
    incrementProducts(num:number) {
      const interval= setInterval(()=>{
        this.counterProducts++
       }, 50); 
      setTimeout(() => {
        clearInterval(interval)
      },num*50)
    }
  public newUser(){    
    return this.auth.new
  }
  public  hasCart(){ 
    const cart = this.cartService.cart;    
    this.cart = cart
    if(cart as any =='undefined')  return false;
    if(this.totalPrice == 0.00) return false;
    if (cart) {
      this.auth.new = false
    }
    return cart!=null
  }
  public isLogged(){
    return this.auth.isLoggedIn()
  } 
  public nav(){
    this.router.navigateByUrl('list/64049518fee21576a9734147')
  }
  public navCategory(categoryId:string){
    this.router.navigate(['list', categoryId])
  }
}
