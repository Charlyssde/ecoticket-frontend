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
        const result: any = jwt_decode(response.token)
        sessionStorage.setItem('usuario', result.username)
        sessionStorage.setItem('token', response.token)

        this._usuario = {
          username: result.username,
          token: response.token,
          permissions: result.rol
        }

        sessionStorage.setItem('info-user', JSON.stringify(this._usuario))
      }),
      catchError(async (err) => err.error)
    )
  }

  public register(data : any) : Observable<any> {
    return this.http.post(environment.api + 'register', data);
  }

  public logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = sessionStorage.getItem('token');
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? sessionStorage.getItem('token') : null;
  }

}
