import { CartService } from './../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';
import { OrderService } from '../../../services/order.service';
import {  FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import OrderModel from 'src/app/models/order-model';
import ItemModel from 'src/app/models/item-model';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/services/notify.service';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
    public CCPattern = 
    "^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$";

    public order =new OrderModel()
    public constructor(public dialogRef: MatDialogRef<any>, public notifier:NotifierService, public router:Router, private orederService:OrderService, private formBuilder: FormBuilder ,public authService:AuthService, public cartService:CartService){}
    public cities = [ "Jerusalem",  "Tel-Aviv",  "Netanya",  "Modi'in",  "Bet Shemesh",  "Bne-Brak",  "Haifa",  "Nes-Tziyona",  "Ashdod",  "Herzelia",]
    orderGroup:FormGroup = this.formBuilder.group({
      CreditCardNumber: ['',[Validators.required,Validators.pattern(this.CCPattern)]],
      deliveryDate: ['',  Validators.required, this.checkDate()],
      City: ['', Validators.required],
      Street: ['', Validators.required],
    })
    public errorHandling = (control: string, error: string) => {
      console.log(error);
      return this.orderGroup.controls[control].hasError(error); 
    }
    public async  fillInDetailsOfUser(){
      this.order.city = this.authService.user.city ;      
      this.order.street = this.authService.user.street;      
    }
    public checkDate(): ValidatorFn {
      return async() : Promise<ValidationErrors | null> => {
        try {          
          const arr = await this.orederService.getOrdersByDate(this.orderGroup.controls['deliveryDate'].value)
          const lengthLessThree = arr.length < 3 
          console.log(lengthLessThree);  
          return !lengthLessThree ? {tooMuch:true}: null;
        } catch (error) {
          return null
        }
      }
    }
    public async submit(){
      try {
        const cart = await this.cartService.getCart(this.authService.user._id)
        const cartItems = await this.cartService.getItems(cart._id)      
        this.order.totalPrice = cartItems.reduce((sum:number, current:ItemModel) => sum + (current.price * current.quantity), 0);
        this.order.userId = this.authService.user._id       
        await this.orederService.openNewOrder(this.order)
        await this.cartService.deleteCart(cart._id)
        this.dialogRef.close();
        this.notifier.toast.success('Order had been sent successfully!')
        this.router.navigateByUrl('list/64049518fee21576a9734147')

      } catch (error:any) {
        this.notifier.toast.error(error.error)   
      }
    }
  }
  
 
  
  
  