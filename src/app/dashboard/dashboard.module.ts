// Third party imports
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/primeng';

// Custom imports
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { WindowService } from '../shared/window.service';
import { ResultService } from './shared/result.service';
import { ResultListComponent } from './dashboard/resultlist/resultlist.component';
import { ResultViewComponent } from './dashboard/resultview/resultview.component';

@NgModule({
    imports: [
      FormsModule,
      HttpModule,
      CommonModule,
      DashboardRoutingModule,
      ButtonModule
    ],
    exports: [
      DashboardComponent,
      ResultListComponent,
      ResultViewComponent
    ],
    declarations: [
      DashboardComponent,
      ResultListComponent,
      ResultViewComponent
    ],
    providers: [
      WindowService,
      ResultService
    ],
})

export class DashboardModule { }
