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
          'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6InRlc3QiLCJhZGRyZXNzIjoiOjoxIiwibmJmIjoxNjI4NDk4NTI2LCJleHAiOjE2Mjg1ODQ5MjYsImlzcyI6IkFsdGl1c1NlcnZlciIsImF1ZCI6IkFsdGl1c0NsaWVudCJ9.rFd5O6Se1ztG3647LjEob2B4KLYRSfDbLlKrzhXSvqo"
        },
      });
    return next.handle(request);
  }
}
