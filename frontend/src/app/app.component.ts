import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from './cart.service';
import { CartItem } from './product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, MatBadgeModule, MatButtonModule, MatIconModule, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);
  readonly cart = inject(CartService);
  searchText = '';
  cartOpen = false;
  cartItems: CartItem[] = [];

  ngOnInit(): void {
    this.cart.items$.subscribe((items) => this.cartItems = items);
    this.cart.openRequested$.subscribe(() => this.cartOpen = true);
  }

  search(): void {
    void this.router.navigate(['/'], {
      queryParams: { q: this.searchText.trim() || null },
      queryParamsHandling: 'merge'
    });
  }

  changeQuantity(productId: string, quantity: number): void {
    this.cart.setQuantity(productId, quantity);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  }
}
