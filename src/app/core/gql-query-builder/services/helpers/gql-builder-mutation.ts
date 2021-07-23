import { Model } from '../../../../core/models-loader/types/model';

export class GqlBuilderMutation {
  public static parseWrapper(wrappers: string[], func: string): string {
    if (wrappers && wrappers.length > 0) {
      const w = wrappers.splice(0, 1);
      return `${w} {${GqlBuilderMutation.parseWrapper(wrappers, func)}}`;
    } else {
      return func;
    }
  }

  public static parseFunctionToGqlSignature(
    functionName: string,
    params: any,
    modelWithSelectedFileds: string,
    models: Model[]
  ): string {
    return `${functionName} ${GqlBuilderMutation.parseFunctionParamsStrategy(
      params,
      models
    )}
            ${
              modelWithSelectedFileds === '{ }'
                ? ''
                : modelWithSelectedFileds
            }
        `;
  }

  private static parseFunctionParamsStrategy(params, models): string {
    if (params === null || params === undefined || params.length === 0) {
      return '';
    } else {
      return `(${GqlBuilderMutation.parseFunctionParamsToGqlSignature(
        params,
        models
      )})`;
    }
  }

  public static parseFunctionParamsToGqlSignature(
    params: any,
    models: Model[]
  ): string {
    let res = Object.keys(params)
      .map((m) => `${m}: ${GqlBuilderMutation.cleanIt(params[m])}`)
      .join(',');

    models
      .map((model) => {
        return model.fields
          .filter((f) => f.kind === 'ENUM')
          .map((m) => m.property);
      })
      .reduce((acc, curr) => {
        acc.push(...curr);
        return acc;
      }, [])
      .forEach((en) => {
        res = res.replace(
          new RegExp(`${en}:\\s"[A-Za-zА-Яа-яё0-9_]*"`, 'g'),
          (match) => {
            return match.replace(/"[A-Za-zА-Яа-яё0-9_]*"/, (m) =>
              m.slice(1, m.length - 1)
            );
          }
        );
      });

    return res;
  }

  public static cleanIt(obj): any {
    const cleaned = JSON.stringify(obj, null, 2);

    return cleaned.replace(/^[\t ]*"[^:\n\r]+(?<!\\)":/gm, (match) => {
      return match.replace(/"/g, '');
    });
  }
}
