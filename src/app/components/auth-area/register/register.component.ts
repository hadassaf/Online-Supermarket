import { error } from 'console';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn} from '@angular/forms';
import  UserModel  from './../../../models/user-model';
import { AuthService } from '../../../services/auth.service';
import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public user =new UserModel()
  public constructor( private auth:AuthService, private formBuilder: FormBuilder , public router:Router, public notifier:NotifierService){}
  public cities = [ 
    "Jerusalem",
    "Tel-Aviv",
    "Netanya",
    "Modi'in",
    "Bet Shemesh",
    "Bne-Brak",
    "Haifa",
    "Nes-Tziyona",
    "Ashdod",
    "Herzelia",
  ]
  checkPasswords: ValidatorFn = (firstFormGroup: AbstractControl):  ValidationErrors | null => { 
    let pass = firstFormGroup.get('Password').value;
    let confirmPass = firstFormGroup.get('Confirm').value
    return pass === confirmPass ? null : { notSame: true }
  }

  firstFormGroup:FormGroup = this.formBuilder.group({
    Id: ['', Validators.pattern('^[0-9]{9}$')],
    Email: ['',  Validators.email],
    Password: ['', Validators.required],
    Confirm: ['', Validators.required],
  }, {validators: this.checkPasswords});

  secondFormGroup:FormGroup = this.formBuilder.group({
    FirstName: ['', Validators.required],
    LastName: ['',  Validators.required],
    City: ['', Validators.required],
    Street: ['', Validators.required],
  });

  public errorHandling3 = ( error: string) => {
    return this.firstFormGroup.hasError(error);
  }
  public errorHandling2 = ( control: string, error: string) => {
    return this.secondFormGroup.controls[control].hasError(error); 
  }
  public errorHandling = (control: string, error: string) => {
    return this.firstFormGroup.controls[control].hasError(error); 
  }
  public hide = true;
  public matcher = new MyErrorStateMatcher();
  
  public async submit(){
    try {
      await this.auth.register(this.user)
      this.router.navigateByUrl('home')
    } catch (error:any) {
       this.notifier.toast.error(error.error)
    }
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.dirty);
    return invalidCtrl || invalidParent;
  }
}


