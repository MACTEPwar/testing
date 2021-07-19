import { Pipe, PipeTransform } from '@angular/core';
import { ConfigurationService } from '../../../core/configuration/configuration.service';
import { Field } from '../../../core/models-loader/types/field';

@Pipe({
  name: 'filterField',
})
export class FilterFieldPipe implements PipeTransform {
  constructor(private configurationService: ConfigurationService) {}

  transform(col: any): Field {
    const property = this.configurationService.getValue('links')[col.typeName];
    return col.fields.find((e) => e.property === property);
  }
}
