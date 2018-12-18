import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import { createHashHistory } from 'history';
import { routerMiddleware, routerReducer } from 'react-router-redux';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const history = createHashHistory({ basename: '/' });
const middleware = routerMiddleware(history);

const createReducer = (asyncReducers?) => {
    return combineReducers<any>({
        core: reducer,
        router: routerReducer,
        ...asyncReducers
    } as any);
}

export const store = createStore(
    createReducer(),
    composeEnhancers(applyMiddleware(middleware))
);

export const injectAsyncReducer = (name: string, asyncReducer: any) => {
    (<any>store).asyncReducers[name] = asyncReducer;
    (<any>store).replaceReducer(createReducer((<any>store).asyncReducers));
}

(<any>store).asyncReducers = {};

export default store;
