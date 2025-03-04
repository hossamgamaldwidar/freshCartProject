import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './../../core/services/Auth/auth.service';
import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
constructor(private _AuthService:AuthService , private _Router:Router ,@Inject(PLATFORM_ID) private platformId: object, private toastr:ToastrService){}
restext:string = ''
restextpopup:string = ''
resetPasswordEmail:string = ''
loading :boolean = false
resetPassordFlag:boolean = false
@ViewChild('forgotPasswordE') forgotPasswordE!:ElementRef;
@ViewChild('codeForm') codeForm!:ElementRef;
@ViewChild('resetForm') resetForm!:ElementRef;

loginform: FormGroup = new FormGroup({
  email: new FormControl(null, [Validators.required, Validators.email]),
  password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)])
})


showdata(): void {
  if (this.loginform.valid) {
    this.loading=true
    this._AuthService.signin(this.loginform.value).subscribe({
      next:(res)=>{
        console.log(res);
        this._AuthService.userEmail = this.loginform.value.email
        this.loading=false
        if(isPlatformBrowser(this.platformId)){
          sessionStorage.setItem('token', res.token)
        }
        this._AuthService.decodeUserToken()
        this._Router.navigate(['/home'])
      },
      error:(err)=>{
        console.log(err);
        this.restext=err.error.message
        this.loading=false
      }
    })
  }else{
    this.loginform.markAllAsTouched();
  }
}
openForgotPassword(){
  console.log(this.forgotPasswordE.nativeElement);
  this.forgotPasswordE.nativeElement.classList.remove('hidden');
  this.forgotPasswordE.nativeElement.classList.add('flex');
}
closeForgotPassword(){
  console.log(this.forgotPasswordE.nativeElement);
  this.forgotPasswordE.nativeElement.classList.add('hidden');
  this.forgotPasswordE.nativeElement.classList.remove('flex');
}
forgotPassword(){
  this._AuthService.forgotPassword(this.loginform.value.email).subscribe({
    next:(res)=>{
      console.log(res);
      this.restextpopup='A reset code has been sent to your email.'
      this.restext=''
      this.resetPassordFlag = true;
      this.resetPasswordEmail = this.loginform.value.email;
      this.openForgotPassword()
    },
    error:(err)=>{
      console.log(err);
      this.restext=err.error.message
    }
  })
}

submitForgotPasswordForm: FormGroup = new FormGroup({
  resetCode: new FormControl(null, [Validators.required]),
})

codeSubmitBtn(){
  console.log(this.submitForgotPasswordForm.value);
  this._AuthService.verifyResetCode(this.submitForgotPasswordForm.value).subscribe({
    next:(res)=>{
      console.log(res);
      if(res.status === "Success"){
        this.codeForm.nativeElement.classList.add('hidden');
        this.resetForm.nativeElement.classList.remove('hidden');
      }
    },
    error:(err)=>{
      console.log(err);
    }
  })
}

resetPasswordForm: FormGroup = new FormGroup({
  email: new FormControl(null, [Validators.required]),
  newPassword : new FormControl(null, [Validators.required]),
})
resetPasswordbtn(){
  this.resetPasswordForm.value.email = this.loginform.value.email
  console.log(this.resetPasswordForm.value);
  this._AuthService.resetPassword(this.resetPasswordForm.value).subscribe({
    next:(res)=>{
      console.log(res);
      this.forgotPasswordE.nativeElement.classList.add('hidden');
      this.toastr.success('The password has been updated', '',{
        progressBar: true,
        
      });
    },
    error:(err)=>{
      console.log(err);
    }
  });
}






}
