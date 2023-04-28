import { firstValueFrom } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ProductModel from '../models/product-model';
import { ConfigService } from '../utils/config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  public constructor( private http:HttpClient, private config: ConfigService) { }

  public  async  getProductsByCategory(categoryId:string):Promise<ProductModel[]> {
    const observable = this.http.get<ProductModel[]>( this.config.products+categoryId)
    const data =await firstValueFrom(observable);
    return data
  }
  public async getProduct(name:string):Promise<ProductModel[]> {
    const observable = this.http.get<ProductModel[]>( this.config.product+name)
    const data = await firstValueFrom(observable);
    return data
  }
  public async getEssentials():Promise<ProductModel[]> {
    const observable = this.http.get<ProductModel[]>( this.config.products+'essentials')
    const data = await firstValueFrom(observable);
    return data
    
}
  public async getProductById(id:string):Promise<ProductModel> {
    const observable = this.http.get<ProductModel>( this.config.products+'byId/'+id)
    const data = await firstValueFrom(observable);
    return data
    
}

  public async  addProduct(product:ProductModel):Promise<ProductModel> {
    const f = new FormData()
    f.append('name',product.name)
    f.append('price',product.price.toString())
    f.append('categoryId',product.categoryId)
    f.append('essential',new Boolean(product.essential).toString())
    f.append('image',product.image)
    const observable = this.http.post<ProductModel>( this.config.products,f)
    const data =await firstValueFrom(observable);
    return data
  }
  
  public async  editProduct(product:any):Promise<void> {
    const f = new FormData()
    for (const iterator in product) {
      
    }
    f.append('name',product.name)
    f.append('price',product.price?.toString())
    f.append('categoryId',product.categoryId)
    f.append('image',product.image)    
    const observable = this.http.patch( this.config.products+product._id,product)
    await firstValueFrom(observable);   
  }
  public async  getImage(imageUrl:string):Promise<File> {
    const observable = this.http.get<File>( this.config.productsImages+imageUrl)
    const data= await firstValueFrom(observable); 
    return data
  }

  public async  getProductsAmount() :Promise<number>{
    const observable = this.http.get<number>( this.config.products+'amount')
    const data = await firstValueFrom(observable);
    return data
  } 


}
