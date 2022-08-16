import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpEvent,
    HttpRequest,
    HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';

const WEATHER_API_KEY = 'alex-secret-key';

@Injectable()
export class WeatherApiGatewayInterceptor implements HttpInterceptor {
    intercept(
        httpRequest: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (this.isExternalApiRequest({ httpRequest })) {
            return next.handle(
                httpRequest.clone({
                    setHeaders: {
                        weatherApiKey: WEATHER_API_KEY,
                        responseType: 'json',
                    },
                })
            );
        }
        return next.handle(httpRequest);
    }

    private isExternalApiRequest({
        httpRequest,
    }: {
        httpRequest: HttpRequest<any>;
    }) {
        return (
            httpRequest.url.indexOf('weather-forecast.com') >= 0 &&
            httpRequest.method == 'GET'
        );
    }
}
