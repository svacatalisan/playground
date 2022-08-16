import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout.component';
import { NgZorroAntdModule } from 'app/nz.module';
import { NavIconComponent } from './components/nav-icon/nav-icon.component';
import { WeatherForecastComponent } from './components/weather-forecase/weather-forecast.component';
import { CoreModule } from 'app/core/core.module';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import weatherForcastReducer, {
    name,
} from 'app/store/slices/weather-forcast/weather-forcast.slice';
import { WeatherForcastEffect } from 'app/store/slices/weather-forcast/weather-forecast.effect';
import { SharedModule } from 'app/shared/shared.module';
import { LocationSelectorComponent } from './components/location-selector/location-selector.component';
import { LocationsListComponent } from './components/locations-list/locations-list.component';
import { LayoutRoutingService } from './layout.service';
import { RouterModule } from '@angular/router';

const components = [
    LayoutComponent,
    NavIconComponent,
    WeatherForecastComponent,
    SideMenuComponent,
    UserProfileComponent,
    LocationSelectorComponent,
    LocationsListComponent,
];
@NgModule({
    declarations: components,
    imports: [
        BrowserModule,
        CoreModule,
        StoreModule.forFeature(name, weatherForcastReducer),
        EffectsModule.forFeature([WeatherForcastEffect]),
        RouterModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        SharedModule,
    ],
    exports: components,
    providers: [LayoutRoutingService],
})
export class LayoutModule {}
