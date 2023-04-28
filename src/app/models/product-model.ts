import  CategoryModel  from './category-model';
export default class    ProductModel{
    categoryId:string
    name:string;
    price:number;
    imageUrl:string
    image:File;
    category:CategoryModel
    _id:string
    essential:boolean
}

