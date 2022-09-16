import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, map, flatMap, mergeMap, tap, of } from 'rxjs';
import { JwtService } from '../services/jwt.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private FREE_PASS_PATHS: string[];

  constructor(private jwtService: JwtService) {
    this.FREE_PASS_PATHS = ['auth/login'];
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const path = request.url.replace(/http(s)?:\/\/.*?\//, '');
    if (!this.FREE_PASS_PATHS.includes(path)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.jwtService.getJWT()}`,
        },
      });
    }
    return next.handle(request);
  }
}
