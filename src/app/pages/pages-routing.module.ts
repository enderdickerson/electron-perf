import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'pages',
                component: PagesComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})

export class PagesRoutingModule {}
