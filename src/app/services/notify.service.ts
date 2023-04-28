import {  Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';


@Injectable({
    providedIn: 'root'
  })  
export class NotifierService {
    constructor(public toast: HotToastService, private toastService: HotToastService) {}


    showToast() {
        this.toastService.show('Hello World!')
      }
    



      
}
