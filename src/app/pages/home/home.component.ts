import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../core/interfaces/IProduct';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICetegories } from '../../core/interfaces/ICetegories';
import { FormsModule } from '@angular/forms';
import { SearchpipePipe } from '../../shared/pipes/searchPipe/searchpipe.pipe';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/Wishlist/wishlist.service';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, FormsModule , SearchpipePipe , RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] 
})
export class HomeComponent implements OnInit, OnDestroy {
  productsdata!: IProduct[];
  categoriesdata!: ICetegories[];
  productsSub!: Subscription;
  searchinput:string=""
  flag:boolean =false;
  @ViewChildren('Wishlist') wishlist!: QueryList<ElementRef>;
  productPt: OwlOptions = { 
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: false
  };
  dynamic: OwlOptions = { 
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    smartSpeed: 900,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400:{
        items: 2
      },
      740:{
        items: 3
      },
      940:{
        items: 4
      }
    },
    nav: false
  };

  constructor(private _ProductsService: ProductsService ,private _CategoriesService:CategoriesService , private _CartService:CartService , private toastr: ToastrService , private _WishlistService:WishlistService) { }

  ngOnInit(): void {
    this._CategoriesService.getAllCategory().subscribe({
      next: (res) => {
        this.categoriesdata = res.data;
      },
      error: (err) => {
        console.error(err);
      }
    })

    
    this.productsSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.productsdata = res.data;
        
      },
      error: (err) => {
        console.error(err);
      }
    });

    this._CategoriesService.getAllCategory().subscribe({
      next: (res) => {
        this.categoriesdata = res.data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  
    this.productsSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.productsdata = res.data;
        this.changeWishListIcon(); 
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
  addToWishlist(p_Id: string): void {
    this._WishlistService.addProductToWishlist(p_Id).subscribe({
      next: (res) => {
        console.log(res);
  
        let wishList = JSON.parse(sessionStorage.getItem('wishlist') || '[]');
  
        if (wishList.includes(p_Id)) {
          wishList = wishList.filter((id: string) => id !== p_Id);
        } else {
          wishList.push(p_Id);
        }
  
        sessionStorage.setItem('wishlist', JSON.stringify(wishList));
  
        this.wishlist.forEach((el: ElementRef) => {
          const itemId = el.nativeElement.getAttribute('data-id');
          if (itemId === p_Id) {
            if (el.nativeElement.classList.contains('fa-regular')) {
              el.nativeElement.classList.remove('fa-regular');
              el.nativeElement.classList.add('fa-solid');
            } else {
              el.nativeElement.classList.remove('fa-solid');
              el.nativeElement.classList.add('fa-regular');
            }
          }
        });
  
        this.toastr.success('Wishlist updated!', '', {
          progressBar: true,
        });
  
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  changeWishListIcon() {
    let wishList = JSON.parse(sessionStorage.getItem('wishlist') || '[]');
  
    setTimeout(() => {
      this.wishlist.forEach((el: ElementRef) => {
        const itemId = el.nativeElement.getAttribute('data-id');
  
        if (wishList.includes(itemId)) { 
          el.nativeElement.classList.remove('fa-regular');
          el.nativeElement.classList.add('fa-solid');
        } else {
          el.nativeElement.classList.add('fa-regular');
          el.nativeElement.classList.remove('fa-solid');
        }
      });
    }, 100);
  }
  ngOnDestroy(): void {
    this.productsSub.unsubscribe();
  }
}