import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
    MissingTranslationHandler,
    MissingTranslationHandlerParams, TranslateLoader, TranslateModule
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export class MissingTranslationService implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams): string {
        return `WARN: '${params.key}' is missing in '${params.translateService.currentLang}' locale`;
    }
}

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
            missingTranslationHandler: {
                provide: MissingTranslationHandler,
                useClass: MissingTranslationService,
            },
            useDefaultLang: false,
        }),
    ],
})
export class LocalizationModule {
    // constructor(private translateService: TranslateService) {}
}

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
    return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

export const appLocalizationModuleChild = TranslateModule.forChild({
    loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
    },
    missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: MissingTranslationService,
    },
    useDefaultLang: false,
});
