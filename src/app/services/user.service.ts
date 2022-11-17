import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  saveUser (data : any) : Observable<any> {
    return this.http.post(environment.api + 'user/', data)
  }

  updateUser (id : string, data : any) : Observable<any> {
    return this.http.put(environment.api + 'user/' + id, data);
  }

  deleteUser (id : string) : Observable<any>{
    return this.http.delete(environment.api + 'user/' + id)
  }

  getProfile(id : string) : Observable<any>{
    return this.http.get(environment.api + 'user/' + id)
  }

  getUser () : Observable<any>{
    return this.http.get(environment.api + 'user');
  }

  getuserbyid (id : string) : Observable<any>{
    return this.http.get(environment.api + 'userid/' + id);
  }
}
