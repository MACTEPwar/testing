import { ToolbarService } from './toolbar.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { SplitterComponent } from './components/splitter/splitter.component';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [SplitterComponent, ButtonComponent, ToolbarComponent],
  exports: [ToolbarComponent],
  providers: [ToolbarService],
})
export class ToolbarModule {}
