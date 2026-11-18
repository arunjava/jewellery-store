import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem, Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly storageKey = 'aurelia-cart';
  private readonly itemsSubject = new BehaviorSubject<CartItem[]>(this.readCart());
  private readonly openRequestedSubject = new Subject<void>();
  readonly items$ = this.itemsSubject.asObservable();
  readonly openRequested$ = this.openRequestedSubject.asObservable();

  get items(): CartItem[] {
    return this.itemsSubject.value;
  }

  get quantity(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  get subtotal(): number {
    return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  add(product: Product): void {
    const existing = this.items.find((item) => item.product.id === product.id);
    this.save(existing
      ? this.items.map((item) => item.product.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item)
      : [...this.items, { product, quantity: 1 }]);
  }

  setQuantity(productId: string, quantity: number): void {
    if (quantity < 1) {
      this.remove(productId);
      return;
    }
    this.save(this.items.map((item) => item.product.id === productId ? { ...item, quantity } : item));
  }

  remove(productId: string): void {
    this.save(this.items.filter((item) => item.product.id !== productId));
  }

  requestOpen(): void {
    this.openRequestedSubject.next();
  }

  private save(items: CartItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.itemsSubject.next(items);
  }

  private readCart(): CartItem[] {
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) {
      return [];
    }
    try {
      return JSON.parse(stored) as CartItem[];
    } catch {
      localStorage.removeItem(this.storageKey);
      return [];
    }
  }
}
