import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import CategoryModel from 'src/app/models/category-model';
import { CartService } from 'src/app/services/cart.service';
import ItemModel from 'src/app/models/item-model';
import { OrderService } from 'src/app/services/order.service';
import OrderModel from 'src/app/models/order-model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{

	public categories:CategoryModel[]=[];
	public total:number=0;
	public percent:number =0
	public cartId:any
	public items:ItemModel[]=[]
	public orders:OrderModel[]=[]
	public chartOptions:any ={}
	public chartOptions2:any ={}
	public user = JSON.parse(window.localStorage.getItem('user')) 
	public data:{}[]=[]
	public data2:{}[]=[]
	public constructor( public categoryService:CategoryService, public cartservice:CartService, public ordersService:OrderService){}
	
	public async ngOnInit(): Promise<void> {
		this.categories = await this.categoryService.getCategories();
		this.total =  this.cartservice.totalPrice;
		this.percent = this.total/100
		 this.cartId= (await this.cartservice.getCart(this.user._id))._id;
		 this.items = await this.cartservice.getItems(this.cartId)
		 this.orders = await this.ordersService.getOrdersOfUser(this.user._id)
		 for (const key of this.orders) {
			const [date, time] = (key.bookingDate as any).split('T') 
			this.data2.push({ x: new Date(date), y:key.totalPrice },)
			}
		 for (const key of this.categories) {
			key.total= 0
			for (const item of this.items) {
				if (item.product.categoryId === key._id ) {
					key.total += item.price* item.quantity
				}
			}
			if (key.total!=0) {
				this.data.push({ name: key.name, y:key.total },)
			}
		 }
		
	this.chartOptions = {
		backgroundColor: 'transparent',
		animationEnabled: true,
		theme: "transparent",
	
		title: {
		  text: "Segmentation by categories ",
		  fontFamily: 'Poppins',
		},
		toolTip: {
			fontFamily: "Poppins"},
		subtitles: [{
			text: "How many dollars do I spend on each category?",
			fontFamily: 'Poppins',
		}],
		data: [{
		  type: "pie", 	
		  indexLabelFontFamily: "Poppins",
		  indexLabel: "{name}: {y}",
		  yValueFormatString: "$###.#",
		  dataPoints: this.data
		}]
	  }
	

	
	this.chartOptions2 = {
		theme: "light2",
		animationEnabled: true,
		zoomEnabled: true,
		  toolTip: {
			  fontFamily: "Poppins"},
		title: {
			text: "Orders -Totals",
			fontFamily: 'Poppins',

		},
		
		axisY:{    
			valueFormatString:  "#,##0.##$"  
		 },
		data: [{
			type: "line",
			xValueFormatString: "DD/MM/YYYY",
			yValueFormatString: "$#,###.##",
			dataPoints: this.data2
		}]
	}	

	}}