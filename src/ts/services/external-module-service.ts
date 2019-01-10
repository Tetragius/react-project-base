import * as _ from 'lodash';
import * as React from "react";
import { ComponentClass } from "react";
import { injectAsyncReducer, store } from '../redux/store';
import MainService from './main-service';
import NotificationService from './notification-service';
import { history } from '../redux/store';
import { ModalService } from './modal-service';

export interface IRegistredPage {
    [key: string]: JSX.Element
}

export interface anyService {
    getPageElementByName(pageName: string): JSX.Element;
    registerPage(name: string, element: ComponentClass<any>): void;
    getPageElementAsync(page: any): Promise<JSX.Element>;
    registerPageAsync(page: any): Promise<boolean>;
}

class $ExtModuleService implements anyService {

    /**
     * Список зарегистрированных страниц.
     *
     * @type {IRegistredPage}
     * @memberof $ExtModuleService
     */
    static registredPage: IRegistredPage = {};
    constructor(registredPage?: IRegistredPage) {
        $ExtModuleService.registredPage = registredPage || {};
    }

    injectPortalService() {
        return {
            stream: MainService.mainStream,
            notification: NotificationService,
            store: store,
            history: history,
            modals: (props) => new ModalService(props)
        }
    }

    /**
     * Возвращает React-компонент для указанной страницы.
     *
     * @param {string} pageName
     * @returns {JSX.Element}
     *
     * @memberof $ExtModuleService
     */
    getPageElementByName(pageName: string): JSX.Element {
        return $ExtModuleService.registredPage[pageName];
    }

    async getPageElementAsync(page: any): Promise<JSX.Element> {
        if ($ExtModuleService.registredPage[page.name]) {
            return $ExtModuleService.registredPage[page.name];
        }
        else {
            var result = await this.registerPageAsync(page);
            if (result) {
                return $ExtModuleService.registredPage[page.name];
            }
            else {
                return null;
            }
        }
    }

    /**
     * Загружает список страниц
     *
     * @returns {anyWithDimensions[]}
     *
     * @memberof $ExtModuleService
     */
    preparePageStore(): any[] {
        var request = new XMLHttpRequest();
        request.open("GET", "pages/pages.json", false);
        request.send(null)
        var _pages = JSON.parse(request.responseText) as any[];

        _pages.forEach(element => { });

        return _pages;
    }


    /**
     * Регистрация новой страницы.
     *
     * @param {string} name
     * @param {JSX.Element} element
     *
     * @memberof ExtModuleService
     */
    registerPage(name: string, element: ComponentClass<any>) {
        var o = {};
        o[name] = React.createElement(element);
        _.assign($ExtModuleService.registredPage, o);
    }

    registerPageSync(page: any): boolean {
        if ($ExtModuleService.registredPage[page.name]) {
            return true;
        }

        var self = this;
        
        function reqListener(responseText) {
            try {

                let getPage = new Function('exports', 'module', responseText + " ;return module.exports;");

                //dependency injection start

                let injectPrepare = new Function('injector', 'page', `

                    var closure = (function(r){
                        var _require = r;
                        var _modules = {};
                        return {require: require, modules: _modules};
                    })(window.require);

                    window.require = function(o, u){
                        try{
                            return closure.require(o, u);
                        }
                        catch(e){
                            if(!closure.modules[o]){
                                console.log('inject : ' + o + ' by: ' + page.name);
                                closure.modules[o] = injector(o, page);
                                return closure.modules[o];
                            }
                            else{
                                return closure.modules[o];
                            }
                        }
                    }

                `);

                var fakeInjector = function (name, page: any) {
                    if (name === "portal-service") {
                        return self.injectPortalService();
                    }
                    else {
                        if (page.dependencies) {
                            for (var depName in page.dependencies) {
                                if (depName === name) {

                                    let dep = page.dependencies[depName];
                                    let oReq = new XMLHttpRequest();
                                    dep.path && oReq.open("GET", `${dep.path}/${dep.fileName}`, false);
                                    !dep.path && oReq.open("GET", `pages/${page.name}/dependencies/${depName}/${dep.fileName}`, false);
                                    oReq.send();

                                    if (oReq.status === 200) {
                                        return eval(oReq.responseText);
                                    }
                                    else {
                                        return false;
                                    }

                                }
                            }
                        }
                    }
                }

                injectPrepare(fakeInjector, page);

                //dependency injection end

                let _page = getPage({}, { exports: null });

                let o = {};
                o[page.name] = React.createElement(_page.Main);

                if (_page.reducer) {
                    injectAsyncReducer(page.name, _page.reducer);
                }

                _.assign($ExtModuleService.registredPage, o);
                return true;
            }
            catch (e) {
                console.log(e);
                return false;
            }
        }

        let fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", `pages/${page.name}/main.css?ver=${page.version}`);
        document.getElementsByTagName("head")[0].appendChild(fileref);

        if (page.externalLib) {
            let lib = document.createElement("script")
            lib.setAttribute("type", "text/javascript")
            lib.setAttribute("src", `pages/${page.name}/${page.externalLib}?ver=${page.version}`);
            document.getElementsByTagName("head")[0].appendChild(lib);
        }

        let oReq = new XMLHttpRequest();
        oReq.open("GET", `pages/${page.name}/index.min.js?ver=${page.version}`, false);
        oReq.send();

        if (oReq.status === 200) {
            return reqListener(oReq.responseText)
        }
        else {
            return false;
        }
    }

    registerPageAsync(page: any): Promise<boolean> {

        var self = this;

        let p = new Promise<boolean>(resolve => {
            function reqListener(responseText) {
                try {

                    let getPage = new Function('exports', 'module', responseText + " ;return module.exports;");

                    //dependency injection start

                    let injectPrepare = new Function('injector', 'page', `

                        var closure = (function(r){
                            var _require = r;
                            var _modules = {};
                            return {require: require, modules: _modules};
                        })(window.require);

                        window.require = function(o, u){
                            try{
                                return closure.require(o, u);
                            }
                            catch(e){
                                if(!closure.modules[o]){
                                    console.log('inject : ' + o + ' by: ' + page.name);
                                    closure.modules[o] = injector(o, page);
                                    return closure.modules[o];
                                }
                                else{
                                    return closure.modules[o];
                                }
                            }
                        }

                    `);

                    var fakeInjector = function (name, page: any) {
                        if (name === "portal-service") {
                            return self.injectPortalService();
                        }
                        else {
                            if (page.dependencies) {
                                for (var depName in page.dependencies) {
                                    if (depName === name) {

                                        let dep = page.dependencies[depName];
                                        let oReq = new XMLHttpRequest();
                                        dep.path && oReq.open("GET", `${dep.path}/${dep.fileName}`, false);
                                        !dep.path && oReq.open("GET", `pages/${page.name}/dependencies/${depName}/${dep.fileName}`, false);
                                        oReq.send();

                                        if (oReq.status === 200) {
                                            return eval(oReq.responseText);
                                        }
                                        else {
                                            return false;
                                        }

                                    }
                                }
                            }
                        }
                    }

                    injectPrepare(fakeInjector, page);

                    //dependency injection end

                    let _page = getPage({}, { exports: null });

                    let o = {};
                    o[page.name] = React.createElement(_page.Main);

                    if (_page.reducer) {
                        injectAsyncReducer(page.name, _page.reducer);
                    }

                    _.assign($ExtModuleService.registredPage, o);
                    resolve(true);
                }
                catch (e) {
                    console.log(e);
                    resolve(false);
                }
            }

            let fileref = document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", `pages/${page.name}/main.css?ver=${page.version}`);
            document.getElementsByTagName("head")[0].appendChild(fileref);

            if (page.externalLib) {
                let lib = document.createElement("script")
                lib.setAttribute("type", "text/javascript")
                lib.setAttribute("src", `pages/${page.name}/${page.externalLib}?ver=${page.version}`);
                document.getElementsByTagName("head")[0].appendChild(lib);
            }

            let oReq = new XMLHttpRequest();
            oReq.addEventListener("load", function () { reqListener(this.responseText) });
            oReq.open("GET", `pages/${page.name}/index.min.js?ver=${page.version}`);
            oReq.send();
        })

        return p;
    }
}

export const ExtModuleService = new $ExtModuleService();