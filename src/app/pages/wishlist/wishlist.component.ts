import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/Wishlist/wishlist.service';
import { IWishlist } from '../../core/interfaces/iwishlist';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{
private _WishlistService= inject(WishlistService);
allUserWishlist!: IWishlist[];

ngOnInit(): void {
  this._WishlistService.getLoggedUserWishlist().subscribe({
    next: (res) => {
      console.log(res);
      this.allUserWishlist = res.data
    },
    error: (error) => {
      console.error(error);
    }
  })
}

removeProductFromWishlist(p_Id:string){
  this._WishlistService.removeProductFromWishlist(p_Id).subscribe({
    next: (res) => {
      console.log(res);
      this.allUserWishlist = res.data
      this.ngOnInit();
    },
    error: (error) => {
      console.error(error);
    }
  })
}
}
