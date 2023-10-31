import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../components/menu/menu.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MenuComponent
  ],
  exports: [
    MenuComponent,
    FormsModule
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
})
export class SharedModule {
}
