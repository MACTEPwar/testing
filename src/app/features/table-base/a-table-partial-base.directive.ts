import {
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  inject,
  InjectionToken,
  Injector,
  QueryList,
  StaticProvider,
  Type,
  ɵsetCurrentInjector as setCurrentInjector
} from '@angular/core';
import { AlTemplateDirective } from '../../shared/directives/al-tempalte/al-template.directive';
import { SpecialField } from '../../types/special-field';
import { ModalService } from '../modal/modal.service';
import { WindowService } from '../window/window.service';
import { ButtonOptions } from './../ui-components/toolbar/options/button-options';
import { ToolbarService } from './../ui-components/toolbar/toolbar.service';
import { TableHttpService } from './a-table-http.service';
import { TableServiceCreator } from './table-service-creator';
import { TableService } from './table.service';

export const MODEL_NAME = new InjectionToken('ModelName');

export const TABLE_HTTP_SERVICE_TYPE = new InjectionToken('TableHttpService');

export const TABLE_SERVICE_TYPE = new InjectionToken('TableService');

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
  protected tableService: TableService;
  protected changeDetectorRef: ChangeDetectorRef;

  @ContentChildren(AlTemplateDirective)
  templates: QueryList<AlTemplateDirective>;

  constructor(protected injector: Injector) {
    this.syncServicesInDI(injector);

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
    const tableHttpService: any = this.injector.get<TableHttpService>(
      TABLE_HTTP_SERVICE_TYPE,
      null
    );
    const tableService: any =
      this.injector.get<TableService>(TABLE_SERVICE_TYPE);

    const newInjector = Injector.create({
      providers: [
        ...providers,
        new TableServiceCreator<TableHttpService, TableService>(
          tableHttpService,
          tableService,
          modelName,
          Injector
        ).getNewTableHttpServiceInjector(),
        // {
        //   provide: TOOLBAR_SERVICE_IT,
        //   useFactory: () => new ToolbarService()
        // },
        // {
        //   provide: 'test',
        //   useValue: 'test'
        // }
      ],
      parent: injector,
    });

    let former = setCurrentInjector(newInjector);

    this.windowService = inject(WindowService);
    this.modalService = inject(ModalService);
    this.changeDetectorRef = inject(ChangeDetectorRef);
    this.toolbarService = inject(ToolbarService);
    this.tableService = inject(tableService);

    setCurrentInjector(former);
  }

  ngOnInit(): void {
    // this.changeDetectorRef.detectChanges();
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
