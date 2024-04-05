import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {StoreService} from "../../../services/store.service";
import {Product} from "../../../models/product.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent implements OnInit, OnDestroy{

  @Output() showCategory = new EventEmitter<string>();

  categoriesSubscription: Subscription | undefined;
  categories: Array<string> | undefined;

  constructor(
    private storeService: StoreService,
  ) {
  }

  ngOnInit() {
    this.categoriesSubscription = this.storeService.getAllCategories()
      .subscribe((response) => {
        this.categories = response;
      }
    );
  }


  onShowCategory(category: string) {
    this.showCategory.emit(category);
  }

  ngOnDestroy() {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
}
