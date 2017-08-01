// Third party imports
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import {ToolbarComponent} from './toolbar/toolbar.component';

// Custom imports

@NgModule({
    imports: [
      FormsModule,
      HttpModule,
      CommonModule
    ],
    exports: [
      ToolbarComponent
    ],
    declarations: [
      ToolbarComponent
    ],
    providers: [],
})

export class ToolbarModule { }
