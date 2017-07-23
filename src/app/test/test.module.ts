// Third party imports
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { CommonModule } from '@angular/common';

import { TestComponent } from './test/test.component';

@NgModule({
    imports: [
      FormsModule,
      HttpModule,
      CommonModule
    ],
    exports: [
      TestComponent
    ],
    declarations: [
      TestComponent,
    ],
    providers: [
    ],
})

export class TestModule { }
