import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { ProductListComponent } from './components/product-list/product-list.component';
// import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // RouterOutlet,
    // CommonModule,
    // ProductListComponent,
    NgbModule,
    RouterModule,
    ProductCategoryMenuComponent,
    SearchComponent,
    CartStatusComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
}
