import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Product } from './product.model';
import { CartService } from './cart.service';
import { ProductService } from './product.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CurrencyPipe, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule, RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly route = inject(ActivatedRoute);
  private readonly snackBar = inject(MatSnackBar);
  private readonly cart = inject(CartService);

  products: Product[] = [];
  loading = true;
  loadError = false;
  query = '';
  selectedCategory = 'All pieces';
  sortBy = 'featured';
  readonly categories = ['All pieces', 'Necklaces', 'Earrings', 'Rings', 'Bracelets'];

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.query = params.get('q') ?? '';
      this.selectedCategory = params.get('category') ?? 'All pieces';
    });
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: () => {
        this.loadError = true;
        this.loading = false;
      }
    });
  }

  get filteredProducts(): Product[] {
    const query = this.query.trim().toLowerCase();
    const products = this.products.filter((product) => {
      const matchesCategory = this.selectedCategory === 'All pieces' || product.category === this.selectedCategory;
      const matchesQuery = !query || `${product.name} ${product.category} ${product.description} ${product.material}`
        .toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
    if (this.sortBy === 'price-low') {
      return products.sort((a, b) => a.price - b.price);
    }
    if (this.sortBy === 'price-high') {
      return products.sort((a, b) => b.price - a.price);
    }
    if (this.sortBy === 'newest') {
      return [...products].reverse();
    }
    return [...products].sort((a, b) => Number(b.featured) - Number(a.featured));
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  addToBag(product: Product): void {
    this.cart.add(product);
    this.snackBar.open(`${product.name} added to your bag`, 'View bag', { duration: 3000 })
      .onAction().subscribe(() => this.cart.requestOpen());
  }
}
