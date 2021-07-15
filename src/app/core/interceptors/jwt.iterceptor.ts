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
    console.log('ts', this.translateService.currentLang);
    request = request.clone({
        setHeaders: {
          'Accept-Language': this.translateService?.currentLang ?? 'uk',
        },
      });
    return next.handle(request);
  }
}
