import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class EnvInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get env from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const env = urlParams.get('env');

        // If env exists, add it to the request
        if (env) {
            let params = new HttpParams({ fromString: request.params.toString() });
            params = params.set('env', env);
            
            request = request.clone({
                params: params
            });
        }

        return next.handle(request);
    }
} 