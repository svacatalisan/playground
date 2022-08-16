import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import * as WeatherReducer from 'app/store/slices/weather-forcast/weather-forcast.slice';
import { WeatherForecastItem } from 'app/store/slices/weather-forcast/weather-forcast.slice';

@Component({
    selector: 'app-weather-forecast',
    templateUrl: './weather-forecast.component.html',
    styleUrls: ['./weather-forecast.component.scss'],
})
export class WeatherForecastComponent {
    constructor(private readonly store: Store<{}>) {}
    date = moment('2022-08-12');
    currentLocationForecast$: Observable<
        WeatherReducer.WeatherForecastPerWeek | undefined
    > = this.store.select(WeatherReducer.selectActiveLocation);

    color = 'white';

    getWeeklyForecst(location: any) {
        return location.forecast.forecastday as WeatherForecastItem[];
    }

    isToday(time: string) {
        return moment(time).isSame(this.date);
    }

    isBefore(time: string) {
        return moment(time).isBefore(this.date);
    }

    formatForecastEta(eta: number | undefined) {
        return eta ? `${eta} mm` : '-';
    }

    getLocation(location: any) {
        return (location as WeatherReducer.WeatherForecastPerWeek).location;
    }
}
