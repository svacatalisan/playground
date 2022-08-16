import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'app/nz.module';
import { HomeComponent } from './home.component';
import { CoreModule } from 'app/core/core.module';
import { HomeRoutingModule } from './home-routing.module';
import { CommonModule } from '@angular/common';

const components = [HomeComponent];
@NgModule({
    declarations: components,
    imports: [CommonModule, NgZorroAntdModule, HomeRoutingModule, CoreModule],
    exports: [RouterModule],
})
export class HomeModule {}
