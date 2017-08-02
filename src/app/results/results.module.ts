// Third party imports
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import {ButtonModule, ChartModule} from 'primeng/primeng';

// Custom imports
import { ResultsComponent } from './results/results.component';
import { ResultsRoutingModule } from './results-routing.module';
import { ResultListComponent } from './results/resultlist/resultlist.component';
import { ResultViewComponent } from './results/resultview/resultview.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    FormsModule,
    HttpModule,
    CommonModule,
    ResultsRoutingModule,
    ButtonModule,
    SharedModule,
    ChartModule
  ],
  exports: [
    ResultsComponent,
    ResultListComponent,
    ResultViewComponent
  ],
  declarations: [
    ResultsComponent,
    ResultListComponent,
    ResultViewComponent
  ],
  providers: [
  ],
})

export class ResultsModule { }
