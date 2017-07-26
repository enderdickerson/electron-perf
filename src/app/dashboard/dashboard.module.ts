// Third party imports
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { CommonModule } from '@angular/common';

// Custom imports
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { WindowService } from '../shared/window.service';
import { ResultService } from './shared/result.service';

@NgModule({
    imports: [
      FormsModule,
      HttpModule,
      CommonModule,
      DashboardRoutingModule      
    ],
    exports: [
      DashboardComponent
    ],
    declarations: [
      DashboardComponent,
    ],
    providers: [
      WindowService,
      ResultService
    ],
})

export class DashboardModule { }
