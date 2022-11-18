import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {BaseURLInterceptor} from "./interceptors/base-urlinterceptor.interceptor";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { HeaderComponent } from './components/header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {PagesComponent} from "./pages/pages.component";
import { ModalTycComponent } from './components/modal-tyc/modal-tyc.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { SolicitudPacComponent } from './components/solicitud-pac/solicitud-pac.component';
import { UserComponent } from './pages/user/user.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { SucursalComponent } from './pages/sucursal/sucursal.component';
import {MatMenuModule} from "@angular/material/menu";
import { RoleComponent } from './pages/roles/role/role.component';
import { CsdComponent } from './pages/csd/csd.component';
import { RestaurarContrasenaComponent } from './components/restaurar-contrasena/restaurar-contrasena.component';
import { AddStoreComponent } from './pages/dashboard/add-store/add-store.component';
import { ConfirmActionComponent } from './components/confirm-action/confirm-action.component';
import { AdduserComponent } from './pages/user/adduser/adduser.component';
import { RolesComponent } from './pages/roles/roles.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {NgxUiLoaderConfig, NgxUiLoaderModule} from 'ngx-ui-loader';
import { ModalTokenComponent } from './components/modal-token/modal-token.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';


const ngxuiloaderconfiguration : NgxUiLoaderConfig = {
    "blur": 1,
    "delay": 0,
    "fastFadeOut": true,
    "fgsColor": "#229a1c",
    "fgsPosition": "center-center",
    "fgsSize": 80,
    "fgsType": "wandering-cubes",
    "gap": 24,
    "masterLoaderId": "master",
    "overlayBorderRadius": "0",
    "overlayColor": "rgba(205,205,205,0.8)",
    "pbColor": "red",
    "pbDirection": "ltr",
    "pbThickness": 3,
    "hasProgressBar": false,
  }

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    HeaderComponent,
    PagesComponent,
    ModalTycComponent,
    SolicitudPacComponent,
    UserComponent,
    SucursalComponent,
    CsdComponent,
    RoleComponent,
    RestaurarContrasenaComponent,
    AddStoreComponent,
    ConfirmActionComponent,
    AdduserComponent,
    RolesComponent,
    ProfileComponent,
    ModalTokenComponent,
    ChangePasswordComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        HttpClientModule,
        MatSnackBarModule,
        MatSelectModule,
        MatButtonToggleModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatDialogModule,
        MatCheckboxModule,
        MatTableModule,
        MatPaginatorModule,
        MatMenuModule,
        NgxUiLoaderModule.forRoot(ngxuiloaderconfiguration),
        NgxUiLoaderModule,
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: BaseURLInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
