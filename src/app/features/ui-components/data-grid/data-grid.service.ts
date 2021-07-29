import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable()
export class DataGridService {
  public exportPdf(headers: any, data: any) {
    const doc: any = new jsPDF();
    doc.autoTable(
      headers.map((m) => m.property),
      data
        .map((m) => Object.entries(m))
        .map((m) => {
          return m.reduce((acc, curr) => {
            acc.push(curr[1]);
            return acc;
          }, []);
        })
    );
    doc.save('products.pdf');
  }

  public exportExcel(data) {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'products');
    });
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    let url = window.URL.createObjectURL(data);
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
