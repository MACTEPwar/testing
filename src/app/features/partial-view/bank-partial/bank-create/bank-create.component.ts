import { Component, OnInit, Injector } from '@angular/core';
import { CreateBaseDirective } from '../../../table-base/a-create-base.directive';
import { FormGenerator } from '../../../form-generator/form-generator.service';
import { UnsubscriberService } from '../../../../core/unsubscriber/unsubscriber.service';

@Component({
  selector: 'al-bank-create',
  templateUrl: './bank-create.component.html',
  providers: [FormGenerator, UnsubscriberService],
})
export class BankCreateComponent extends CreateBaseDirective implements OnInit {
  constructor(injector: Injector) {
    super('Bank', injector);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
