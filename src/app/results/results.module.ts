// Third party imports
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import {ButtonModule, ChartModule, ConfirmationService, ConfirmDialogModule} from 'primeng/primeng';

// Custom imports
import { ResultsComponent } from './results/results.component';
import { ResultsRoutingModule } from './results-routing.module';
import { ResultListComponent } from './results/resultlist/resultlist.component';
import { ResultViewComponent } from './results/resultview/resultview.component';

import { SharedModule } from '../shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ResultHomeComponent} from "./results/resulthome/resulthome.component";

@NgModule({
  imports: [
    FormsModule,
    HttpModule,
    CommonModule,
    ResultsRoutingModule,
    ButtonModule,
    SharedModule,
    ChartModule,
    BrowserAnimationsModule
  ],
  exports: [
    ResultsComponent,
    ResultListComponent,
    ResultViewComponent,
    ResultHomeComponent
  ],
  declarations: [
    ResultsComponent,
    ResultListComponent,
    ResultViewComponent,
    ResultHomeComponent
  ],
  providers: [
  ],
})

export class ResultsModule { }
