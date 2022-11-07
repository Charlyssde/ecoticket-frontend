import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class BaseURLInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.url.match(/^http(s)?:\/\/(.*)$/)) {
      const url = `${environment.api}${req.url}`.replace(/([^:]\/)\/+/g, '$1')
      req = req.clone({ url })
    }
    return next.handle(req)
  }
}
