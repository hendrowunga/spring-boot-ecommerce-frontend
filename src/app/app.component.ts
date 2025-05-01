import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { ProductListComponent } from './components/product-list/product-list.component';
// import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
@Component({
  selector: 'app-root',
  standalone: true,
  // RouterOutlet,ProductListComponent,
  imports: [
    // RouterOutlet,
    // CommonModule,
    RouterModule,
    ProductCategoryMenuComponent,
    SearchComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
}
