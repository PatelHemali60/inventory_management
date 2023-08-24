import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputControlComponent } from './component/input-control/input-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoFocusDirective } from './directive/auto-focus.directive';

@NgModule({
  declarations: [InputControlComponent, AutoFocusDirective],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InputControlComponent, AutoFocusDirective],
})
export class SharedModule {}
