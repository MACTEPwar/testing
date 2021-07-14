import { Field } from './field';
export class Model {

    constructor(
        public modelName: string,
        public fields: Array<Field> = []
    ) { }
}
