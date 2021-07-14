import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CloneObject } from '../../../shared/helpers/object-clone-function';
import { getAllModels } from '../../../core/gql-query-builder/queries/getAllModels';
import { forkJoin, Observable } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import { Field } from '../types/field';
import { Model } from '../types/model';
import { ConfigurationService } from '../../../core/configuration/configuration.service';
import { EventEmitter } from '@angular/core';

@Injectable()
export class ModelLoaderService {
    private models: Array<Model> = new Array<Model>();
    private modelsNeeded: Array<Model> = new Array<Model>();

    public onChangeHeaders: EventEmitter<any> = new EventEmitter<any>();

    // ! TODO: Убрать когда бэк доделает
    // private static loadModelsFake(): Observable<any> {
    //     return of(fakeModels);
    // }

    constructor(
        private http: HttpClient,
        protected configurationService: ConfigurationService
    ) {}

    public getModel(modelName: string, from: string = 'default'): Model | null {
        switch (from) {
            case 'default': {
                if (modelName === 'exportDocumentsToBackOffice') {
                    return new Model('exportDocumentsToBackOffice');
                    break;
                }
                if (modelName === 'infoForUser') {
                    return new Model('infoForUser');
                    break;
                }
                return CloneObject<Model>(
                    this.models.find((f) => f.modelName === modelName) ?? null
                );
                break;
            }
            case 'needed': {
                if (modelName === 'neededQueries') {
                    return new Model('neededQueries');
                    break;
                }
                return CloneObject<Model>(
                    this.modelsNeeded.find((f) => f.modelName === modelName) ??
                        null
                );
                break;
            }
            default: {
                return CloneObject<Model>(
                    this.models.find((f) => f.modelName === modelName) ?? null
                );
            }
        }
    }

    public loadModels(): Observable<any> {
        const query = getAllModels();

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };

        return forkJoin([
            this.loadDefaultModels(query, httpOptions),
            this.loadNeededModels(query, httpOptions),
        ]).pipe(
            tap((_) => {
                this.onChangeHeaders.emit(_);
            })
        );
    }

    private loadDefaultModels(
        query: string,
        httpOptions: any
    ): Observable<any> {
        return this.http
            .post<any[]>(
                `${this.configurationService.getValue('apiUrl')}/graphql`,
                JSON.stringify({ query }),
                httpOptions
            )
            .pipe(
                tap((models: any) => {
                    const s = [...models.data.headers, ...fakeModels];
                    s.find((f) => f.modelName === 'Product').fields = s
                        .find((f) => f.modelName === 'Product')
                        .fields.filter(
                            (f) =>
                                f.property !== 'imageLink' &&
                                f.property !== 'dateInsert' &&
                                f.property !== 'dateUpdate' &&
                                f.property !== 'registerDate' &&
                                f.property !== 'registerDateEnd' &&
                                f.property !== 'taxRate'
                        );

                    this.models = s;
                }),
                mapTo(undefined)
            );
    }

    private loadNeededModels(query: string, httpOptions: any): Observable<any> {
        return this.http
            .post<any[]>(
                `${this.configurationService.getValue(
                    'apiNeededUrl'
                )}/needed/graphql`,
                JSON.stringify({ query }),
                httpOptions
            )
            .pipe(
                tap((models: any) => {
                    this.modelsNeeded = [...models.data.headers, ...fakeModels];
                }),
                mapTo(undefined)
            );
    }
}

export const fakeModels: Array<Model> = new Array<Model>(
    new Model('Locale', [
        new Field('language', 'StringType', 'SCALAR'),
        new Field('name', 'StringType', 'SCALAR'),
    ]),
    new Model('Settings', [new Field('defaulrFirmId', 'StringType', 'SCALAR')]),
    new Model('Enum', [
        new Field('key', 'StringType', 'SCALAR'),
        new Field('label', 'StringType', 'SCALAR'),
        new Field('value', 'IntType', 'SCALAR'),
    ]),
    new Model('exportMutations')
);
