// Third party imports
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/primeng';

// Custom imports
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RunDateComponent } from './dashboard/rundate/rundate.component';

import { SharedModule } from '../shared/shared.module';
import { PercentageChangeGraphComponent } from './dashboard/percentagechangegraph/percentagechangegraph.component';

@NgModule({
    imports: [
      FormsModule,
      HttpModule,
      CommonModule,
      DashboardRoutingModule,
      ButtonModule,
      SharedModule
    ],
    exports: [
      DashboardComponent
    ],
    declarations: [
      DashboardComponent,
      RunDateComponent,
      PercentageChangeGraphComponent
    ],
    providers: [],
})

export class DashboardModule { }
