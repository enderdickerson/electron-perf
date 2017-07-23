import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'dashboard',
                component: DashboardComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})

export class DashboardRoutingModule {}
