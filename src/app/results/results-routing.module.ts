import { RouterModule } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'results',
                component: ResultsComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})

export class ResultsRoutingModule {}
