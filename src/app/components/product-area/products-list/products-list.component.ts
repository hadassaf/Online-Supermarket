import { CategoryService } from '../../../services/category.service';
import { ProductsService } from '../../../services/products.service';
import { Component, OnInit } from '@angular/core';
import CategoryModel from 'src/app/models/category-model';
import ProductModel from 'src/app/models/product-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit{

  public constructor( private productsService:ProductsService, private categoryService:CategoryService,private route: ActivatedRoute){}

  public categories:CategoryModel[]=[]
  public products:ProductModel[]=[]
  public categoryId:string;
  public search:string;

  public async Search(){
    try {
      this.products = await this.productsService.getProduct(this.search)            
    } catch (error:any) {
     alert(error.error) 
    }
  }
  public async ngOnInit(): Promise<void> {
    try {
      this.route.paramMap.subscribe((params) => {
        this.categoryId = params.get('id');
      });
      this.products = await this.productsService.getProductsByCategory(this.categoryId) 
      this.categories = await this.categoryService.getCategories()
    } catch (error:any) {
      alert(error.error)
    }
  }

  public async getByCategry(categoryId:string){
    try {
      this.products = await this.productsService.getProductsByCategory(categoryId) 
    } catch (error:any) {
      alert(error.message)
    }
  }

}
