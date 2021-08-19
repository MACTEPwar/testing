import { TranslateService } from '@ngx-translate/core';
import {
    HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(@Optional() protected translateService: TranslateService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
        setHeaders: {
          'Accept-Language': this.translateService?.currentLang ?? 'uk',
          'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6InRlc3QiLCJhZGRyZXNzIjoiOjpmZmZmOjEyNy4wLjAuMSIsIm5iZiI6MTYyOTM1NTY2NSwiZXhwIjoxNjI5NDQyMDY1LCJpc3MiOiJBbHRpdXNTZXJ2ZXIiLCJhdWQiOiJBbHRpdXNDbGllbnQifQ.sOSO71lAFLpHLT8y7ES0vsN7cwVhgUC6Lh923NCFmD8"
        },
      });
    return next.handle(request);
  }
}
