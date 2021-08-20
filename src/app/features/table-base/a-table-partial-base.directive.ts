import { ButtonOptions } from './../ui-components/toolbar/options/button-options';
import {
  ToolbarService,
  TOOLBAR_SERVICE_IT,
} from './../ui-components/toolbar/toolbar.service';
import {
  ContentChildren,
  Directive,
  inject,
  InjectionToken,
  Injector,
  QueryList,
  StaticProvider,
  Type,
  ɵsetCurrentInjector as setCurrentInjector,
} from '@angular/core';
import {
  EFilterType,
  ESortType,
  Filter,
  FilterAnd,
  FilterItem,
  ISortItem,
  Paging,
} from '../../types/filter';
import { ModalService } from '../modal/modal.service';
import { WindowService } from '../window/window.service';
import { TableService } from './table.service';
import { SpecialField } from '../../types/special-field';
import { AlTemplateDirective } from '../../shared/directives/al-tempalte/al-template.directive';
import { SplitterOptions } from '../ui-components/toolbar/options/splitter-options';
import { InjectFlags } from '@angular/compiler/src/core';
import { TableHttpService, TableHttpServiceCreator } from './a-table-http.service';

export const MODEL_NAME = new InjectionToken('ModelName');

export const HTTP_SERVICE = new InjectionToken('HttpService');

@Directive()
export abstract class TablePartialBaseDirective {
  headers;
  data;
  count;
  isLoading;
  // filters: { codeM: FilterMetadata } = {
  //   codeM: { matchMode: 'contains', value: '1' },
  // };
  filters = {};
  constants;
  clientSettings;
  filterIsShowed;

  specialFields: SpecialField[] = [];

  createComponent: Type<any> = null;
  updateComponent: Type<any> = null;
  deleteComponent: Type<any> = null;

  protected windowService: WindowService;
  protected modalService: ModalService;
  protected toolbarService: ToolbarService;

  @ContentChildren(AlTemplateDirective)
  templates: QueryList<AlTemplateDirective>;

  constructor(
    protected tableService: TableService,
    protected injector: Injector
  ) {
    // ToolbarService
    this.syncServicesInDI(injector);

    // const i = Injector.create({
    //   providers: [
    //     { provide: TOOLBAR_SERVICE_IT, useFactory: () => new ToolbarService() },
    //   ],
    //   parent: this.injector,
    // });

    // let former = setCurrentInjector(injector);
    // this.windowService = inject(WindowService);
    // this.modalService = inject(ModalService);
    // this.toolbarService = inject(ToolbarService);
    // setCurrentInjector(former);

    // former = setCurrentInjector(i);

    // this.toolbarService = inject(TOOLBAR_SERVICE_IT);

    // setCurrentInjector(former);

    // console.log('this.toolbarService', this.toolbarService);
    // console.log('this.windowService', this.windowService);
    // console.log('this.modalService', this.modalService);

    // console.log('this.modalService', this.modalService);

    this.headers = this.tableService.headers;
    this.data = this.tableService.data;
    this.count = this.tableService.count;
    this.constants = this.tableService.constants;
    this.isLoading = this.tableService.isLoading;
    this.clientSettings = this.tableService.clientSettings;

    this.tableService.getHeaders();

    this.setDefaultToolbar();
  }

  setServicesToDI(providers: StaticProvider[]): void {
    const newInjector = Injector.create({
      providers: providers,
      parent: this.injector,
    });

    this.injector = newInjector;
  }

  syncServicesInDI(injector: Injector, providers: StaticProvider[] = []): void {
    const modelName: string = this.injector.get<string>(MODEL_NAME, null);
    const httpService: any = this.injector.get<TableHttpService>(
      HTTP_SERVICE,
      null
    );

    const newInjector = Injector.create({
      providers: [
        ...providers,
        new TableHttpServiceCreator<TableHttpService>(
          httpService,
          modelName,
          Injector
        ).getNewTableHttpServiceInjector(),
      ],
      parent: injector,
    });
    // injector = newInjector;

    let former = setCurrentInjector(newInjector);

    this.windowService = inject(WindowService);
    this.modalService = inject(ModalService);
    this.toolbarService = inject(ToolbarService);

    setCurrentInjector(former);
  }

  ngAfterContentInit(): void {
    this.templates.forEach((item) => {
      this.specialFields.push({
        property: item.getType(),
        template: item.template,
      });
    });
  }

  protected setDefaultToolbar() {
    this.toolbarService
      .addButton(
        new ButtonOptions('create').setName('Create').setHandler(() => {
          this.showCreateView();
        })
      )
      // .addSplitter(new SplitterOptions('splitter'))
      .addButton(
        new ButtonOptions('update').setName('Update').setHandler(() => {
          alert('Im is update btn');
        })
      );
  }

  getData(event) {
    this.tableService.getData(event);
  }

  onColToggleHandler(event): void {
    let oldSettings = this.clientSettings.getValue();
    this.tableService.saveClientSettings({
      id: oldSettings.id,
      data: oldSettings.data.map((m) => {
        if (event.find((f) => f.property === m.property)) {
          m.isShow = true;
        } else {
          m.isShow = false;
        }
        return m;
      }),
    });
  }

  onColResizeHandler(event): void {
    let oldSettings = this.clientSettings.getValue();
    oldSettings.data.find((f) => f.property === event.property).offsetWidth =
      event.offsetWidth;
    this.tableService.saveClientSettings({
      id: oldSettings.id,
      data: oldSettings.data,
    });
  }

  onColReorderHandler(event): void {
    let oldSettings = this.clientSettings.getValue();
    let newSettings = [];
    event.columns.forEach((column) => {
      newSettings.push(
        oldSettings.data.find((f) => f.property === column.property)
      );
    });
    this.tableService.saveClientSettings({
      id: oldSettings.id,
      data: newSettings.concat(
        oldSettings.data.filter((f) => f.isShow === false)
      ),
      // data: newSettings,
    });
  }

  protected showCreateView(): void {
    console.log(this);
    console.log(this.modalService);
    this.modalService.open(this.createComponent, {
      service: this.tableService,
    });
  }

  protected showEditView(): void {}

  protected showDeleteView(): void {}

  /**
   * Сетит сервисы с инжектора
   * @param injector Инжектор компонента
   */
  private getServicesFromDI(injector: Injector): void {
    const former = setCurrentInjector(injector);

    this.windowService = injector.get(WindowService, null);
    this.modalService = injector.get(ModalService, null);
    this.toolbarService = injector.get(ToolbarService, null);

    setCurrentInjector(former);
  }
}
