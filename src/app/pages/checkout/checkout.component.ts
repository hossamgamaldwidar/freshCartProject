import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from '../../core/services/orders/orders.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  constructor(private _OrdersService: OrdersService) { }
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  cartID!:string;
  chechoutForm: FormGroup = new FormGroup({
    details: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required)
  })
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        this.cartID = param.get('c_id')!;
      }
    })
  }
  detailsSubmit() {
    if(this.chechoutForm.valid){
      this._OrdersService.checkoutSession(this.cartID , this.chechoutForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if(res.status == 'success'){
            window.open(res.session.url, '_self')
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }
}
