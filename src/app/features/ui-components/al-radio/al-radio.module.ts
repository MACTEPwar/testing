import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';

import { AlRadioComponent, AlRadioItemComponent } from './al-radio.component';

@NgModule({
    declarations: [AlRadioComponent, AlRadioItemComponent],
    imports: [CommonModule, SharedModule],
    exports: [AlRadioComponent],
})
export class AlRadioModule {}
