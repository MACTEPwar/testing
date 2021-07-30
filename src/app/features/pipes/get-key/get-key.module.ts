import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetKeyPipe } from './get-key.pipe';

@NgModule({
    declarations: [GetKeyPipe],
    imports: [CommonModule],
    exports: [GetKeyPipe],
})
export class GetKeyModule {}
