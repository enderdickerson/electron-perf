// Third party imports
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { CommonModule } from '@angular/common';

import { PagesComponent } from './pages/pages.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
    imports: [
      FormsModule,
      HttpModule,
      CommonModule,
      PagesRoutingModule
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
