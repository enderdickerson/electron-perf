// Third party imports
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { TestComponent } from './test/test.component';
import { TestRoutingModule } from './test-routing.module';
import { TestToolbarComponent } from './test/testtoolbar/testtoolbar.component';

import { SharedModule } from '../shared/shared.module';

import {InputTextModule, ButtonModule, SpinnerModule, InputSwitchModule, CheckboxModule} from 'primeng/primeng';
import { TestListComponent } from './test/testlist/testlist.component';
import { NewTestFormComponent } from './test/newtestform/newtestform.component';
import { TestEditorComponent } from './test/testeditor/testeditor.component';
import { TestFormComponent } from './test/testform/testform.component';

@NgModule({
    imports: [
      FormsModule,
      HttpModule,
      CommonModule,
      TestRoutingModule,
      InputTextModule,
      ButtonModule,
      SpinnerModule,
      InputSwitchModule,
      CheckboxModule,
      SharedModule
    ],
    exports: [],
    declarations: [
      TestComponent,
      TestToolbarComponent,
      TestListComponent,
      NewTestFormComponent,
      TestEditorComponent,
      TestFormComponent
    ],
    providers: [],
})

export class TestModule { }
