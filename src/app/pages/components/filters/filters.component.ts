import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent implements OnInit {

  @Output() showCategory = new EventEmitter<string>();

  categories = ['shoes', 'sports'];

  ngOnInit() {
  }

  onShowCategory(category: string) {
    this.showCategory.emit(category);
  }

}
