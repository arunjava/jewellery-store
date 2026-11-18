import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CartService } from './cart.service';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cart = inject(CartService);
  private readonly snackBar = inject(MatSnackBar);

  product: Product | null = null;
  loading = true;
  notFound = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (!id) {
        this.notFound = true;
        this.loading = false;
        return;
      }
      this.loading = true;
      this.productService.getProduct(id).subscribe({
        next: (product) => {
          this.product = product;
          this.notFound = false;
          this.loading = false;
        },
        error: () => {
          this.notFound = true;
          this.loading = false;
        }
      });
    });
  }

  addToBag(): void {
    if (!this.product) {
      return;
    }
    this.cart.add(this.product);
    this.snackBar.open(`${this.product.name} added to your bag`, 'Lovely', { duration: 2500 });
  }
}
