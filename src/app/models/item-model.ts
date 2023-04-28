import CartModel  from './cart-model';
import  ProductModel  from './product-model';

export default class ItemModel {
    _id:string;
    productId:string
    cartId:string
    quantity:number;
    price:number;
    product:ProductModel;
    cart:CartModel
}

