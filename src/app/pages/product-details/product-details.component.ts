import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../core/interfaces/IProduct';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-details',
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {

  imageDetailCrousol: OwlOptions = {

    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: false,
    autoplayTimeout: 2000,
    smartSpeed: 900,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },

    },
    nav: false
  }
  constructor(private _ProductsService: ProductsService , private _CartService:CartService ,private toastr: ToastrService ) { }
  private readonly _ActivatedRoute = inject(ActivatedRoute);

  product_id!: string
  productDetails: IProduct = {} as IProduct
  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe({
      next: (res) => {
        this.product_id = res.get('p-id')!;
        console.log(this.product_id);
      }
    })

    this._ProductsService.getSpecificProduct(this.product_id).subscribe({
      next: (res) => {
        console.log(res);
        this.productDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
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
}


