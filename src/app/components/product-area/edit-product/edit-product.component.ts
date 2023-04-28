import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import CategoryModel from 'src/app/models/category-model';
import ProductModel from 'src/app/models/product-model';

import { CategoryService } from 'src/app/services/category.service';
import { ProductsService } from 'src/app/services/products.service';
import { ConfigService } from 'src/app/utils/config.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {

  public constructor(public config:ConfigService, public router:Router, private data:ProductsService, private formBuilder: FormBuilder ,  private categoryService:CategoryService, private route: ActivatedRoute){}

  public product:ProductModel = new ProductModel();
  public name:string;
  public price:any;
  public category:string;
  public id:string;
  public imageUrl:string  
  public categories:CategoryModel[]=[]
  
  public async ngOnInit(): Promise<void> {
    try {
      this.route.paramMap.subscribe((params) => {
        this.id = params.get('id');
      });
      const prod:ProductModel = await this.data.getProductById(this.id)
      this.name = prod.name
      this.price = prod.price
      this.category = prod.category?.name;
      this.imageUrl =this.config.productsImages +prod.imageUrl
       console.log(prod);
       
      this.categories = await this.categoryService.getCategories()
    } catch (error:any) {
      alert(error.message)
      
    }
  }

  public async edit(){
    try {
      this.product.image=(this.product.image as any)?._files[0]      
      this.product._id = this.id
      await this.data.editProduct(this.product);
      this.router.navigateByUrl('home')
      
    } catch (error:any) {
      alert(error.message)
      
    }
  }

}


