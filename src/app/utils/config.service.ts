import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

    private baseUrl = "http://localhost:3001/api/"
    public register = this.baseUrl + "auth/register"
    public login = this.baseUrl + "auth/login"
    public products = this.baseUrl + "products/"
    public product = this.products + "one/"
    public images = this.baseUrl + "images/"
    public categories = this.baseUrl + "categories/"
    public productsImages = this.images+'products/'
    public categoriesImages = this.images+"categories/"
    public carts = this.baseUrl + "carts/"
    public items = this.baseUrl + "items/"
    public orders = this.baseUrl + "orders/"

}
