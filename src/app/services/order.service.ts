import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import OrderModel from "../models/order-model";
import { ConfigService } from "../utils/config.service";
import { firstValueFrom, map, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  
    public order:OrderModel;
  

  public  constructor( private http:HttpClient, private config: ConfigService) {}

  public async openNewOrder(order:OrderModel) :Promise<OrderModel>{
    const observable = this.http.post<OrderModel>( this.config.orders,order)
    const data = await firstValueFrom(observable);
    return data
  } 

  public async  getOrdersAmount() :Promise<number>{
    const observable = this.http.get<number>( this.config.orders+'amount')
    const data = await firstValueFrom(observable);
    return data
  } 
  public async  getLastOrder(userId:number) :Promise<OrderModel[]>{
    const observable = this.http.get<OrderModel[]>( this.config.orders+'last/'+userId)
    const data = await firstValueFrom(observable);    
    return data
  } 
  public async  getOrdersOfUser(userId:number) :Promise<OrderModel[]>{
    const observable = this.http.get<OrderModel[]>( this.config.orders+'all/'+userId)
    const data = await firstValueFrom(observable);    
    return data
  } 
  public async  getOrdersByDate(deliveryDate:any) :Promise<OrderModel[]>{
    const observable = this.http.get<OrderModel[]>( this.config.orders+deliveryDate)
    const data = await firstValueFrom(observable);
    return data
  } 





}
