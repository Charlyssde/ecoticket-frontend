import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginModel} from "../models/login-model";
import {environment} from "../../environments/environment";
import {catchError, Observable, tap} from "rxjs";
import {Router} from "@angular/router";
import jwt_decode from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient,  private router: Router) { }

  _usuario = {}
  token = {}

  public login(user : LoginModel) : Observable<any>{
    return this.http.post(environment.api + 'login', user).pipe(
      tap((response: any) => {
        const result: any = jwt_decode(response.access_token)
        sessionStorage.setItem('usuario', result.given_name)
        sessionStorage.setItem('token', response.access_token)
        sessionStorage.setItem('refresh_token', response.refresh_token)

        this._usuario = {
          username: result.given_name,
          token: response.access_token,
          permissions: result.resource_access.usuarios.roles
        }

        sessionStorage.setItem('info-user', JSON.stringify(this._usuario))
      }),
      catchError(async (err) => err.error)
    )
  }

  public logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem('token');
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem('token') : null;
  }

}
