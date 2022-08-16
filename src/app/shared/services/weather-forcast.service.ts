import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherForecastPerWeek } from 'app/store/slices/weather-forcast/weather-forcast.slice';
import { catchError, Observable, of } from 'rxjs';

@Injectable()
export default class WeatherForcastService {
    baseUrl!: string;
    constructor(private readonly httpClient: HttpClient) {
        this.baseUrl = 'http://weather-forecast.com';
    }

    get(): Observable<WeatherForecastPerWeek[]> {
        return this.httpClient
            .get<WeatherForecastPerWeek[]>(`${this.baseUrl}/get-forcast`, {
                responseType: 'json',
            })
            .pipe(catchError(() => of([])));
    }
}
