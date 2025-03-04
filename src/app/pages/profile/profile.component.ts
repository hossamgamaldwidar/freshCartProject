import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { AuthService } from '../../core/services/Auth/auth.service';
import { AddressService } from '../../core/services/Address/address.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAddress } from '../../core/interfaces/iaddress';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  constructor(private _AuthService: AuthService, @Inject(PLATFORM_ID) private platformId: object, private _AddressService: AddressService, private toastr: ToastrService ,private _Router:Router) { }
  UserName!: string;
  userEmail!: string;
  allAddress!: IAddress[];

  @ViewChild('addresSsection') addresSsection!: ElementRef;
  @ViewChild('formRePassword') formRePassword!: ElementRef;
  ngOnInit(): void {
    this._AuthService.decodeUserToken();

    if (this._AuthService.userToken) {
      this.UserName = this._AuthService.userToken.name || 'Guest';
    } else {
      this.UserName = 'Guest';
    }
    this.userEmail = this._AuthService.userEmail || 'No Email';
    this._AddressService.getLoggeUserAddresses().subscribe({
      next: (res) => {
        this.allAddress = res.data || [];
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }



  // Add and Remove Address

  addressForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),

  })
  showAddAddressform() {
    this.addresSsection.nativeElement.classList.remove('hidden');
  }
  closeAddAddressform() {
    this.addresSsection.nativeElement.classList.add('hidden');
  }
  addAddress(): void {
    this._AddressService.addAddress(this.addressForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.allAddress = res.data
        this.addresSsection.nativeElement.classList.add('hidden');
        this.toastr.success('Address added successfully', '', {
          progressBar: true,
        });
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
  removeAddress(a_id: string): void {
    this._AddressService.removeAddress(a_id).subscribe({
      next: (res) => {
        console.log(res);
        this.allAddress = res.data
        this.toastr.error('Address removed successfully', '', {
          progressBar: true,
        });
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  // Update Logged User Password

  updatePassord: FormGroup = new FormGroup({
    currentPassword: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    rePassword: new FormControl(null, [Validators.required]),
  })
  closeRePasswordform() {
    this.formRePassword.nativeElement.classList.add('hidden');
  }
  openRePasswordform() {
    this.formRePassword.nativeElement.classList.remove('hidden');
  }

  updateLoggedUserPassword() {
    this._AddressService.updateLoggedUserPassword(this.updatePassord.value).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Password updated successfully', '', { progressBar: true });
        this.formRePassword.nativeElement.classList.add('hidden');
        this.logOut() 
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Failed to update password', '', { progressBar: true });
      }
    });
  }
  logOut() {
    sessionStorage.clear();
    localStorage.clear(); 
    this._Router.navigate(['/login']);
  }

}
