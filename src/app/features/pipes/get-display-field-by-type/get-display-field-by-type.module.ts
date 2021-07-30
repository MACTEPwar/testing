import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetDisplayFieldByTypePipe } from './get-display-field-by-type.pipe';

@NgModule({
    declarations: [GetDisplayFieldByTypePipe],
    imports: [CommonModule],
    exports: [GetDisplayFieldByTypePipe],
})
export class GetDisplayFieldByTypeModule {}
