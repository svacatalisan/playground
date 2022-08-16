import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { batchedSubscribe } from 'redux-batched-subscribe';

import { debounce } from 'lodash';

import weatherForcastReducer from './slices/weather-forcast/weather-forcast.slice';

const reducer = combineReducers({
    locations: weatherForcastReducer,
});

const debounceNotify = debounce(notify => notify());

const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
    enhancers: [batchedSubscribe(debounceNotify)],
});
