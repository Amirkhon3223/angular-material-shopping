import { Component, Input, OnInit } from '@angular/core';
import { Cart, CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  private _cart: Cart = {items: []};
  itemsQuantity: number = 0;

  constructor(
    private cartService: CartService
  ) {
  }

  ngOnInit() {
    this.cartService.cart.subscribe(cart => {
      this.cart = cart;
      this.itemsQuantity = this.calculateItemsQuantity(cart.items);
    });
  }

  calculateItemsQuantity(items: CartItem[]): number {
    return items.reduce((prev, current) => prev + current.quantity, 0);
  }

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;
    this.itemsQuantity = cart.items.map((item) => item.quantity)
      .reduce((prev, current) => prev + current, 0)
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart() {
    this.cartService.clearCart();
  }
}
