import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import ItemModel from 'src/app/models/item-model';
import ProductModel from 'src/app/models/product-model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { NotifierService } from 'src/app/services/notify.service';
import { ConfigService } from 'src/app/utils/config.service';

@Component({
  selector: 'app-cart-line',
  templateUrl: './cart-line.component.html',
  styleUrls: ['./cart-line.component.css']
})
export class CartLineComponent implements OnInit{

  @Input()
  public item:ItemModel;
  public toastRef:any
  public removed:boolean =false
  public total:number; 
  public product:ProductModel;
  public productAdded:boolean = false;
  public quantity:number 

  constructor(public config:ConfigService, public cartService:CartService,public authService:AuthService, public notifier:NotifierService) {}
  public async ngOnInit(): Promise<void> {
    this.total = this.item.price * this.item.quantity    
    this.quantity = this.item.quantity;
    if( this.quantity){
      this.productAdded = true
    }
  }
  public async changeQuantity(){
    try {
      this.item.quantity = this.quantity;
      await this.cartService.changeQuantity(this.item)
    } catch (error:any) {
      this.notifier.toast.error(error.error) 
    }
  }
  public async enlarge(){
    this.quantity++
    this.changeQuantity()
    return
  }
  public async delete(){   
    this.toastRef.close({ dismissedByAction: true })
    try {
      await this.cartService.deleteFromCart(this.item)
    } catch (error:any) {
      this.notifier.toast.error(error.error) 
    }
  }
  @ViewChild('template')
  template:any;
  public notify(){
     this.toastRef  = this.notifier.toast.show(this.template, { autoClose: false });
  }
   public async reduce(){
      this.quantity-- 
    if( this.quantity === 0 ){      
      this.removed = true
    }
    this.changeQuantity()    
  }
}
