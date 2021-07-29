import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalContainer } from './modal-container';
import { ModalContext } from './modal-context';

@Component({
  selector: 'modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.css'],
})
export class ModalContainerComponent implements ModalContainer {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;
  context: ModalContext<any>;
}
