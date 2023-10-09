import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputControlComponent } from './component/input-control/input-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoFocusDirective } from './directive/auto-focus.directive';
import { PaginantionComponent } from './component/paginantion/paginantion.component';

@NgModule({
  declarations: [
    InputControlComponent,
    AutoFocusDirective,
    PaginantionComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InputControlComponent, AutoFocusDirective, PaginantionComponent],
})
export class SharedModule {}
