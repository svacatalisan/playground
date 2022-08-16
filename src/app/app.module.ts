import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LayoutModule } from 'app/features/layout/layout.module';
import { CoreModule } from 'app/core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from 'app/features/home/home.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        LayoutModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot(),
        HttpClientModule,
        ReactiveFormsModule,
        CoreModule,
        SharedModule,
        AppRoutingModule,
        HomeModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
