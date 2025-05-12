import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { LoginStatusComponent } from './components/login-status/login-status.component'; // Termasuk ini

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    ProductCategoryMenuComponent,
    SearchComponent,
    CartStatusComponent,
    LoginStatusComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
}
