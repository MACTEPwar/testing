import { FaIconPipe } from './pipes/fa-icon/fa-icon.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FaIconPipe],
  imports: [CommonModule],
  exports: [FaIconPipe],
})
export class SharedModule {}
