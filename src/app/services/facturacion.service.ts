import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  constructor(private http : HttpClient) { }

  getAllPacs() : Observable<any>{
    return this.http.get(environment.ecoticketApi + 'pacs');
  }

  sendTicket(data : string) : Observable<any>{
    return this.http.post(environment.ecoticketApi, data);
  }

}
