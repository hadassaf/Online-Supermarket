import { error } from 'console';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { OrderModel } from './../../../../../../Backend/src/4-models/order-model';
import { OrderService } from '../../../services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from '../../../services/cart.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import CartModel from 'src/app/models/cart-model';
import ItemModel from 'src/app/models/item-model';
import { NotifierService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit{

  public constructor( private cartService:CartService,
                     public productsService:ProductsService,
                     public auth:AuthService ,
                     public orderService:OrderService,
                     public router:Router, 
                     public notifier:NotifierService){  }
  public cart = new CartModel();
  public large: boolean = true;
  public items:any;
  public itemyim:any;
  public quantity:number
  public totalPrice:number;
  public toastRef:any
  public emptyCart:boolean
  public async ngOnInit(): Promise<void> {
    try {
      this.cart  = await this.cartService.getCart(this.auth.user._id)
      this.itemyim = this.cartService.cartItems.subscribe({
      next: (v:any) => { 
        this.items= v;
        this.quantity = this.items?.length
        this.totalPrice = v.reduce((sum:number, current:ItemModel) => sum + (current.price * current.quantity), 0).toFixed(2);
        this.totalPrice == 0? this.emptyCart = true :this.emptyCart=false
      }
    })
      if( this.cart as any === null ){
        const cart = new CartModel()
        cart.userId = this.auth.user._id
        await this.cartService.openNewCart( cart)
        this.cartService.getCartOnInit()
        this.emptyCart = true
      }      
    } catch (error:any) {
      this.notifier.toast.error(error.error)
    }
  }
  public async empty(){
    this.toastRef.close({ dismissedByAction: true })
    if(this.cart._id){
    try {
      await this.cartService.deleteAllFromCart(this.cart._id)
    } catch (error:any) {
      this.notifier.toast.error(error.error) 
    }}
  }
  public async addlIst(){
    const essentials = await this.productsService.getEssentials()
    for (const ess of essentials) {
      const item= new ItemModel()
      item.productId  = ess._id;
      item.quantity  =1
      item.price = ess.price;
      item.cartId = this.cart._id
      await this.cartService.addToCart(item)      
    }
    if(this.cart._id){
    }
  } 
  @ViewChild('template')
  template:any;
  public notify(){
    this.toastRef  = this.notifier.toast.show(this.template, { autoClose: false });
  }
  public async navOrder(){
    this.router.navigateByUrl('order')
  }
}
