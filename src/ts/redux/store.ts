import { createStore, combineReducers, applyMiddleware } from 'redux';
import reducer from './reducer';
import { createHashHistory } from 'history';
import { routerMiddleware, routerReducer } from 'react-router-redux';

export const history = createHashHistory({ basename: '/' })
const middleware = routerMiddleware(history)

const createReducer = (asyncReducers?) => {
    return combineReducers<any>({
        core: reducer,
        router: routerReducer,
        ...asyncReducers
    } as any);
}

export const store = createStore(
    createReducer(),
    applyMiddleware(middleware)
);

export const injectAsyncReducer = (name: string, asyncReducer: any) => {
    (<any>store).asyncReducers[name] = asyncReducer;
    (<any>store).replaceReducer(createReducer((<any>store).asyncReducers));
}

(<any>store).asyncReducers = {};

export default store;
