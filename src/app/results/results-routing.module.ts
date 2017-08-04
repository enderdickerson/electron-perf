import {RouterModule} from '@angular/router';
import {ResultsComponent} from './results/results.component';
import {NgModule} from '@angular/core';
import {ResultViewComponent} from './results/resultview/resultview.component';
import {ResultHomeComponent} from './results/resulthome/resulthome.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'results',
        component: ResultsComponent,
        children: [
          {
            path: ':id',
            component: ResultViewComponent
          },
          {
            path: '',
            component: ResultHomeComponent
          }
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})

export class ResultsRoutingModule {}
