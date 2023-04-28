import { ProductsService } from '../../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import CredentialsModel from 'src/app/models/credentials-model';
import ProductModel from 'src/app/models/product-model';
import CategoryModel from 'src/app/models/category-model';
import { CategoryService } from 'src/app/services/category.service';
import { NotifierService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{

  public constructor( private data:ProductsService, private formBuilder: FormBuilder ,  private categoryService:CategoryService,public notifier:NotifierService ){}
  public credentials = new CredentialsModel()
  
  public product:ProductModel = new ProductModel();

  public categories:CategoryModel[]=[]
  
  addGroup:FormGroup = this.formBuilder.group({
    categoryId: ['',  Validators.required],
    Name: ['', Validators.required],
    Price: ['',  Validators.required],
    essential: ['',  Validators.required],
    Image: ['', Validators.required],
  });
  
  public errorHandling = (control: string, error: string) => {
    return this.addGroup.controls[control].hasError(error); 
  }
  
  
  public async ngOnInit(): Promise<void> {
    try {
      this.categories = await this.categoryService.getCategories()      
      
    } catch (error:any) {
      alert(error.message)
      
    }
  }
 
  public async add(){
    try {
      this.product.image=(this.product.image as any)?._files[0]      
      await this.data.addProduct(this.product);
    } catch (error:any) {
      console.log(error);
      
      this.notifier.toast.error(error.error)
      
    }
  }

}


