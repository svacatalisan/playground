import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import WeatherForcastService from 'app/shared/services/weather-forcast.service';

import {
    fetchLocations,
    selectSearchTerm,
    setClikedInSelectionArea,
    setLocation,
    setLocations,
    setSearchTerm,
    WeatherForecastPerWeek,
} from './weather-forcast.slice';

@Injectable()
export class WeatherForcastEffect {
    readonly fetchLocations$ = createEffect(() =>
        this.actions$.pipe(
            // Listen for multiplyBy.trigger
            ofType(...[fetchLocations, setSearchTerm]),
            // get the latest count value
            withLatestFrom(this.store.select(selectSearchTerm)),
            switchMap(([, searchTerm]) => {
                return this.weatherForcastService.get().pipe(
                    map(locations =>
                        this.filterLocationByNameRegionAndCounty({
                            searchTerm,
                            locations,
                        })
                    )
                );
            }),
            switchMap(locations => of(setLocations({ locations })))
        )
    );

    readonly clickOnLocationLocations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(setLocation),
            switchMap(() => {
                console.log('clickOnLocationLocations effect called');
                return of(
                    ...[
                        setClikedInSelectionArea({
                            clickedInSelectionArea: false,
                        }),
                        setSearchTerm({ searchTerm: '' }),
                    ]
                );
            })
        )
    );

    private filterLocationByNameRegionAndCounty({
        searchTerm,
        locations,
    }: {
        searchTerm: string;
        locations: WeatherForecastPerWeek[];
    }): WeatherForecastPerWeek[] {
        const filteredLocations = searchTerm
            ? locations?.filter(loc =>
                  [
                      loc.location.name.toLowerCase(),
                      loc.location.country.toLowerCase(),
                      loc.location.region.toLowerCase(),
                  ].find(verb => verb.indexOf(searchTerm.toLowerCase()) >= 0)
              )
            : locations;
        return filteredLocations || [];
    }

    constructor(
        private readonly actions$: Actions,
        private readonly store: Store,
        private readonly weatherForcastService: WeatherForcastService
    ) {}
}
