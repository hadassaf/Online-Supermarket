import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../utils/config.service';
import { firstValueFrom, Subject } from 'rxjs';
import CartModel from '../models/cart-model';
import ItemModel from '../models/item-model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public constructor( private http:HttpClient, private config: ConfigService , public auth:AuthService) {  this.getCartOnInit() }
  public cartItems: Subject<any> = new Subject<any>();
  public totalPrice: number
  public cart:CartModel;
  public items:ItemModel[] = [];
  cartItemsChange(data: ItemModel[]) {
    this.cartItems.next(data)
    this.totalPrice = this.items.reduce((sum:number, current:ItemModel) => sum + (current.price  * current.quantity), 0);          
  }
  public async getCartOnInit(){
    const user = window.localStorage.getItem('user')
    if(JSON.parse(user)){
    const mycart  = await this.getCart(JSON.parse(user)?._id)  
    this.cartItemsChange( await this.getItems(mycart?._id) )
    this.totalPrice = this.items.reduce((sum:number, current:ItemModel) => sum + (current.price  * current.quantity), 0);          
    }
  }
  public async openNewCart(cart:CartModel) :Promise<CartModel>{
    const observable = this.http.post<CartModel>( this.config.carts,cart)
    const data = await firstValueFrom(observable);
    this.cart = data
    return data
  } 
  public async addToCart(item:ItemModel) :Promise<ItemModel>{
    const observable = this.http.post<ItemModel>( this.config.items,item)
    const data = await firstValueFrom(observable);
    this.cartItemsChange(await this.getItems(item.cartId)) 
    console.log( this.totalPrice);
    return data
  } 
  public async deleteFromCart(item:ItemModel): Promise<void> {    
    const observable = this.http.delete(this.config.items+item._id)
    await firstValueFrom(observable);
    this.cartItemsChange(await this.getItems(item.cartId)) 
  }
  public async deleteAllFromCart(cartId:string): Promise<void> {    
    const observable = this.http.delete( this.config.items+ "all/"+cartId)
    await firstValueFrom(observable);
    this.cartItemsChange(await this.getItems(cartId)) 
  }
  public async changeQuantity(item:ItemModel) :Promise<ItemModel>{
    const observable =this.http.patch<ItemModel>(this.config.items, item)
    const data = await firstValueFrom(observable);    
    this.cartItemsChange(await this.getItems(item.cartId)) 
    return data
  } 
  public async getCart(userId:string): Promise<CartModel> {
    const observable = this.http.get<CartModel>( this.config.carts+userId)
    const data = await firstValueFrom(observable);
    this.cart = data
    return data
  }
  public async getItems(cartId:string):Promise<ItemModel[]|any>{
    if(!cartId ) return 
    const observable = this.http.get<ItemModel[]>( this.config.carts+'items/'+cartId)
    const data = await firstValueFrom(observable);
    this.items = data
    return data
  }
  public async deleteCart (cartId:string){
    const observable = this.http.delete( this.config.carts+cartId)
     await firstValueFrom(observable); 
     this.cartItemsChange(await this.getItems(cartId)) 
  }
}

