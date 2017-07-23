import { RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'test',
                component: TestComponent
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})

export class TestRoutingModule {}
