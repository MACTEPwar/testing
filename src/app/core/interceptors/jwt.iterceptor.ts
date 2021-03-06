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
          'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6InRlc3QiLCJhZGRyZXNzIjoiOjoxIiwibmJmIjoxNjI5ODc4MjIzLCJleHAiOjE2Mjk5NjQ2MjMsImlzcyI6IkFsdGl1c1NlcnZlciIsImF1ZCI6IkFsdGl1c0NsaWVudCJ9.Pwl99RJaVDhkuIQMkumYP7gKqaaekXU3kjRyZiiXzfw"
        },
      });
    return next.handle(request);
  }
}
