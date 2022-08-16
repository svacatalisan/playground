import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as WeatherReducer from 'app/store/slices/weather-forcast/weather-forcast.slice';

@Component({
    selector: 'app-location-selector',
    templateUrl: './location-selector.component.html',
    styleUrls: ['./location-selector.component.scss'],
})
export class LocationSelectorComponent implements OnInit {
    @Input('form') form!: FormGroup;
    @Input('control') control!: string;
    color = 'white';
    showSelectionPanel: boolean = false;

    constructor(private readonly store: Store<{}>) {}

    locationsForecaseLookup$: Observable<
        WeatherReducer.WeatherForecastPerWeek[] | undefined
    > = this.store.select(WeatherReducer.selectAllLocations);

    showSelectionPanel$: Observable<boolean> = this.store.select(
        WeatherReducer.selectDisplayLocationsSelectionPanel
    );

    ngOnInit(): void {
        this.showSelectionPanel$.subscribe(
            showSelectionPanel => (this.showSelectionPanel = showSelectionPanel)
        );
    }

    onFocus = () => {
        this.store.dispatch(WeatherReducer.setInputFocused({ focused: true }));
    };

    onBlur = () => {
        this.store.dispatch(WeatherReducer.setInputFocused({ focused: false }));
    };
}
