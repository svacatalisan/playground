import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './components/not-found/not-found.component';
import { InputTextComponent } from './components/input-wrapper/input-wrapper.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'app/nz.module';
import WeatherForcastService from './services/weather-forcast.service';
import { PageUnderDevelopmentComponent } from './components/page-under-development/page-under-development.componeent';

const components = [
    InputTextComponent,
    PageNotFoundComponent,
    PageUnderDevelopmentComponent,
];
@NgModule({
    declarations: components,
    imports: [BrowserModule, NgZorroAntdModule, ReactiveFormsModule],
    exports: components,
    providers: [WeatherForcastService],
})
export class SharedModule {}
