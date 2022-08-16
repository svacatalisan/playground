import { Route, Routes } from '@angular/router';
import { AuthGuard } from 'app/core/guards/auth.guard';
import { LayoutComponent } from './layout.component';

export class LayoutRoutingService {
    static childRoutes(routes: Routes): Route {
        return {
            path: '',
            component: LayoutComponent,
            children: routes,
            canActivate: [AuthGuard],
        };
    }
}
