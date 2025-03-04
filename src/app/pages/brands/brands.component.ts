import { IBrands } from './../../core/interfaces/ibrands';
import { BrandsService } from './../../core/services/Brands/brands.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  private _BrandsService = inject(BrandsService)
  allBrands!: IBrands[]
  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res.data);
        this.allBrands = res.data
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
