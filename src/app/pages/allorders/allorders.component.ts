import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { IOrders } from '../../core/interfaces/iorders';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../core/services/Auth/auth.service';

@Component({
  selector: 'app-allorders',
  imports: [DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit{
constructor(private _OrdersService:OrdersService , private _AuthService:AuthService){}
userOrders!:IOrders[]
ngOnInit(): void { 
  this.showData(this._AuthService.userToken.id)
}

showData(O_id:string){
  this._OrdersService.getUserOrders(O_id).subscribe({
    next: (res) => {
      this.userOrders = res;
    },
    error: (err) => {
      console.error(err);
    }
  })
}
}
