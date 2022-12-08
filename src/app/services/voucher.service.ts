import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private http : HttpClient) { }

  getAllVouchers () : Observable<any> {
    return this.http.get(environment.api + 'vauchers')
  }
}
