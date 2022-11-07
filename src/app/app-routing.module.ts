import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {AuthGuard} from "./guard/auth.guard";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {RegisterComponent} from "./pages/register/register.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path : 'dashboard',
    component : DashboardComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'register',
    component : RegisterComponent
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
