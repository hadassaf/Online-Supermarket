import { firstValueFrom } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ProductModel from '../models/product-model';
import { ConfigService } from '../utils/config.service';
import CategoryModel from '../models/category-model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  public constructor( private http:HttpClient, private config: ConfigService) { }

  public async  getCategories():Promise<CategoryModel[]> {
    const observable = this.http.get<CategoryModel[]>(this.config.categories);
    const data= await firstValueFrom(observable)
    return data
}

public async  getImage(imageUrl:string):Promise<File> {
  const observable = this.http.get<File>( this.config.categoriesImages+imageUrl)
  const data= await firstValueFrom(observable); 
  return data
}

}
