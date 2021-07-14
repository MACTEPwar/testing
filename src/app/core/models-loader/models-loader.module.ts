import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelLoaderService } from './services/model-loader.service';

// export function initModule(modelLoaderService: ModelLoaderService): () => Promise<any> {
//     return () => modelLoaderService.loadModels().toPromise();
// }

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    // providers: [
    //     ModelLoaderService,
    //     {
    //         provide: APP_INITIALIZER,
    //         useFactory: initModule,
    //         multi: true,
    //         deps: [ModelLoaderService],
    //     },
    // ]
})
export class ModelsLoaderModule {
    constructor() { }
}
