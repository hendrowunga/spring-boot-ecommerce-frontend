import { Routes, Router } from '@angular/router';
import { Injector } from '@angular/core';

// Impor komponen halaman/tujuan routing
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { OktaCallbackComponent } from '@okta/okta-angular';

// (Opsional) Impor Guard jika Anda ingin mengamankan rute tertentu
import { OktaAuthGuard } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { Order } from './common/order';
import { OrderHistory } from './common/order-history';
import { OrderHistoryComponent } from './components/order-history/order-history.component';

function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector) {
  const router = injector.get(Router);
  router.navigate(['/login']);
}
export const routes: Routes = [
  { path: 'login/callback', component: OktaCallbackComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'order-history',
    component: OrderHistoryComponent,
    canActivate: [OktaAuthGuard],
    data: { onAuthRequired: sendToLoginPage },
  },

  {
    path: 'members',
    component: MembersPageComponent,
    canActivate: [OktaAuthGuard],
    data: { onAuthRequired: sendToLoginPage },
  },
  { path: 'checkout', component: CheckoutComponent }, // Tanpa guard
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },

  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' }, // Tangkap semua rute lain
];
