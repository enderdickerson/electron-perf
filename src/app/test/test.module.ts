// Third party imports
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { CommonModule } from '@angular/common';

import { TestComponent } from './test/test.component';
import { TestRoutingModule } from './test-routing.module';
import { WebAddressComponent } from './test/web-address/web-address.component';

import { SharedModule } from '../shared/shared.module';

import { InputTextModule, ButtonModule } from 'primeng/primeng';
import { TestListComponent } from './test/testlist/testlist.component';

@NgModule({
    imports: [
      FormsModule,
      HttpModule,
      CommonModule,
      TestRoutingModule,
      InputTextModule,
      ButtonModule,
      SharedModule
    ],
    exports: [
      TestComponent,
      WebAddressComponent
    ],
    declarations: [
      TestComponent,
      WebAddressComponent,
      TestListComponent
    ],
    providers: [],
})

export class TestModule { }
