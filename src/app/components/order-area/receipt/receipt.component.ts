import { OrderDetailsComponent } from './../order-details/order-details.component';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import ItemModel from 'src/app/models/item-model';
import { AuthService } from 'src/app/services/auth.service';
import { ConfigService } from 'src/app/utils/config.service';
import "pdfmake/build/pdfmake"
const pdfMake = window["pdfMake"];
import * as pdfFonts from "pdfmake/build/vfs_fonts"
import { MatDialog } from '@angular/material/dialog';
pdfMake.vfs = pdfFonts.pdfMake.vfs;  


@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit{
  public searchText='';
  public totalPrice:any;
  public cartItems:ItemModel[];
  public number:number
  
  public constructor(     public dialog:MatDialog, public cartService:CartService, public authService:AuthService, public router:Router, public config:ConfigService, public productsService:ProductsService){}
  
  public async ngOnInit(): Promise<void> {
    const cart = await this.cartService.getCart(this.authService.user._id)
    this.cartItems = await this.cartService.getItems(cart._id)      
    this.totalPrice = this.cartItems.reduce((sum:number, current:ItemModel) => sum + (current.price * current.quantity), 0).toFixed(2);;
  }
  
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(OrderDetailsComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  public nav(){
    this.router.navigateByUrl('list/64049518fee21576a9734147')
  }

  public order(){

    this.openDialog('100ms', '100ms')
  }
  
  generatePDF(action = 'open') {
  const user = JSON.parse( localStorage.getItem('user'))
    let docDefinition:any = {
      content: [
        {
          text: 'Diamarket',
          fontSize: 30,
          alignment: 'center',
          color: '#0074d9'
        },
        {
          text: 'INVOICE',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          color: 'yellow'
        },
        {
          text: 'Customer Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text:  user.firstName + "  "+user.lastName,
                bold:true
              },
              { text:  user.city +","+user.street },
              { text: user.email},
              { text: user._id }
            ],
            [
              {
                text: `Date: ${new Date().toLocaleString()}`,
                alignment: 'right'
              },
              { 
                text: `Bill No : ${((Math.random() *1000).toFixed(0))}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'Order Details',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Product', 'Price', 'Quantity', 'Amount'],
              ...this.cartItems.map(p => ([p.product.name, p.price +"$", p.quantity, (p.price*p.quantity) .toFixed(1) +"$"])),
              [{text: 'Total Amount', colSpan: 3}, {}, {},  this.totalPrice]]
          }
        },
        {
          text: 'Additional Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [{ qr: `${user.firstName + "  "+user.lastName}`, fit: '50' }],
            [{ text: 'Diamarket ', alignment: 'right', italics: true}],
          ]
        },
        {
          text: 'Terms and Conditions',
          style: 'sectionHeader'
        },
        {
            ul: [
              'Order can be return in max 10 days.',
              'Warrenty of the product will be subject to the manufacturer terms and conditions.',
              'This is system generated invoice.',
            ],
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]          
        }
      }
    };

    if(action==='download'){
      pdfMake.createPdf(docDefinition).download();
    }

  }

  




}
