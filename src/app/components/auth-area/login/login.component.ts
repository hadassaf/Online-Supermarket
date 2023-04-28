import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import CredentialsModel from 'src/app/models/credentials-model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifierService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public constructor(public dialogRef: MatDialogRef<any>, private data:AuthService, private formBuilder: FormBuilder , public router:Router,public notifier:NotifierService){
    dialogRef.disableClose = true;
  }
  public credentials = new CredentialsModel()
  public hide = true;

  loginGroup:FormGroup = this.formBuilder.group({
    Email: ['',  Validators.email],
    Password: ['', Validators.required],
  });

  public errorHandling = (control: string, error: string) => {
    return this.loginGroup.controls[control].hasError(error); 
  }

  public async login(){
    try {
      await this.data.login(this.credentials);
      this.close()
    } catch (error:any) {
      
      this.notifier.toast.error(error.error)
    }
  }
  public register(){
    this.close()
    this.router.navigateByUrl('register') 
  }
  public  close() {
    this.dialogRef.close();
  }
}
