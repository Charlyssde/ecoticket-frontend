import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  constructor(private http : HttpClient) { }

  sendTicket(data : string) : Observable<any>{
    return this.http.post(environment.apiFacturacion, data);
  }

}