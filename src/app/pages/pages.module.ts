import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';
import { ProductListingPageComponent } from './components/product-listing-page/product-listing-page.component';
import { ProductRegisteringPageComponent } from './components/product-registering-page/product-registering-page.component';
import { StockRegisteringPageComponent } from './components/stock-registering-page/stock-registering-page.component';
import { PurchaseHistoryListingPageComponent } from './components/purchase-history-listing-page/purchase-history-listing-page.component';

@NgModule({
  declarations: [
    SignInPageComponent,
    ProductListingPageComponent,
    ProductRegisteringPageComponent,
    StockRegisteringPageComponent,
    PurchaseHistoryListingPageComponent,
  ],
  imports: [CommonModule],
  exports: [
    SignInPageComponent,
    ProductListingPageComponent,
    ProductRegisteringPageComponent,
    StockRegisteringPageComponent,
    PurchaseHistoryListingPageComponent,
  ],
})
export class PagesModule {}
