import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TestsComponent } from './components/tests/tests.component';
import { SharedModule } from '@app/common/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: TestsComponent,
    children: [],
  },
];

@NgModule({
  declarations: [
    TestsComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class TestsModule { }
