import { EButton } from './e-button';

export class Button {
    constructor(public type: EButton, public name?: string, public icon?: string) {
        if (!name) {
            switch (type) {
                case EButton.OK:
                    this.name = 'Buttons.Ok';
                    break;
                case EButton.CANCEL:
                    this.name = 'Buttons.Cancel';
                    break;
                case EButton.ABORT:
                    this.name = 'Buttons.Abort';
                    break;
                case EButton.RETRY:
                    this.name = 'Buttons.Retry';
                    break;
                case EButton.IGNORE:
                    this.name = 'Buttons.Ignore';
                    break;
                case EButton.YES:
                    this.name = 'Buttons.Yes';
                    break;
                case EButton.NO:
                    this.name = 'Buttons.No';
                    break;
            }
        }
    }
}
