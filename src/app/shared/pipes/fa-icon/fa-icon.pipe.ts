import {
    IconDefinition,
    findIconDefinition,
    IconPrefix,
    IconName,
    library,
} from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'faIcon',
    pure: false
})

export class FaIconPipe implements PipeTransform {

    transform(iconName: string, prefix: string): IconDefinition {
        library.add(fas, far, fal);
        if (prefix === null || prefix === undefined) {
            const tmpSplit = iconName.split(' ');
            if (tmpSplit.length === 1) {
                return this.toIconDefinition(iconName, 'fas');
            }
            if (tmpSplit.length === 2) {
                return this.toIconDefinition(tmpSplit[1], tmpSplit[0]);
            }
        } else if (iconName && prefix) {
            return this.toIconDefinition(iconName, prefix);
        } else {
            return null;
        }
    }

    toIconDefinition(iconName, prefix): IconDefinition {
        const tempFind = findIconDefinition({
            prefix: prefix as IconPrefix,
            iconName: iconName as IconName,
        });
        return tempFind ?? null;
    }

}
