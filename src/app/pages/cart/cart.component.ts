import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';

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
        price: 10,
        quantity: 3,
        id: 1,
      },
    ]
  };

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]

  ngOnInit() {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  // LocalStorage !

  constructor(
    private cartService: CartService
  ) {
  }

  getTotalQuantity(el: CartItem): number {
    return el.quantity * el.price;
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }
}
