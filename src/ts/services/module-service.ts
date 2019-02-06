import store, { injectAsyncReducer } from '../redux/store';
import { ComponentClass, Reducer } from 'react';
import { ExtModuleService } from './external-module-service';

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

class $ModuleService {

    _modules: {} = {};

    _modulesList = [];

    get modulesList() { return this._modulesList };

    get modules() { return this._modules };

    loadModules(modules: IModules) {
        const _modules = {};

        for (let key in modules) {
            const _module = modules[key];
            _modules[key] = {
                id: _module.manifest.id,
                name: _module.manifest.name,
                intenal: true,
                component: _module.main
            };
            this._modulesList.push(_module.manifest);
            injectAsyncReducer(_module.manifest.name, _module.reducer);
            _module.StoreService.setStore(store);
            _module.StoreService.setService(ExtModuleService.injectPortalService);
        }

        this._modules = _modules;
    }

    async getModuleElementInternal(name) {
        return this._modules[name].component;
    }
}

export const ModuleService = new $ModuleService();