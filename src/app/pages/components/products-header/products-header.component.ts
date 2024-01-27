import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrl: './products-header.component.css'
})
export class ProductsHeaderComponent implements OnInit{
  @Output() columnsCountChange = new EventEmitter<number>();
  sort: string = 'sort';
  itemsShowCount: number = 12;

  ngOnInit() {
  }

  onSortUpdated(newSort: string){
    this.sort = newSort;
  }
  onItemsUpdated(count: number){
    this.itemsShowCount = count;
  }

  onColumsUpdated(colsNum: number){
    this.columnsCountChange.emit(colsNum);
  }

}
