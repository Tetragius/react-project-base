import store, { injectAsyncReducer } from '../redux/store';
import { ComponentClass } from 'react';

export interface IModule{
    name: string;
    component: ComponentClass;
}

export default class ModuleService{

    private static _modules: IModule[] = <IModule[]>[];

    public static get modules() { return ModuleService._modules };

    public static loadModules(modules){
        const modulesComponents = [];

        for (let key in modules) {
            const _module = modules[key];
            modulesComponents.push({ name: key, component: _module.Main });
            injectAsyncReducer(key, _module.reducer);
            _module.StoreService.setStore(store);
        } 

        ModuleService._modules = modulesComponents;
    }
}