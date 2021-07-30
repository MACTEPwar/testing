import { Pipe, PipeTransform } from '@angular/core';
import { ConfigurationService } from '../../../core/configuration/configuration.service';

@Pipe({
    name: 'getDisplayFieldByType',
})
export class GetDisplayFieldByTypePipe implements PipeTransform {
    constructor(private configurationService: ConfigurationService) {}
    transform(typeName: string): string {
        return this.configurationService.getValue('links')[typeName];
    }
}
