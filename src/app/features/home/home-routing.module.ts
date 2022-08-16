import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'app/features/home/home.component';
import { LayoutRoutingService } from 'app/features/layout/layout.service';
import { PageUnderDevelopmentComponent } from 'app/shared/components/page-under-development/page-under-development.componeent';

const securedRoutes: Routes = [
    LayoutRoutingService.childRoutes([
        { path: '', component: HomeComponent },
        { path: '**', component: PageUnderDevelopmentComponent },
    ]),
];

@NgModule({
    imports: [RouterModule.forChild(securedRoutes)],
    exports: [RouterModule],
})
export class HomeRoutingModule {}
