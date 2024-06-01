import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { TypeComponent } from './equipment/type/type.component';
import { BrandComponent } from './equipment/brand/brand.component';
import { ModelComponent } from './equipment/model/model.component';
import { PowerComponent } from './equipment/power/power.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NewRegisterComponent } from './new-register/new-register.component';
import { ContractComponent } from './contract/contract.component';
import { UserContractComponent } from './user-contract/user-contract.component';
import { NewContractComponent } from './new-contract/new-contract.component';
import { CustomerContractComponent } from './customer-contract/customer-contract.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { provideNgxMask, NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { CpfCnpjMaskDirective } from './_shared/cpf-cnpj-mask.directive';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    TypeComponent,
    BrandComponent,
    ModelComponent,
    PowerComponent,
    EquipmentComponent,
    NewRegisterComponent,
    ContractComponent,
    UserContractComponent,
    NewContractComponent,
    CustomerContractComponent,
    SpinnerComponent,
    CpfCnpjMaskDirective,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    CurrencyMaskModule
  ],
  providers: [httpInterceptorProviders, 
    provideNgxMask(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
