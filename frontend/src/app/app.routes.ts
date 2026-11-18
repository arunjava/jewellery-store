import { Routes } from '@angular/router';
import { CatalogComponent } from './catalog.component';
import { ProductDetailComponent } from './product-detail.component';

export const routes: Routes = [
  { path: '', component: CatalogComponent, title: 'Shop | Aurelia Jewellery' },
  { path: 'product/:id', component: ProductDetailComponent, title: 'Product | Aurelia Jewellery' },
  { path: '**', redirectTo: '' }
];
