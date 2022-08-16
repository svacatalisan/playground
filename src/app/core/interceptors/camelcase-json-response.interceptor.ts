import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpEvent,
    HttpResponse,
    HttpRequest,
    HttpHandler,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { camelCase } from 'lodash';
import { filter, switchMap } from 'rxjs/operators';
import { convertCase } from 'app/shared/helpers/helpers';

@Injectable()
export class CamelcaseJSONResponseInterceptor implements HttpInterceptor {
    public intercept(
        httpRequest: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(httpRequest).pipe(
            filter(event => {
                return (
                    event instanceof HttpResponse &&
                    event.headers.get('responseType') == 'json'
                );
            }),
            switchMap(event =>
                of(this.processJsonResponse(event as HttpResponse<any>))
            )
        );
    }

    private processJsonResponse(res: HttpResponse<any>): HttpResponse<any> {
        let body = res.body;
        const originalBody = body;
        if (!body) {
            return res.clone({ body: {} });
        }

        try {
            body = convertCase(body, camelCase);
        } catch (error) {
            throw new HttpErrorResponse({
                error: { error, text: originalBody },
                headers: res.headers,
                status: res.status,
                statusText: res.statusText,
                url: res.url || undefined,
            });
        }
        return res.clone({ body });
    }
}
