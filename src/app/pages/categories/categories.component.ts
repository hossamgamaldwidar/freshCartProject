import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICetegories } from '../../core/interfaces/ICetegories';
import { ISupcategoris } from '../../core/interfaces/isupcategoris';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  categories!: ICetegories[];
  supCategories!: ISupcategoris[];
  constructor(private _CategoriesService: CategoriesService) { }
  ngOnInit(): void {
    this._CategoriesService.getAllCategory().subscribe({
      next: (data) => {
        console.log(data);
        this.categories = data.data;
      },
      error: (error) => {
        console.error(error);
      }
    })
    this._CategoriesService.getAllSupportedCategory().subscribe({
      next: (data) => {
        console.log(data);
        this.supCategories = data.data;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
