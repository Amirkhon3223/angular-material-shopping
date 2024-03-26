import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.css'
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;

  product: Product | undefined = {
    id: 1,
    title: 'Snicker009',
    price: 150,
    category: 'shoes',
    description: 'Description',
    image: 'https://via.placeholder.com/512'
  };

  @Output() addToCart = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onAddToCart() {
    this.addToCart.emit(this.product)
  }
}
