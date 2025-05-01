import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
// Definisikan dan ekspor konstanta 'routes' dengan tipe Routes
export const routes: Routes = [
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'category/:id/:name', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },
];
