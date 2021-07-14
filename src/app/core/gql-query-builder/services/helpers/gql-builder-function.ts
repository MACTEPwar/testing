export class GqlBuilderFunction {
    public static parseWrapper(wrappers: string[], func: string): string {
        if (wrappers && wrappers.length > 0) {
            const w = wrappers.splice(0, 1);
            return `${w} {${GqlBuilderFunction.parseWrapper(wrappers, func)}}`;
        } else {
            return func;
        }
    }

    public static parseFunctionToGqlSignature(
        functionName: string,
        params: any,
        modelWithSelectedFileds: string,
        dataFromString: string[]
    ): string {
        return `
        ${functionName} (${GqlBuilderFunction.parseFunctionParamsToGqlSignature(
            params
        )} ${GqlBuilderFunction.addDataFromString(dataFromString)})
        ${modelWithSelectedFileds}
    `;
    }

    public static parseFunctionParamsToGqlSignature(params: any): string {
        return Object.keys(params)
            .map((m) => `${m}: ${JSON.stringify(params[m])}`)
            .join(',');
    }

    public static addDataFromString(dataFromString: string[]): string {
        return dataFromString && dataFromString.length
            ? `,${dataFromString.join(',')}`
            : '';
    }
}
