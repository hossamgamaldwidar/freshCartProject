import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '../../core/services/Auth/auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent{
  
  constructor(private _AuthService :AuthService , private _Router:Router , @Inject(PLATFORM_ID) private platformId: object){};
  resErr!:string;
  Register: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]),
    rePassword: new FormControl(null),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
  },this.match);
  

  showFoem(): void {
   if(this.Register.valid){
     
    this._AuthService.signup(this.Register.value).subscribe({
      next:(res)=>{
        console.log(res);
        this._AuthService.userToken = res.token;
        if(isPlatformBrowser(this.platformId)){
          sessionStorage.setItem('token', res.token);
        }
        this._Router.navigate(['/home'])
      },
      error:(err)=>{
        console.error(err);
        this.resErr = err.error.message;
      }
    })
    console.log(this.Register.value);
    console.log(this.Register);

   }else{
    this.Register.markAllAsTouched();
    this.Register.setErrors({notMatch: true});
   }
  }
  
  match(group:AbstractControl){
    if( group.get('password')?.value === group.get('rePassword')?.value) {
      return null;
    }
    else{
      return {notMatch: true};
    }
  }
}
