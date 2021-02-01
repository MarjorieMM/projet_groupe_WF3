import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './c/partials/loader/loader.component';
import { MobileNavbarComponent } from './c/partials/navbar/mobile-navbar/mobile-navbar.component';
import { DesktopNavbarComponent } from './c/partials/navbar/desktop-navbar/desktop-navbar.component';
import { Page404Component } from './c/pages/page404/page404.component';
import { HomeComponent } from './c/pages/home/home.component';
import { ProductArchiveComponent } from './c/pages/product-archive/product-archive.component';
import { ProductSingleComponent } from './c/pages/product-single/product-single.component';
import { MyAccountComponent } from './c/pages/my-account/my-account.component';
import { CartComponent } from './c/partials/cart/cart.component';
import { ProductThumbnailComponent } from './c/partials/product-thumbnail/product-thumbnail.component';
import { CategoryListComponent } from './c/partials/category-list/category-list.component';
import { EuroTransformPipe } from './p/euroTransformPipe';
import { CartItemComponent } from './c/partials/cart-item/cart-item.component';
import { FooterComponent } from './c/partials/footer/footer.component';
import { LoginFormComponent } from './c/pages/login-form/login-form.component';
import { RegistrationFormComponent } from './c/pages/registration-form/registration-form.component';
import { UpdateFormComponent } from './c/pages/update-form/update-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './c/pages/checkout/checkout.component';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MediaQueryStatusComponent } from './media-query-status.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    MobileNavbarComponent,
    DesktopNavbarComponent,
    Page404Component,
    HomeComponent,
    ProductArchiveComponent,
    ProductSingleComponent,
    MyAccountComponent,
    CartComponent,
    ProductThumbnailComponent,
    CategoryListComponent,
    EuroTransformPipe,
    CartItemComponent,
    FooterComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    CheckoutComponent,
    UpdateFormComponent,

    MediaQueryStatusComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatGridListModule,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule,
    MatCardModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FlexLayoutModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
