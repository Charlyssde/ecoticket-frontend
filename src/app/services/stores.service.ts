import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StoreModel} from "../models/store-model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  constructor(
    private http : HttpClient
  ) { }

  saveStore (data : any) : Observable<any> {
    return this.http.post(environment.api + 'store/', data)
  }

  updateStore (id : string, data : any) : Observable<any> {
    return this.http.put(environment.api + 'store/' + id, data);
  }

  deleteStore (id : string) : Observable<any>{
    return this.http.delete(environment.api + 'store/' + id)
  }

  getAllStores (id : string) : Observable<any>{
    return this.http.get(environment.api + 'store/all/' + id);
  }

  getStore (id : string) : Observable<any>{
    return this.http.get(environment.api + 'store/' + id);
  }

}
