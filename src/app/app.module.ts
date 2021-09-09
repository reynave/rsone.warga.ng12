import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import { NgxLoadingModule } from 'ngx-loading';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component'; 
import { LeftsideComponent } from './global/leftside/leftside.component';
import { TopsideComponent } from './global/topside/topside.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './global/footer/footer.component';
import { allIcons } from 'angular-feather/icons';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReloginComponent } from './login/relogin/relogin.component'; 
import { AutocompleteLibModule} from 'angular-ng-autocomplete';  
import { ConnectionServiceModule} from 'ngx-connection-service';
import { SupportComponent } from './support/support.component';
import { CmsComponent } from './cms/cms.component';
import { BillingComponent } from './billing/billing.component';
import { PanicComponent } from './panic/panic.component';
import { CmsDetailComponent } from './cms/cms-detail/cms-detail.component';
import { SupportFormComponent } from './support/support-form/support-form.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { IzinFormComponent } from './support/izin-form/izin-form.component';
import { RenovasiFormComponent } from './support/renovasi-form/renovasi-form.component';
import { SupportDetailComponent } from './support/support-detail/support-detail.component';
import { HomeComponent } from './home/home.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 0,
  prefix: "Rp ",
  suffix: "",
  thousands: "."
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    LeftsideComponent,
    TopsideComponent,
    NotFoundComponent,
    FooterComponent,
    ReloginComponent,   
    SupportComponent,
    CmsComponent,
    BillingComponent,
    PanicComponent,
    CmsDetailComponent,
    SupportFormComponent,
    ProfileComponent,
    ProfileEditComponent,
    IzinFormComponent,
    RenovasiFormComponent,
    SupportDetailComponent,
    HomeComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    CurrencyMaskModule,
    FormsModule,
    FeatherModule.pick(allIcons),
    AutocompleteLibModule,
    NgxLoadingModule.forRoot({}),
    ConnectionServiceModule
  ],
  exports: [
    FeatherModule
  ],
  providers: [{ provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    { provide: LOCALE_ID, useValue: "en-ID" }, //replace "de-at" with your locale
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
