// Third party imports
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { CommonModule } from '@angular/common';

import { pagesRouting } from './pages.routing';
import { PagesComponent } from './pages/pages.component';

@NgModule({
    imports: [
      FormsModule,
      HttpModule,
      CommonModule
    ],
    exports: [
      PagesComponent
    ],
    declarations: [
      PagesComponent,
    ],
    providers: [
    ],
})

export class PagesModule { }
