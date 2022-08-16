import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpEvent,
    HttpResponse,
    HttpRequest,
    HttpHandler,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { mockedResponses } from 'mocker/mocker';
import { camelCase } from 'lodash';
import { convertCase } from 'app/shared/helpers/helpers';

@Injectable()
export class RequestMockerInterceptor implements HttpInterceptor {
    public intercept(
        httpRequest: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (!environment.useMocker) {
            return next.handle(httpRequest);
        }

        const { url, method } = httpRequest;

        const mockBodyData = mockedResponses?.[url]?.find(
            mr => mr.method == method
        )?.body;

        if (mockBodyData) {
            return of(
                new HttpResponse({
                    body: convertCase(mockBodyData, camelCase),
                    url: httpRequest.url,
                    status: 200,
                    statusText: 'Mocked',
                })
            );
        }
        return throwError(
            () =>
                new HttpErrorResponse({
                    status: 404,
                    url: httpRequest.url,
                    statusText: 'Mock not found',
                })
        );
    }
}
