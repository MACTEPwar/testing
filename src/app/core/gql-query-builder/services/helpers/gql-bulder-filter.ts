import {
  EFilterType,
  Filter,
  IFilterItem,
  IFilterSplitter,
  IPaging,
  ISortItem,
} from '../../../../types/filter';
export class GqlBuilderQueryGet {
  /**
   * Парсит условия для перевода их для gql в строку
   * @param filter Фильтр
   */
  public static parseConditions(
    filter: Filter,
    withBrackets: boolean = true
  ): string {
    if (
      this.hasFilter(filter) ||
      this.hasPaging(filter) ||
      this.hasSort(filter)
    ) {
      const TEMP_ARR = [];
      if (this.hasFilter(filter)) {
        TEMP_ARR.push(
          `where:${this.parseFilterToGqlSignature(filter.splitter)}`
        );
      }
      if (this.hasPaging(filter)) {
        TEMP_ARR.push(...this.parsePagingToGqlSignature(filter.paging));
      }
      if (this.hasSort(filter)) {
        TEMP_ARR.push(`order:${this.parseSortToGqlSignature(filter.sort)}`);
      }
      return withBrackets ? `( ${TEMP_ARR.join(', ')} )` : TEMP_ARR.join(', ');
    } else {
      return '';
    }
  }

  /**
   * Проверяет есть ли фильтр
   * @param filter Фильтр
   */
  private static hasFilter(filter: Filter): boolean {
    return filter?.splitter?.filters.length > 0;
  }

  /**
   * Проверяет есть ли пэйджинг
   * @param filter Фильтр
   */
  private static hasPaging(filter: Filter): boolean {
    return !!filter?.paging;
  }

  /**
   *
   * @param filter
   */
  private static hasSort(filter: Filter): boolean {
    return filter?.sort?.length > 0;
  }

  /**
   * парсит фильтр в gql
   * @param splitter Соеденитель
   */
  private static parseFilterToGqlSignature(splitter: IFilterSplitter): string {
    const conditions = splitter.filters
      .map((f) => {
        return f.splitter
          ? this.parseFilterToGqlSignature(f.splitter)
          : this.valueFormatter(f);
      })
      .join(' ');
    return `{${splitter.type}:[${conditions}]}`;
  }

  /**
   * Переводит пэйджинг в gql
   * @param paging Пэйджинг
   */
  private static parsePagingToGqlSignature(paging: IPaging): Array<string> {
    return [`skip: ${paging.skip}`, `take: ${paging.take}`];
  }

  /**
   * Переводит сортировку в gql
   * @param sort Сортировка
   */
  private static parseSortToGqlSignature(sort: Array<ISortItem>): string {
    return `{ ${sort
      .map((m) => {
        return `${m.field}: ${m.sortType}`;
      })
      .join(' ')} }`;
  }

  /**
   * В зависсимости от типа фильтра форматирует выходное значение
   * @param filterItem Элемент фильтра
   */
  private static valueFormatter(filterItem: IFilterItem): string {
    switch (filterItem.type) {
      case EFilterType.STRING: {
        return `{${filterItem.property}: { ${filterItem.matchMode}: \"${filterItem.value}\" } }`;
      }
      case EFilterType.BOOLEAN: {
        return `{${filterItem.property}: { ${filterItem.matchMode}: ${filterItem.value} } }`;
      }
      case EFilterType.INTEGER: {
        return `{${filterItem.property}: { ${filterItem.matchMode}: ${filterItem.value} } }`;
      }
      case EFilterType.OBJECT: {
        if (filterItem.value === 'true' || filterItem.value === 'false') {
          return `{ ${filterItem.parentObjectName}: {${filterItem.property}: { ${filterItem.matchMode}: ${filterItem.value} } } }`;
        }
        return `{ ${filterItem.parentObjectName}: {${filterItem.property}: { ${filterItem.matchMode}: \"${filterItem.value}\" } } }`;
      }
      case EFilterType.DATE: {
        let b = Object.assign({}, filterItem);
        b.value = filterItem?.value
          ? { fromDate: filterItem.value }
          : { fromDate: null };

        return GqlBuilderQueryGet.getRequestFromOneDate(b);
      }
      case EFilterType.DATE_RANGE: {
        return GqlBuilderQueryGet.getRequestFromOneDate(filterItem);
      }
      default: {
        return `{${filterItem.property}: { ${filterItem.matchMode}: \"${filterItem.value}\" } }`;
      }
    }
  }

  private static getRequestFromOneDate(filterItem: IFilterItem): string {
    return GqlBuilderQueryGet.getStringRequestFromDate(
      filterItem.property,
      filterItem.value?.fromDate,
      filterItem.value?.toDate || filterItem.value?.fromDate
    );
  }

  private static getStringRequestFromDate(
    property: string,
    gte: Date,
    lte: Date
  ): string {
    let _lte = new Date(lte);
    _lte.setHours(23, 59, 59, 999);

    const shortGte = GqlBuilderQueryGet.toISOStringIgnoreTimeZone(gte);
    const shortLte = GqlBuilderQueryGet.toISOStringIgnoreTimeZone(_lte);

    return `
            {${property}: { gte: \"${shortGte}\" } },
            {${property}: { lte: \"${shortLte}\" } }
        `;
  }

  private static toISOStringIgnoreTimeZone(date: Date) {
    var pad = function (num) {
      var norm = Math.floor(Math.abs(num));
      return (norm < 10 ? '0' : '') + norm;
    };
    return (
      date.getFullYear() +
      '-' +
      pad(date.getMonth() + 1) +
      '-' +
      pad(date.getDate()) +
      'T' +
      pad(date.getHours()) +
      ':' +
      pad(date.getMinutes()) +
      ':' +
      pad(date.getSeconds()) +
      '.' +
      pad(date.getMilliseconds()) +
      'Z'
    );
  }
}
