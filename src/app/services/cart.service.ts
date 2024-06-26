import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Cart, CartItem} from '../models/cart.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart';
  cart = new BehaviorSubject<Cart>({items: []});

  constructor(
    private _snackBar: MatSnackBar
  ) {
    const storedCart = localStorage.getItem(this.cartKey);
    if (storedCart) {
      this.cart.next(JSON.parse(storedCart));
    }
  }

  private updatedCart(cart: Cart) {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.cart.next(cart);
  }

  addToCart(item: CartItem) {
    const currentCart = this.cart.value;
    const itemInCart = currentCart.items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      currentCart.items.push(item);
    }

    this.updatedCart(currentCart)
    this._snackBar.open('1 item added to cart.', 'Ok', {duration: 2500});
  }

  removeQuantity(item: CartItem): void {
    let itemForRemoval: CartItem | undefined

    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }
      return _item;
    });

    if (itemForRemoval) {
      filteredItems = this.removeFromCart(itemForRemoval, false);
    }

    this.cart.next({items: filteredItems})
    this._snackBar.open('1 item removed from cart.', 'Ok', {
      duration: 3000
    });
  }

  getTotal(items: Array<CartItem>): number {
    return items.map((item) => item.price * item.quantity)
      .reduce((acc: number, current: number) => acc + current, 0);
  }

  clearCart() {
    localStorage.removeItem(this.cartKey);
    this.cart.next({items: []});
    this._snackBar.open('Cart is clear', 'Ok', {duration: 2500})
  }

  removeFromCart(item: CartItem, update = true): Array<CartItem> {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );
    if (update) {
      this.cart.next({items: filteredItems});
      this._snackBar.open('1 item removed from cart', 'Ok', {
        duration: 3000
      });
    }
    return filteredItems;
  }
}
