import { Component, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as WeatherReducer from 'app/store/slices/weather-forcast/weather-forcast.slice';

@Component({
    selector: 'app-locations-list',
    templateUrl: './locations-list.component.html',
    styleUrls: ['./locations-list.component.scss'],
})
export class LocationsListComponent {
    constructor(private readonly store: Store<{}>) {}

    locationsForecaseLookup$: Observable<
        WeatherReducer.WeatherForecastPerWeek[] | undefined
    > = this.store.select(WeatherReducer.selectAllLocations);

    selectLocation(location: WeatherReducer.WeatherForecastPerWeek): void {
        this.store.dispatch(WeatherReducer.setLocation({ location }));
    }

    @HostListener('document:click', ['$event'])
    clickout(event: any) {
        const clickedInSelectionArea = event.path.find((node: any) =>
            ['app-locations-list', 'app-location-selector'].includes(
                node.localName
            )
        );
        this.store.dispatch(
            WeatherReducer.setClikedInSelectionArea({ clickedInSelectionArea })
        );
    }
}
