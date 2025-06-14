import { ModuleWithProviders, NgModule } from '@angular/core';
import { FuseConfigService } from './config.service';
import { FUSE_CONFIG } from './config.constants';

@NgModule()
export class FuseConfigModule
{
    /**
     * Constructor
     */
    constructor(private _fuseConfigService: FuseConfigService)
    {
    }

    /**
     * forRoot method for setting user configuration
     *
     * @param config
     */
    static forRoot(config: any): ModuleWithProviders<FuseConfigModule>
    {
        return {
            ngModule : FuseConfigModule,
            providers: [
                {
                    provide : FUSE_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
