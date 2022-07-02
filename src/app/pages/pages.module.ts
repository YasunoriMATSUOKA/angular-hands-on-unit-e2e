import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';
import { ProductListingPageComponent } from './components/product-listing-page/product-listing-page.component';
import { ProductRegisteringPageComponent } from './components/product-registering-page/product-registering-page.component';
import { StockRegisteringPageComponent } from './components/stock-registering-page/stock-registering-page.component';
import { PurchaseHistoryListingPageComponent } from './components/purchase-history-listing-page/purchase-history-listing-page.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxTranslateModule } from '../ngx-translate/ngx-translate.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    SignInPageComponent,
    ProductListingPageComponent,
    ProductRegisteringPageComponent,
    StockRegisteringPageComponent,
    PurchaseHistoryListingPageComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxTranslateModule,
    MaterialModule,
    ReactiveFormsModule,
    CoreModule,
  ],
  exports: [
    SignInPageComponent,
    ProductListingPageComponent,
    ProductRegisteringPageComponent,
    StockRegisteringPageComponent,
    PurchaseHistoryListingPageComponent,
  ],
})
export class PagesModule {}
