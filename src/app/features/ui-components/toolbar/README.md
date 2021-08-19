# Importing 

```typescript
import { ToolbarModule } from 'ui-components/toolbar'
```

# Usage

```html
<app-toolbar [items]="items"></app-toolbar>
```

```typescript
 this.items = [
      new ToolbarButtonItem('create', 'Toolbar.create', null, () => {
        this.modalService.open(this.createComponent, {
          service: this.tableService,
        });
      }),
      new ToolbarButtonItem('edit', 'Toolbar.edit', null, this.showEditView),
      new ToolbarButtonItem(
        'delete',
        'Toolbar.delete',
        null,
        this.showDeleteView
      ),
      new ToolbarButtonItem('filter', 'Toolbar.filter', null, onFilterClick),
    ];
```

# Type items and options

|Class              |Options            |Defaul value   |Status         |Descriptions   |
|:---               |:---               |:---           |:---:          |:---           |
|`ToolbarButtonItem`|`id: string`       |`undefined`    |`requred`      |uniq identifier|
|                   |`title`: `string`  |`undefined`    |`non requred`  |name for button|


 id: string,
        title?: string,
        icon?: string,
        call: Function = () => {},
        disabled: boolean = false,
        typeIcon: 'path' | 'prime' | 'fontawesome' = 'fontawesome',
        isVisible = false,
        classes?: string[],
        styles?: {}





