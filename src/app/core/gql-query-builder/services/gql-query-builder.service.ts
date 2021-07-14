import { Injectable, Optional } from '@angular/core';
import { CloneObject } from '../../../shared/helpers/object-clone-function';
import { ModelLoaderService } from '../../models-loader/services/model-loader.service';
import {
    executeFunction,
    executeMutation,
    getCountQuery,
    getItemsQuery,
} from '../queries';
import { Filter } from '../../../types/filter';
import { Field } from './../../models-loader/types/field';
import { Model } from './../../models-loader/types/model';
import { GqlBuilderFunction } from './helpers/gql-builder-function';
import { GqlBuilderMutation } from './helpers/gql-builder-mutation';
import { GqlBuilderQueryGet } from './helpers/gql-bulder-filter';

@Injectable()
export class GqlQueryBuilderService {
    //TODO: убрать @Optional
    constructor(@Optional() public modelLoaderService: ModelLoaderService) {}

    /**
     * Формирует запрос на получение данных модели по настройкам
     * @param modelName Название модели
     * @param filter Фильтр для модели
     * @param toLevel Глубина прохода
     * @param currentLevel Текущая глубина
     */
    public queryGetItems(
        modelName: string,
        server: string = 'default',
        filter: Filter,
        selectedFields: string,
        toLevel: number = 2,
        currentLevel: number = 0
    ): string {
        const MODEL = this.buildModelSchema(
            modelName,
            toLevel,
            currentLevel,
            server
        );
        if (selectedFields && selectedFields !== '*') {
            const ARR_FIELDS = selectedFields
                .split(/[\s]*,[\s]*/)
                .map((m) => m.trim());
            MODEL.fields = MODEL.fields.filter((f) =>
                ARR_FIELDS.includes(f.property)
            );
        }
        const SIGNATURE_MODEL = this.parseModelToGqlSignature(MODEL.fields);
        const SIGNATURE_CONDITIONS = GqlBuilderQueryGet.parseConditions(filter);
        return getItemsQuery(
            MODEL.modelName,
            SIGNATURE_MODEL,
            SIGNATURE_CONDITIONS
        );
    }

    /**
     * Возвращает количество записей в таблице
     * @param modelName Название модели
     * @param filter Фильтр (не обязательно)
     */
    public queryGetCount(modelName: string, filter?: Filter): string {
        const SIGNATURE_CONDITIONS = GqlBuilderQueryGet.parseConditions(filter);
        return getCountQuery(modelName, SIGNATURE_CONDITIONS);
    }

    public test2(
        model: Model,
        toLevel: number = 2,
        currentLevel: number = 0
    ): Model {
        // if (currentLevel > 0) {
        //     model.fields = model.fields.filter(f => f.kind !== 'ARRAY');
        // }
        let newObj = CloneObject<Model>(model);
        newObj.fields.forEach((field) => {
            if (
                (field.kind === 'OBJECT' || field.kind === 'ARRAY') &&
                currentLevel < toLevel
            ) {
                // if (field.kind === 'ARRAY' && currentLevel < 2){return null;}
                // if ((field.kind === 'OBJECT' && currentLevel < toLevel) || (field.kind === 'ARRAY' && currentLevel < 1)) {
                console.log('FIELD --> ', field);
                let md = CloneObject<Model>(
                    this.modelLoaderService.getModel(
                        field.kind === 'OBJECT' ? field.typeName : field.ofModel
                    )
                );
                console.log('MODEL --> ', md);
                // if (currentLevel > 0) {
                //     field.fields = [...md.fields.filter(f => f.kind !== 'ARRAY')];
                // } else {
                //     field.fields = [...md.fields];
                // }

                // field.fields = [...md.fields];

                //    if (md.fields) {
                //     field.fields = [...md.fields];

                //    } else {
                //         field = null;
                //    }
                // const asd = CloneObject<Model>(this.test2(md, toLevel, currentLevel + 1));
                if (currentLevel > 0) {
                    md.fields = md.fields.filter((f) => f.kind !== 'ARRAY');
                }
                // md = CloneObject<Model>(this.test2(md, toLevel, currentLevel + 1));
                console.log('FIELD 2 --> ', md);
            } else {
            }
        });

        return CloneObject<Model>(newObj);
    }

    public test3(
        field: Field,
        server: string = 'default',
        toLevel: number = 2,
        currentLevel: number = 0
    ): Field {
        if (field.kind === 'OBJECT' || field.kind === 'ARRAY') {
            if (currentLevel < toLevel && !field.isHidden) {
                let fieldModel = CloneObject<Model>(
                    this.modelLoaderService.getModel(
                        field.kind === 'OBJECT'
                            ? field.typeName
                            : field.ofModel,
                        server
                    )
                );
                if (fieldModel) {
                    const fff = fieldModel.fields.map((fieldCur) =>
                        this.test3(fieldCur, server, toLevel, currentLevel + 1)
                    );
                    if (fff.every((e) => e === undefined)) {
                        return null;
                    }
                    field.fields = [
                        ...fff
                            .filter((das) => das !== null)
                            .filter((das) => das !== undefined),
                    ];
                    return field;
                } else {
                    return undefined;
                }
            } else {
                return undefined;
            }
        } else {
            // if (field.isHidden){
            //     alert(field.property)
            // }
            // console.log('TEST H --> ', `${field.isHidden}: ${field.property}`)
            return field;
        }
    }

    /**
     * Переводит модель в нужную объектную для gql, для дальнейших действий
     * @param modelName Название модели
     * @param toLevel Глубина хода (2 по умолчанию)
     * @param currentLevel Текущая глубина
     */
    public buildModelSchema(
        modelName: string,
        toLevel: number = 2,
        currentLevel: number = 0,
        server: string = 'default'
    ): Model {
        let MODEL4: Model = this.modelLoaderService.getModel(modelName, server);
        MODEL4.fields.map((field) =>
            this.test3(field, server, toLevel, currentLevel)
        );

        // TODO: вынести логику в таблицу
        MODEL4.fields = MODEL4.fields.filter((f) => !f.isHidden);

        return MODEL4;

        const MODEL3: Model = this.modelLoaderService.getModel(modelName);
        return this.test2(CloneObject<Model>(MODEL3), toLevel, currentLevel);

        // this.test2(Object.assign({}, MODEL3), toLevel, currentLevel);
        // return MODEL3;
    }

    public parseMutationToGqlSignature(
        functionsName: string,
        server: string = 'default',
        data: any = {},
        modelName: string,
        modelNameForParameters: string[] = null,
        selectedFields: string = '*',
        wrappers?: any[]
    ): string {
        const MODEL = this.buildModelSchema(modelName, 1, 0, server);
        if (modelNameForParameters === null) {
            modelNameForParameters = [modelName];
        }
        const MODELS_PARAMS = modelNameForParameters.map((m) =>
            this.buildModelSchema(m, 1, 0, server)
        );

        // const MD = CloneObject<Model>(MODEL);
        if (selectedFields && selectedFields !== '*') {
            const ARR_FIELDS = selectedFields
                .split(/[\s]*,[\s]*/)
                .map((m) => m.trim());
            MODEL.fields = MODEL.fields.filter((f) =>
                ARR_FIELDS.includes(f.property)
            );
        }
        const SIGNATURE_MODEL = this.parseModelToGqlSignature(MODEL.fields);
        const SIGNATURE_FUNCTION =
            GqlBuilderMutation.parseFunctionToGqlSignature(
                functionsName,
                // ! TODO: убрать toLowerCase
                modelName[0].toLocaleLowerCase() + modelName.slice(1),
                data,
                SIGNATURE_MODEL,
                MODELS_PARAMS
            );
        const SIGNATURE_WRAPPER = GqlBuilderMutation.parseWrapper(
            wrappers,
            SIGNATURE_FUNCTION
        );

        return executeMutation(SIGNATURE_WRAPPER);
    }

    public parseFunctionToGqlSignature(
        functionsName: string,
        server = 'default',
        data: any = {},
        modelName: string,
        selectedFields: string = '*',
        wrappers?: any[],
        dataFromString?: string[],
        toLevel: number = 2
    ): string {
        const MODEL = this.buildModelSchema(modelName, toLevel, 0, server);
        if (selectedFields && selectedFields !== '*') {
            const ARR_FIELDS = selectedFields
                .split(/[\s]*,[\s]*/)
                .map((m) => m.trim());
            MODEL.fields = MODEL.fields.filter((f) =>
                ARR_FIELDS.includes(f.property)
            );
        }
        // TODO: Убрать проверку, когда бэк доделает
        const SIGNATURE_MODEL =
            MODEL.modelName === 'Enum' ||
            functionsName === 'getByKeys' ||
            functionsName === 'firmByType' ||
            functionsName === 'exportNeeded' ||
            functionsName === 'exportToExcel'
                ? this.parseModelToGqlSignature(MODEL.fields)
                : `{ items  ${this.parseModelToGqlSignature(MODEL.fields)} }`;
        const SIGNATURE_FUNCTION =
            GqlBuilderFunction.parseFunctionToGqlSignature(
                functionsName,
                data,
                SIGNATURE_MODEL,
                dataFromString
            );
        const SIGNATURE_WRAPPER = GqlBuilderFunction.parseWrapper(
            wrappers,
            SIGNATURE_FUNCTION
        );

        return executeFunction(SIGNATURE_WRAPPER);
    }

    /**
     * Переводит поля объектной модели в строку
     * @param fields Поля
     */
    private parseModelToGqlSignature(fields: Array<Field>): string {
        let res = '{';
        fields.forEach((f) => {
            if (f.kind === 'OBJECT' || f.kind === 'ARRAY') {
                // TODO: когда доделаю вычитку хедеров до конца убрать условие
                if (f.fields) {
                    res += ` ${f.property}`;
                    res += this.parseModelToGqlSignature(f.fields);
                }
            } else {
                res += ` ${f.property}`;
            }
        });
        res += ' }';
        return res;
    }
}

export class SelectModel {}
