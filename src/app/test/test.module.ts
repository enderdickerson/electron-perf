// Third party imports
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { CommonModule } from '@angular/common';

import { TestComponent } from './test/test.component';
import { TestRoutingModule } from './test-routing.module';
import { WebAddressComponent } from './test/web-address/web-address.component';
import { TestResultsComponent } from './test/test-results/test-results.component';

@NgModule({
    imports: [
      FormsModule,
      HttpModule,
      CommonModule,
      TestRoutingModule
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
    ],
})

export class TestModule { }
