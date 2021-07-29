import { IOptionsWindow } from '../i-options-window';
import { EMessageType } from '../e-message-type';
import { EToggleableWindowType } from '../../e-toggleable-window-type';
export class AlertOptions implements IOptionsWindow {
  constructor(
    public message: string,
    public title: string = '',
    public mesageType: EMessageType = EMessageType.NONE,
    public width: number = 300,
    public type: EToggleableWindowType = EToggleableWindowType.MODAL
  ) {}
}
