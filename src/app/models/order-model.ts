import  UserModel  from './user-model';
import  CartModel  from './cart-model';

export default class OrderModel{
    userId:string
    cartId:string
    totalPrice:number;
    city:string;
    street:string;
    deliveryDate:Date;
    bookingDate:Date;
    lastFourDigits:number;
    cart:CartModel;
    user:UserModel
}

