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
|                   |`icon`: `string`  |`undefined`    |`non requred`  |name for button|
|                   |`call`: `string`  |`undefined`    |`non requred`  |name for button|
|                   |`disabled`: `string`  |`undefined`    |`non requred`  |name for button|
|                   |`typeIcon`: `string`  |`undefined`    |`non requred`  |name for button|
|                   |`isVisible`: `string`  |`undefined`    |`non requred`  |name for button|
|                   |`classes`: `string`  |`undefined`    |`non requred`  |name for button|
|                   |`styles`: `string`  |`undefined`    |`non requred`  |name for button|

<table>
    <thead>
        <tr>
            <th>Class</th>
            <th>Options</th>
            <th>Defaul value</th>
            <th>Status</th>
            <th>Descriptions</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="9"><code>ToolbarButtonItem</code></td>
            <td><code>id</code>:<code><i>string</i></code></td>
            <td><code>undefined</code></td>
            <td><code>requred</code></td>
            <td>Уникальный идентификатор</td>
        </tr>
        <tr>
            <td><code>title</code>:<code><i>string</i></code></td>
            <td><code>undefined</code></td>
            <td><code>non requred</code></td>
            <td>Название кнопки</td>
        </tr>
        <tr>
            <td><code>icon</code>:<code><i>string</i></code></td>
            <td><code>undefined</code></td>
            <td><code>non requred</code></td>
            <td>Иконка</td>
        </tr>
        <tr>
            <td><code>call</code>:<code><i>Function</i></code></td>
            <td><code>() => {}</code></td>
            <td><code>non requred</code></td>
            <td>Хэндлер, вызываемый после нажатия на кнопку</td>
        </tr>
        <tr>
            <td><code>disabled</code>:<code><i>boolean</i></code></td>
            <td><code>false</code></td>
            <td><code>non requred</code></td>
            <td>Если <code>true</code>, то кнопка не активна</td>
        </tr>
        <tr>
            <td><code>typeIcon</code>:<code><i>'path'</i></code>|<code><i>'prime'</i></code>|<code><i>'fontawesome'</i></code></td>
            <td><code>'fontawesome'</code></td>
            <td><code>non requred</code></td>
            <td>Тип иконки</td>
        </tr>
        <tr>
            <td><code>isVisible</code>:<code><i>boolean</i></code></td>
            <td><code>'false'</code></td>
            <td><code>non requred</code></td>
            <td>Если <code>true</code>, то кнопка видна</td>
        </tr>
        <tr>
            <td><code>classes</code>:<code><i>string[]</i></code></td>
            <td><code><i>{empty array of string}</i></code></td>
            <td><code>non requred</code></td>
            <td>Классы для кнопки</td>
        </tr>
        <tr>
            <td><code>styles</code>:<code><i>object</i></code></td>
            <td><code><i>{empty object}</i></code></td>
            <td><code>non requred</code></td>
            <td>Стили для кнопки</td>
        </tr>
    </tbody>
</table>