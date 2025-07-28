import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http"
import { catchError, throwError } from "rxjs"

interface Error {
    status:  number;
    message: string;
}

export const ErrorResponseInterceptor : HttpInterceptorFn = (req, next) =>
    next(req).pipe(catchError(handleErrorResponse)); 

function handleErrorResponse(error: HttpErrorResponse) {
    const errorResponse: Error = { 
        status:  error.status,
        message: error.message
    }

    return throwError(() => errorResponse );
}