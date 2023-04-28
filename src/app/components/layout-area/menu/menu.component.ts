import { ProductsService } from '../../../services/products.service';
import { AuthService } from '../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import ProductModel from 'src/app/models/product-model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor( public auth:AuthService,public productService:ProductsService){ }
 

  public product:ProductModel
  public user = this.auth.getToken()
  
  

}
