import { Guid } from '../services/guid';
import { Observable, from, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import axios from 'axios';

export interface IBaseSpecification {
    skip?: number;
    take?: number;
    search?: string;
    count?: boolean;
}

export interface IControllerBase<T, P, S> {
    get(params?: S, isUrlPartParams?: boolean): Observable<P | P[] | boolean>;
    post(params?: S, isUrlPartParams?: boolean): Observable<P | P[] | boolean>;
    map(item: T, mapper: (item: T) => P): P | P[];
    snitizeParamse(params: any): any;
}

export interface IAxiosResponse<T> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
}

export interface IAxiosErrorResponse {
    response: IAxiosResponse<any>;
    message: string | any;
    config: any;
}

export class ControllerBase<T, P, S> implements IControllerBase<T, P, S> {

    private _url: string = '';
    private _mapper: (item: T) => P;
    private onTakeUntil: Subject<any> = new Subject();

    constructor(url: string, mapper: (item: T) => P) {
        this._url = url;
        this._mapper = mapper;
    }

    snitizeParamse(params: any) {
        const _params = {} as any;
        const _Guid = Guid;
        for (const key in params) {
            if (params[key] !== null) {
                if (params[key]) {
                    const isTypeToString = (params[key].toString
                        && typeof params[key] !== 'number'
                        && typeof params[key] !== 'boolean'
                        && !params[key].isArray
                        && typeof params[key] !== 'object')
                        || (params[key] instanceof _Guid);

                    _params[key] = isTypeToString ? params[key].toString() : params[key];
                } else {
                    _params[key] = typeof params[key] === 'string' ? '' : params[key];
                }
            }
        }

        return _params;
    }

    post(params?: S, isUrlPartParams: boolean = false): Observable<P | P[] | boolean> {
        let url = this._url;
        if (params && isUrlPartParams)
            url = this.paramsToUrl(url, params);

        this.stop();
        return from<P | P[] | boolean>(
            axios.post(
                url,
                params,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                    timeout: 60000,
                },
            ).then(
                (response: any) => {
                    return new Promise<P | P[]>((resolve, reject) => {
                        if (!!response.data.error) {
                            reject(response.data.error);
                        } else {
                            resolve(this.map(response.data, this._mapper));
                        }
                    });
                },
                (error: IAxiosErrorResponse) => {
                    return new Promise<boolean>((resolve, reject) => reject(false));
                },
            ),
        ).pipe(takeUntil(this.onTakeUntil));
    }

    get(params?: S, isUrlPartParams: boolean = false): Observable<P | P[] | boolean> {
        let url = this._url;
        if (params && isUrlPartParams)
            url = this.paramsToUrl(url, params);

        this.stop();
        return from<P | P[] | boolean>(
            axios.get(
                url,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                    timeout: 60000,
                    params: !isUrlPartParams && this.snitizeParamse(params),
                },
            ).then(
                (response: any) => {
                    return new Promise<P | P[]>((resolve, reject) => {
                        if (!!response.data.error) {
                            reject(response.data.error);
                        } else {
                            resolve(this.map(response.data, this._mapper));
                        }
                    });
                },
                (error: IAxiosErrorResponse) => {
                    return new Promise<boolean>((resolve, reject) => reject(false));
                },
            ),
        ).pipe(takeUntil(this.onTakeUntil));
    }

    stop() {
        this.onTakeUntil.next(true);
    }

    map(item: T | T[], mapper: (item: T) => P): P | P[] {
        if ((item as any).isArray) {
            return (item as T[]).map(mapper);
        }

        return mapper(item as T);
    }

    private paramsToUrl(url?: string, params?: S): string {
        let newUrl = url;
        if (params) {
            for (let prop in params) {
                newUrl += `/${params[prop]}`;
            }
        }

        return newUrl;
    }
}
