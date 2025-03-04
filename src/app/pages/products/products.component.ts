import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../core/interfaces/IProduct';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SearchpipePipe } from '../../shared/pipes/searchPipe/searchpipe.pipe';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [FormsModule, SearchpipePipe ,RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
    productsdata!: IProduct[];
    productsSub!: Subscription;
    searchinput:string=""
  
constructor(private _ProductsService: ProductsService , private _CartService:CartService , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.productsSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.productsdata = res.data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  addToCart(p_Id: string): void {
    this._CartService.addToCart(p_Id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('product added successfully', '',{
          progressBar: true,
        });
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }
}
