// Third party imports
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { CommonModule } from '@angular/common';

import { TestComponent } from './test/test.component';
import { TestRoutingModule } from './test-routing.module';
import { WebAddressComponent } from './test/web-address/web-address.component';
import { TestResultsComponent } from './test/test-results/test-results.component';
import { TestService } from './test/shared/test.service';
import { WindowService } from './test/shared/window.service';

import { InputTextModule, ButtonModule } from 'primeng/primeng'

@NgModule({
    imports: [
      FormsModule,
      HttpModule,
      CommonModule,
      TestRoutingModule,
      InputTextModule,
      ButtonModule
    ],
    exports: [
      TestComponent,
      WebAddressComponent,
      TestResultsComponent
    ],
    declarations: [
      TestComponent,
      WebAddressComponent,
      TestResultsComponent
    ],
    providers: [
      TestService,
      WindowService
    ],
})

export class TestModule { }
