import { Type } from '@angular/core';
export class Tab {
  /** Отображаемое название */
  name?: string;
  /** Картика (FontAwesome) */
  image?: string;
  /** Ссылка, по которой будет переходить при нажатии на таб */
  id: string;
  /** Можно ли закрыть таб? */
  canClose?: boolean;
  /** Активный? */
  active?: boolean;
  /** Родительская ссылка для хлебных крошек */
  parentUrl?: string;
  component?: Type<any>;
  /**Передаются в компонент */
  options?: any[];
}
