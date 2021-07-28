import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class TableFilterService {
    clearFilter$: EventEmitter<void> = new EventEmitter<void>();
}
