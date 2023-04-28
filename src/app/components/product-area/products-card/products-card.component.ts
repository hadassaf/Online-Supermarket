import { AuthService } from '../../../services/auth.service';
import { ConfigService } from './../../../utils/config.service';
import ProductModel  from 'src/app/models/product-model';
import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import ItemModel from 'src/app/models/item-model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.css']
})
export class ProductsCardComponent implements OnInit{
  @Input()
  public product:ProductModel;
  public productAdded:boolean = false;
  public isInCart:ItemModel[] =[]
  public quantity:number = 0
  public item = new ItemModel()
  public items:ItemModel[];
  public itemSubject:any;
  constructor(public config:ConfigService, public cartService:CartService,public authService:AuthService, public router:Router) {}
  public async ngOnInit(): Promise<void> { 
   try {
    this.cartService.getCartOnInit()
    console.log(this.authService.manager);
    
    this.itemSubject = this.cartService.cartItems.subscribe({  
      next: (v:any) => {
        this.items= v
        this.isInCart= v.filter((item:any) => item.productId === this.product._id )

        if( this.isInCart[0]?.quantity > 0 ){
          this.quantity = this.isInCart[0]?.quantity
          this.productAdded = true
        }else{
          this.productAdded = false 
        }
      }
   });  
    
   } catch (error:any) {
    alert(error.error)
   }
  }

  public isVegtable(){  return this.product.categoryId === '64049518fee21576a9734147' }
  public added(){  return this.productAdded === true}
  public async add(){
    this.productAdded =true
    this.quantity++
    try {
      this.item.productId  = this.product._id;
      this.item.quantity = this.quantity;
      this.item.price = this.product.price;
      this.item.cartId = (await this.cartService.getCart(this.authService.user._id ))._id
      this.cartService.addToCart(this.item)
    } catch (error:any) {
      alert(error.error) 
    }
  }
  
  public async changeQuantity(){
    try {
      this.item.productId  = this.product._id;
      this.item.quantity = this.quantity;
      this.item.price = this.product.price;
      this.item.cartId = (await this.cartService.getCart(this.authService.user._id))._id
      this.cartService.changeQuantity(this.item)
    } catch (error:any) {
      alert(error.error) 
    }
  }
  public async enlarge(){
    this.quantity++
    this.changeQuantity()
  }
  public reduce(){
    this.quantity-- 
    if( this.quantity === 0) {      
      this.productAdded = false
    }
    this.changeQuantity()    
  }
  public edit(productId:string){
    this.router.navigateByUrl('edit/'+productId)
    
  }

}
