// Third party imports
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { CommonModule } from '@angular/common';
import { dashboardRouting } from './dashboard.routing';

// Custom imports
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    imports: [
      FormsModule,
      HttpModule,
      CommonModule,
      dashboardRouting
    ],
    exports: [
      DashboardComponent
    ],
    declarations: [
      DashboardComponent,
    ],
    providers: [
    ],
})

export class DashboardModule { }
