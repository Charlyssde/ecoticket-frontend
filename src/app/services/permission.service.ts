import { Injectable } from '@angular/core';
import {distinctUntilChanged, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private _eventSubject : Subject<any> = new Subject();
  public event$ : Observable<any> = this._eventSubject.asObservable().pipe(distinctUntilChanged());
  constructor() {}

  emitChangeEvent(permissionOptions : string[]) : void {
    this._eventSubject.next(permissionOptions);
  }
}
