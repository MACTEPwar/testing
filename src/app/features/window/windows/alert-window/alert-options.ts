import { IOptionsWindow } from '../../i-options-window';
import { EMessageType } from '../e-message-type';
export class AlertOptions implements IOptionsWindow {
    constructor(
        public message: string,
        public title: string = '',
        public mesageType: EMessageType = EMessageType.NONE,
        public width: number = 300
    ) {}
}
