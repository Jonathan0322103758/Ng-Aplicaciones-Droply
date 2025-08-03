// src/app/interceptors/error-response.interceptor.ts
import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AlertMainService } from "@Component/shared/alert-main/alert-main.service";
import { catchError, throwError } from "rxjs";

interface Error {
  status: number;
  message: string;
}

export const ErrorResponseInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const alert = inject(AlertMainService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) =>
      handleErrorResponse(error, router, alert)
    )
  );
};

function handleErrorResponse(
  error: HttpErrorResponse,
  router: Router,
  alert: AlertMainService
) {
  if (error.status === 403) {
    alert.setAlert(403, 'Acceso denegado. El usuario no está autorizado. Se requiere iniciar sesión con credenciales válidas para acceder al sistema.');
    router.navigate(['/auth']);
  }

  return throwError(() => error);
}
