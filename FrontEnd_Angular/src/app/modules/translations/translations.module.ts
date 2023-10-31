import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TranslationsComponent } from './components/translations/translations.component';
import { TranslationFormComponent } from './components/translation-form/translation-form.component';
import { SharedModule } from '@app/common/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: TranslationsComponent,
    children: [
      { 
        path: '/form',
        component: TranslationFormComponent },
    ],
  },
];

@NgModule({
  declarations: [
    TranslationsComponent,
    TranslationFormComponent
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

export class TranslationsModule {
}
