import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { AddCategorieComponent } from './categorie/add-categorie/add-categorie.component';
import { ListCategorieComponent } from './categorie/list-categorie/list-categorie.component';
import { AddArticleComponent } from './article/add-article/add-article.component';
import { ListArticleComponent } from './article/list-article/list-article.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { MatDialogModule,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {NgxPaginationModule} from 'ngx-pagination';
import { AddScategorieComponent } from './scategorie/add-scategorie/add-scategorie.component';
import { ListScategorieComponent } from './scategorie/list-scategorie/list-scategorie.component';
import { DemoComponent } from './demo/demo.component';
import { MomentModule } from 'ngx-moment';
import { NgxPayPalModule } from 'ngx-paypal';
import { ListUserComponent } from './user/list-user/list-user.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { TemplateComponent } from './template/template.component';
import { AccueilComponent } from './accueil/accueil.component';
import { Accueil1Component } from './accueil1/accueil1.component';
import { AddClientComponent } from './client/add-client/add-client.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { ListFourComponent } from './four/list-four/list-four.component';
import { AddFourComponent } from './four/add-four/add-four.component';
import {DecimalPipe} from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';

import { AddPanierComponent } from './panier/add-panier/add-panier.component';
import { AddLpanierComponent } from './panier/add-lpanier/add-lpanier.component';
import { ListPanierComponent } from './panier/list-panier/list-panier.component';
import { PayementComponent } from './panier/payement/payement.component';
import { ReglementComponent } from './reglement/reglement.component';
import { PaypalComponent } from './paypal/paypal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatButtonModule} from '@angular/material/button';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatSliderModule}from '@angular/material/slider';
import { MyloginComponent } from './componentes/mylogin/mylogin.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import {MatTabsModule} from '@angular/material/tabs'
import { AuthGuard } from './services/auth.guard';
import { AuthInterceptor } from './services/auth.interceptor';
import { LoginService } from './services/login.service';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { MatConfirmComponent } from './componentes/mat-confirm/mat-confirm.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { CreateUserComponent } from './user/create-user/create-user.component';

const MATERIAL_MODULES = [MatToolbarModule,
  MatIconModule
];
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AddCategorieComponent,
    ListCategorieComponent,
    AddArticleComponent,
    ListArticleComponent,
    AddScategorieComponent,
    ListScategorieComponent,
    DemoComponent,
 
    ListUserComponent,
    LoginComponent,
    RegisterComponent,
    TemplateComponent,
    AccueilComponent,
    Accueil1Component,
    AddClientComponent,
    ListClientComponent,
    ListFourComponent,
    AddFourComponent,
  
    AddPanierComponent,
    AddLpanierComponent,
    ListPanierComponent,
    PayementComponent,
    ReglementComponent,
    PaypalComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    SidenavComponent,
    MyloginComponent,
    MatConfirmComponent,
    AddUserComponent,
    CreateUserComponent
    
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    NgxWebstorageModule.forRoot(),

    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    NgxPaginationModule,
    MomentModule,
    MatCardModule,
    NgxPayPalModule,
    MatButtonModule,
    MatSidenavModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    
   
  ],
  exports : MATERIAL_MODULES,
  providers: [DatePipe,DecimalPipe,LoginService,{ provide: MAT_DIALOG_DATA, useValue: {} ,},{ provide: APP_BASE_HREF, useValue: '' },
    { provide: MatDialogRef, useValue: {} },AuthGuard,[{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}]],
  bootstrap: [AppComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents:[MatConfirmComponent]
})
export class AppModule { }
