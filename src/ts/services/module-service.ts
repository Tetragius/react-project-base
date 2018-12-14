import store, { injectAsyncReducer } from '../redux/store';
import { ComponentClass, Reducer } from 'react';

export interface IModuleManifest {
    id: string;
    name: string;
}

export interface IModules {
    [key: string]: {
        reducer: Reducer<any, any>;
        manifest: IModuleManifest;
        main: ComponentClass;
        StoreService: any;
    }
}

export interface IModule {
    manifest: IModuleManifest;
    component: ComponentClass;
}

export default class ModuleService {

    private static _modules: IModule[] = <IModule[]>[];

    public static get modules() { return ModuleService._modules };

    public static loadModules(modules: IModules) {
        const modulesComponents = <IModule[]>[];

        for (let key in modules) {
            const _module = modules[key];
            modulesComponents.push({ manifest: _module.manifest, component: _module.main });
            injectAsyncReducer(_module.manifest.name, _module.reducer);
            _module.StoreService.setStore(store);
        }

        ModuleService._modules = modulesComponents;
    }
}