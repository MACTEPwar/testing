import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleByControlNamePipe } from './title-by-control-name.pipe';

@NgModule({
    declarations: [TitleByControlNamePipe],
    imports: [CommonModule],
    exports: [TitleByControlNamePipe],
})
export class TitleByControlNameModule {}
