// Third party imports
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import {ButtonModule, ChartModule} from 'primeng/primeng';

// Custom imports
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RunDateComponent } from './dashboard/rundate/rundate.component';

import { SharedModule } from '../shared/shared.module';
import { PercentageChangeGraphComponent } from './dashboard/percentagechangegraph/percentagechangegraph.component';
import { PagePerEnvironmentComponent } from './dashboard/pageperenvironment/pageperenvironment.component';
import { TestCountComponent } from './dashboard/testcount/testcount.component';

@NgModule({
    imports: [
      FormsModule,
      HttpModule,
      CommonModule,
      DashboardRoutingModule,
      ButtonModule,
      ChartModule,
      SharedModule
    ],
    exports: [
      DashboardComponent
    ],
    declarations: [
      DashboardComponent,
      RunDateComponent,
      PercentageChangeGraphComponent,
      PagePerEnvironmentComponent,
      TestCountComponent
    ],
    providers: [],
})

export class DashboardModule { }
