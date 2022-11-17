import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {AuthGuard} from "./guard/auth.guard";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {RegisterComponent} from "./pages/register/register.component";
import {PagesComponent} from "./pages/pages.component";
import { UserComponent } from './pages/user/user.component';
import {SucursalComponent} from "./pages/sucursal/sucursal.component";
import {CsdComponent} from "./pages/csd/csd.component";
import {RolesComponent} from "./pages/roles/roles.component";
import {ProfileComponent} from "./pages/profile/profile.component";

const routes: Routes = [
  {
    path : '',
    component : PagesComponent,
    canActivate : [AuthGuard],
    children : [
      {path : 'dashboard', component: DashboardComponent},
      {path : 'sucursal', component: SucursalComponent},
      {path : 'user', component : UserComponent},
      {path : 'csd', component : CsdComponent},
      {path : 'roles', component : RolesComponent},
      {path : 'profile', component : ProfileComponent},
      {path: "", redirectTo: "/dashboard", pathMatch: "full" },
    ]
  },
  {path: "", redirectTo: "/login", pathMatch: "full" },
  {path: 'login', component: LoginComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'user', component : UserComponent},
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
