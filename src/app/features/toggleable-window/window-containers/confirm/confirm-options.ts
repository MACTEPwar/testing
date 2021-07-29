import { IOptionsWindow } from '../i-options-window';
import { EMessageType } from '../e-message-type';
import { EButton } from './e-button';
import { Button } from './button';
import { EToggleableWindowType } from '../../e-toggleable-window-type';

export class ConfirmOptions implements IOptionsWindow {
  constructor(
    public message: string,
    public mesageType: EMessageType = EMessageType.NONE,
    public title: string = '',
    public buttons: Button[] = [
      new Button(EButton.OK, 'Buttons.Ok', 'pi pi-check'),
      new Button(EButton.CANCEL),
    ],
    public width: number = 300,
    public type: EToggleableWindowType = EToggleableWindowType.MODAL
  ) {
    switch (mesageType) {
      case EMessageType.NONE:
        this.title = 'WindowTitle.none';
        break;
      case EMessageType.SUCCESS:
        this.title = 'WindowTitle.success';
        break;
      case EMessageType.INFO:
        this.title = 'WindowTitle.info';
        break;
      case EMessageType.WARN:
        this.title = 'WindowTitle.warn';
        break;
      case EMessageType.CRITICAL:
        this.title = 'WindowTitle.critical';
        break;
    }
  }
}
