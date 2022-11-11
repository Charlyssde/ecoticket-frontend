import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {AuthGuard} from "./guard/auth.guard";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {RegisterComponent} from "./pages/register/register.component";
import {PagesComponent} from "./pages/pages.component";
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  {
    path : '',
    component : PagesComponent,
    canActivate : [AuthGuard],
    children : [
      {path : 'dashboard', component: DashboardComponent},
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
