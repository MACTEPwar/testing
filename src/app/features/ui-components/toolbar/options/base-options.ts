export abstract class BaseOptions {
  readonly id: string;
  isVisible = true;
  classes: string[];

  constructor(id: string) {
    this.id = id;
  }

  addClass(className: string): this {
    this.classes.push(className);
    return this;
  }

  removeClass(className: string): this {
    this.classes = this.classes.filter((f) => f !== className);
    return this;
  }
  setVisibility(value: boolean): this {
    this.isVisible = value;
    return this;
  }
}
