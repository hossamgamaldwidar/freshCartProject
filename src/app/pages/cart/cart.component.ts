import { ICart, Product } from './../../core/interfaces/icart';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  constructor(private _CartService:CartService){}
  cartItems!: ICart
  ngOnInit(): void {
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartItems = res.data;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  removeSpecificItem(c_Id:string){
    this._CartService.removeSpecificCartItem(c_Id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartItems = res.data;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  updateCartProductQuantity(c_Id:string, count:number){
    this._CartService.updateCartProductQuantity(c_Id , count ).subscribe({
      next: (res) => {
        this.cartItems = res.data;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  clearUserCart(){
    this._CartService.clearUserCart().subscribe({
      next: (res) => {
        this.cartItems = res.data;
      },
      error: (err) => {
        console.error(err);
      }
    });

  }
}