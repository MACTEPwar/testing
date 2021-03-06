import { Pipe, PipeTransform } from '@angular/core';
import { ConfigurationService } from '../../../core/configuration/configuration.service';
import { Field } from '../../../core/models-loader/types/field';

@Pipe({
  name: 'filterField',
  pure: true
})
export class FilterFieldPipe implements PipeTransform {
  constructor(private configurationService: ConfigurationService) {}

  transform(col: any): Field {
    // console.log('col1', col);
    const property = this.configurationService.getValue('links')[col.typeName];
    // console.log('col2', property);
    return col.fields.find((e) => e.property === property);
  }
}
