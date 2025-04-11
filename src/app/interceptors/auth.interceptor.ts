import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private authService: AuthService, private router: Router) {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authService.getAuthToken().pipe(
      take(1),
      switchMap(token => {
        // If we have a token, add it to the request
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
        }
        
        return next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
            // If we get a 401 Unauthorized response, redirect to login
            if (error.status === 401) {
              this.authService.logout();
              this.router.navigate(['/login']);
            }
            return throwError(() => error);
          })
        );
      })
    );
  }
} 