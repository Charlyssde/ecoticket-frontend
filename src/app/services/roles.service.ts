import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {RolesModel} from "../models/roles-model";

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    private http : HttpClient
  ) { }

  getAllRoles(id : string) : Observable<any>{
    return this.http.get(environment.api + 'role/' + id)
  }

  saveRole(data : RolesModel) : Observable<any>{
    return this.http.post(environment.api + 'role', data)
  }

  updateRole(data : RolesModel) : Observable<any>{
    return this.http.put(environment.api + 'role', data)
  }

  deleteRole(id : string) : Observable<any>{
    return this.http.delete(environment.api + 'role/' + id)
  }

}
