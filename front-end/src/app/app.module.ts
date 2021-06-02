import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DatePipe } from '@angular/common';
import { HttpClientModule} from '@angular/common/http';
import {NgxUiLoaderModule,NgxUiLoaderHttpModule, NgxUiLoaderRouterModule} from 'ngx-ui-loader';

import { ToastrModule } from 'ngx-toastr';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { ModalModule, BsModalRef} from 'ngx-bootstrap/modal';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { AccordionModule} from 'ngx-bootstrap/accordion';
import {MODAL_CONFIG_DEFAULT_OVERRIDE} from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { AwarenessComponent } from './awareness/awareness.component';
import { CampsComponent } from './camps/camps.component';
import { SigninComponent } from './modalform/signin/signin.component';
import { RegisterComponent } from './modalform/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import { EditComponent } from './modalform/edit/edit.component';
import { DelaccComponent } from './modalform/delacc/delacc.component';
import { ChangepassComponent } from './modalform/changepass/changepass.component';
import { AddadminComponent } from './modalform/addadmin/addadmin.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    AwarenessComponent,
    CampsComponent,
    SigninComponent,
    RegisterComponent,
    DashboardComponent,
    AdminComponent,
    EditComponent,
    DelaccComponent,
    ChangepassComponent,
    AddadminComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    CollapseModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    PopoverModule.forRoot(),
    AccordionModule.forRoot(),
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 2000,
      progressBar: true
    }),
    NgxUiLoaderModule.forRoot({
      "bgsColor": "#0a58a6",
      "bgsOpacity": 1,
      "bgsType": "ball-spin-clockwise-fade-rotating",
      "bgsPosition": "center-center",
      "bgsSize": 60,
      "logoPosition": "center-center",
      "logoSize": 150,
      "logoUrl": "/assets/logo.png",
      "fastFadeOut": true,
      "overlayColor": "rgb(63,57,57)"
    }),
    NgxUiLoaderHttpModule,
    NgxUiLoaderRouterModule
  ],
  providers: [BsModalRef,DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: MODAL_CONFIG_DEFAULT_OVERRIDE, useValue: {
        backdrop: 'static',
        animated: true,
        class: 'modal-md' }}],
  bootstrap: [AppComponent]
})
export class AppModule { }
