import { Observable, of } from 'rxjs';

export abstract class TableHttpService {
  getData(): Observable<any> {
    return of([
      {
        id: '1',
        code: '1',
        name: 'Bank 1',
        isDeleted: false,
      },
      {
        id: '2',
        code: '2',
        name: 'Банк 2',
        isDeleted: false,
      },
      {
        id: '3',
        code: '3',
        name: 'Банк 3',
        isDeleted: false,
      },
      {
        id: '4',
        code: '4',
        name: 'Банк 4',
        isDeleted: false,
      },
      {
        id: '5',
        code: '5',
        name: 'Банк 5',
        isDeleted: false,
      },
    ]);
  }

  getCount(): Observable<any> {
    return of([]);
  }
}
