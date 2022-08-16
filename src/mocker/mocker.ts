import { weatherStatistics } from './locations';

export interface MockedResponse {
    method: string;
    body: any | any[];
}

export const mockedResponses: { [url: string]: MockedResponse[] } = {
    'http://weather-forecast.com/get-forcast': [
        {
            method: 'GET',
            body: weatherStatistics,
        },
    ],

    'http://oauth.com/login': [
        {
            method: 'post',
            body: {
                userName: 'Alexandru Catalisan',
                token: 'authToken',
            },
        },
    ],
};
