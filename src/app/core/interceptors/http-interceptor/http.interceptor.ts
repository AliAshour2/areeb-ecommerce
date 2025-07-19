import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorMessage = error.error?.message || 'Something went wrong';
      console.log(errorMessage);
      return throwError(() => error);
    }),

  );
};
