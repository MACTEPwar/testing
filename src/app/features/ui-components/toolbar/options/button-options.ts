import { BaseOptions } from './base-options';
export class ButtonOptions extends BaseOptions {
  name: string = null;
  title: string = null;

  clickHandler: () => void = () => {};

  constructor(
    id: string,
    name?: string,
    clickHandler?: () => void,
    title?: string
  ) {
    super(id);
    this.name = name;
    this.clickHandler = clickHandler;
    this.title = title;
  }

  setName(name: string): this {
    this.name = name;
    return this;
  }

  setHandler(handler: () => void): this {
    this.clickHandler = handler;
    return this;
  }

  setTitle(title: string): this {
    this.title = title;
    return this;
  }
}
