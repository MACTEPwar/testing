import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GqlQueryBuilderService } from './services/gql-query-builder.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [],
    imports: [CommonModule, HttpClientModule],
    providers: [GqlQueryBuilderService],
})
export class GqlQueryBuilderModule {}
