import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CamelcaseJSONResponseInterceptor } from './interceptors/camelcase-json-response.interceptor';
import { RequestMockerInterceptor } from './interceptors/request-mocker.interceptor';
import { WeatherApiGatewayInterceptor } from './interceptors/weather-api-gateway.interceptor';
import { ToCelciusTagConverterPipe } from './pipes/to-celsius.pipe';

@NgModule({
    declarations: [ToCelciusTagConverterPipe],
    exports: [ToCelciusTagConverterPipe],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestMockerInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CamelcaseJSONResponseInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: WeatherApiGatewayInterceptor,
            multi: true,
        },
    ],
})
export class CoreModule {}
