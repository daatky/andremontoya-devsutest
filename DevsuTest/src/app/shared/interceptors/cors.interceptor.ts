import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environment/environment';

@Injectable()
export class CorsInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({
      headers: request.headers
        .set('Access-Control-Allow-Origin', '*')
        .set('access-control-allow-headers', '*')
        .set('access-control-allow-methods', 'GET, POST, PUT, DELETE')
        .set('authorId', environment.authorId.toString())
    });

    return next.handle(modifiedRequest);
  }
}
