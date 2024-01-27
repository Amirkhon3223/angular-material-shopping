import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: 'https://via.placeholder.com/512',
        name: 'snickers',
        price: 150,
        quantity: 1,
        id: 1,
      }
    ]
  };

  dataSource: Array<CartItem> = [];
  displayedColumuns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'

  ]

  ngOnInit() {
    this.dataSource = this.cart.items;
  }
}
