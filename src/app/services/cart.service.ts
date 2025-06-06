import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item'; // Pastikan path ini benar

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];

  // Gunakan BehaviorSubject agar komponen yang baru subscribe langsung dapat nilai terakhir
  totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  storage: Storage = sessionStorage;
  // storage: Storage = localStorage;

  constructor() {
    // read data from storage
    let data = JSON.parse(this.storage.getItem('cartItems')!);

    if (data != null) {
      this.cartItems = data;

      // compute totals based on the data that is read from storage
      this.computeCartTotals();
    }
  }

  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  addToCart(theCartItem: CartItem) {
    console.log('CartService: Adding to cart:', theCartItem);
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;

    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(
        (tempCartItem) => tempCartItem.id === theCartItem.id
      );
      alreadyExistsInCart = existingCartItem != undefined;
    }

    if (alreadyExistsInCart && existingCartItem) {
      existingCartItem.quantity++;
      console.log(
        `CartService: Increased quantity for item ${existingCartItem.id}`
      );
    } else {
      this.cartItems.push(theCartItem);
      console.log(`CartService: Added new item ${theCartItem.id}`);
    }

    this.computeCartTotals();
  }

  computeCartTotals() {
    console.log('CartService: Computing totals...');
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      // Pastikan unitPrice dan quantity adalah angka yang valid
      const price = Number(currentCartItem.unitPrice) || 0;
      const quantity = Number(currentCartItem.quantity) || 0;
      totalPriceValue += quantity * price;
      totalQuantityValue += quantity;
    }

    // Periksa apakah nilai berubah sebelum memanggil next() untuk potensi optimasi
    if (this.totalPrice.getValue() !== totalPriceValue) {
      this.totalPrice.next(totalPriceValue);
    }
    if (this.totalQuantity.getValue() !== totalQuantityValue) {
      this.totalQuantity.next(totalQuantityValue);
    }

    this.logCartData(totalPriceValue, totalQuantityValue);

    // Simpan state ke storage setiap kali total dihitung ulang
    this.persistCartItems();
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('--- Cart Contents ---');
    if (this.cartItems.length === 0) {
      console.log('Cart is empty.');
    } else {
      for (let tempCartItem of this.cartItems) {
        const subTotalPrice =
          (Number(tempCartItem.quantity) || 0) *
          (Number(tempCartItem.unitPrice) || 0);
        console.log(
          `name: ${tempCartItem.name}, quantity=${
            tempCartItem.quantity
          }, unitPrice=${
            tempCartItem.unitPrice
          }, subTotalPrice=${subTotalPrice.toFixed(2)}`
        );
      }
    }
    console.log(
      `TOTALS => Price: ${totalPriceValue.toFixed(
        2
      )}, Quantity: ${totalQuantityValue}`
    );
    console.log('---------------------');
  }

  decrementQuantity(theCartItem: CartItem) {
    console.log(
      `CartService: Decrementing quantity for item ${theCartItem.id}`
    );
    const item = this.cartItems.find((item) => item.id === theCartItem.id);
    if (item) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.remove(item);
      } else {
        this.computeCartTotals();
      }
    } else {
      console.warn(
        `CartService: Item ${theCartItem.id} not found for decrement.`
      );
    }
  }

  remove(theCartItem: CartItem) {
    console.log(`CartService: Removing item ${theCartItem.id}`);
    const itemIndex = this.cartItems.findIndex(
      (tempCartItem) => tempCartItem.id === theCartItem.id
    );

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals(); // computeCartTotals sudah memanggil persist
    } else {
      console.warn(
        `CartService: Item ${theCartItem.id} not found for removal.`
      );
    }
  }
}
