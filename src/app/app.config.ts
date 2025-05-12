import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core'; // Impor importProvidersFrom
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';

// Impor definisi rute Anda
import { routes } from './app.routes';

// Impor service global Anda
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { Luv2ShopFormService } from './services/luv2-shop-form.service';
import { CheckoutService } from './services/checkout.service'; // Jika ada

// --- Konfigurasi Okta ---
import { OktaAuthModule } from '@okta/okta-angular'; // Impor OktaAuthModule
import { OktaAuth } from '@okta/okta-auth-js'; // Impor kelas OktaAuth
import myAppConfig from './config/my-app-config'; // Impor konfigurasi Okta Anda

// Buat instance OktaAuth
const oktaConfig = myAppConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);
// -----------------------------

import { OktaAuthGuard } from '@okta/okta-angular';
import { AuthInterceptorService } from './services/auth-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    // Penyedia inti Angular
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // Sediakan routing
    provideHttpClient(), // Sediakan HttpClient

    importProvidersFrom(OktaAuthModule.forRoot({ oktaAuth })),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    OktaAuthGuard,

    ProductService,
    CartService,
    Luv2ShopFormService,
    CheckoutService,
  ],
};
