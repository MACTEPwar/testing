import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';

@Injectable()
export class ConfigurationService {
    private configuration = {};

    constructor(private httpClient: HttpClient) {
    }

    load(): Observable<void> {
        return this.httpClient.get('./assets/config.json')
            .pipe(
                tap((configuration: any) => this.configuration = configuration),
                mapTo(undefined),
            );
    }

    getValue(key: string, defaultValue?: any): any {
        return this.configuration[key] || defaultValue;
    }
}


