import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http : HttpClient) { }

  sendPacRquest(data : any) : Observable<any> {
    return this.http.post(environment.api + 'email', data);
  }

  sendCondiciones (data : any) : Observable<any> {
    return this.http.post(environment.api + 'email-condiciones',data)
  }

  sendCredenciales(data : any) : Observable<any> {
    return this.http.post(environment.api + 'email-credenciales', data)
  }

}
