import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginModel} from "../models/login-model";
import {environment} from "../../environments/environment";
import {catchError, Observable, tap} from "rxjs";
import {Router} from "@angular/router";
import jwt_decode from 'jwt-decode'
import { getAuth, signInWithCustomToken } from "firebase/auth";
import app from '../firebase-config'
import {PermissionService} from "./permission.service";

const auth = getAuth(app);

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpClient,
    private router: Router,
    private permissionsService : PermissionService) { }


  _usuario = {}
  token = {}

  public login(user : LoginModel) : Observable<any>{
    return this.http.post(environment.api + 'login', user).pipe(
      tap(async(response: any) => {
        const result: any = jwt_decode(response.token)
        await signInWithCustomToken(auth, response.token)
          .then((userCredential : any) => {
            const user = userCredential.user;
            sessionStorage.setItem('usuario', result.claims.username)
            sessionStorage.setItem('name', result.claims.name)
            sessionStorage.setItem('id', result.claims.id)
            sessionStorage.setItem('authId', result.claims.authId)
            sessionStorage.setItem('rol', result.claims.role)
            sessionStorage.setItem('token', user.accessToken);
            sessionStorage.setItem('sucursal', result.claims.sucursal);

            this._usuario = {
              username: result.claims.username,
              token: response.token,
              permissions: result.claims.role
            }

            sessionStorage.setItem('info-user', JSON.stringify(this._usuario))
            this.permissionsService.emitChangeEvent(result.claims.rol);
          })
          .catch((error : any) => {
            console.log("Error->", error)
          });
      }),
      catchError(async (err) => err.error)
    )
  }

  public register(data : any) : Observable<any> {
    return this.http.post(environment.api + 'register', data).pipe(
      tap(async(response: any) => {
        const result: any = jwt_decode(response.token)
        await signInWithCustomToken(auth, response.token)
          .then((userCredential : any) => {
            const user = userCredential.user;
            sessionStorage.setItem('usuario', result.claims.username)
            sessionStorage.setItem('name', result.claims.name)
            sessionStorage.setItem('id', result.claims.id)
            sessionStorage.setItem('authId', result.claims.authId)
            sessionStorage.setItem('rol', result.claims.role)
            sessionStorage.setItem('token', user.accessToken);
            sessionStorage.setItem('sucursal', result.claims.sucursal);
            this._usuario = {
              username: result.claims.username,
              token: response.claims.token,
              permissions: result.claims.role
            }

            sessionStorage.setItem('info-user', JSON.stringify(this._usuario));
            this.permissionsService.emitChangeEvent(result.claims.rol);
          })
          .catch((error : any) => {
            console.log("Error->", error)
          });
      }),
      catchError(async (err) => err.error)
    );
  }

  public logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('authId');
    sessionStorage.removeItem('info-user');
    sessionStorage.removeItem('rol');
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = sessionStorage.getItem('token');
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? sessionStorage.getItem('token') : null;
  }

  public updatePassword(id : string, data : any) : Observable<any>{
    return this.http.post('newpassword/' + id, data);
  }

}
