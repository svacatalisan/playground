import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
    selectActiveLocation,
    WeatherForecastPerWeek,
} from 'app/store/slices/weather-forcast/weather-forcast.slice';

@Component({
    selector: 'app-home-profile',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    constructor(private readonly store: Store<{}>) {}

    currentLocationForecast$: Observable<WeatherForecastPerWeek | undefined> =
        this.store.select(selectActiveLocation);
}
