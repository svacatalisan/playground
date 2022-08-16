import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const sliceName = 'weatherForcastLocations';

export interface WeatherForecastItem {
    tempC: number;
    maxTempC: number;
    minTempC: number;
    precipMm: number;
    chanceOfRain: number;
    timeEpoch: number;
    time: string;
    eta: number;
}

export interface WeatherForecastPerWeek {
    location: {
        name: string;
        region: string;
        country: string;
        lat: number;
        lon: number;
        tzId: string;
        localtimeEpoch: number;
        localtime: string;
    };
    current: {
        tempC: number;
        maxTempC: number;
        minTempC: number;
        precipMm: number;
        chanceOfRain: number;
    };
    forecast: {
        forecastday: WeatherForecastItem[];
    };
}

export interface WeatherForcastState {
    location: WeatherForecastPerWeek | undefined;
    locations: WeatherForecastPerWeek[];
    searchTerm: string;
    locationsLoaded: boolean;
    inputFocused: boolean;
    clickedInSelectionArea: boolean;
}

export const initialState: WeatherForcastState = {
    location: undefined,
    locations: [],
    searchTerm: '',
    locationsLoaded: false,
    inputFocused: false,
    clickedInSelectionArea: false,
};

export const weatherForcastSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        fetchLocations: (state: WeatherForcastState) => {
            state.locationsLoaded = false;
        },
        setInputFocused: (
            state: WeatherForcastState,
            action: PayloadAction<{ focused: boolean }>
        ) => {
            state.inputFocused = action.payload.focused;
        },
        setClikedInSelectionArea: (
            state: WeatherForcastState,
            action: PayloadAction<{ clickedInSelectionArea: boolean }>
        ) => {
            state.clickedInSelectionArea =
                action.payload.clickedInSelectionArea;
        },
        setSearchTerm: (
            state: WeatherForcastState,
            action: PayloadAction<{ searchTerm: string }>
        ) => {
            state.searchTerm = action.payload.searchTerm;
        },
        setLocation: (
            state: WeatherForcastState,
            action: PayloadAction<{ location: WeatherForecastPerWeek }>
        ) => {
            state.location = action.payload.location;
            state.locationsLoaded = false;
        },
        setLocations: (
            state: WeatherForcastState,
            action: PayloadAction<{ locations: WeatherForecastPerWeek[] }>
        ) => {
            state.locations = action.payload.locations;
            state.locationsLoaded = true;
        },
    },
});

const {
    reducer,
    actions: {
        fetchLocations,
        setInputFocused,
        setClikedInSelectionArea,
        setLocation,
        setLocations,
        setSearchTerm,
    },
    name,
} = weatherForcastSlice;

export {
    name,
    fetchLocations,
    setInputFocused,
    setClikedInSelectionArea,
    setLocation,
    setLocations,
    setSearchTerm,
};

export const selectFeatureName =
    createFeatureSelector<ReturnType<typeof reducer>>(name);

export const selectActiveLocation = createSelector(
    selectFeatureName,
    state => state.location
);

export const selectAllLocations = createSelector(
    selectFeatureName,
    state => state.locations
);

export const selectSearchTerm = createSelector(
    selectFeatureName,
    state => state.searchTerm
);

export const selectDisplayLocationsSelectionPanel = createSelector(
    selectFeatureName,
    state =>
        !!(
            state.locationsLoaded &&
            (state.clickedInSelectionArea || state.inputFocused)
        )
);

export default reducer;
