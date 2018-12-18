import ActionTypes from './types';
import StoreService from './../services/store-service';
import IList from '../interfaces/IList';
import getList from '../endpoints/getList';
import manifest from '../manifest';
import IState from '../interfaces/IState';

const state = (): IState => StoreService.store.getState()[manifest.name];

class Actions {
    static setList = (list: IList) => StoreService.store.dispatch(ActionTypes.setListB(list));
    static removeItem = (item: any) => StoreService.store.dispatch(ActionTypes.removeItemFromListB(item));
    static selectItem = (item: any) => StoreService.store.dispatch(ActionTypes.selectItemFromListB(item));
    static sortList = (asc: boolean = true) => StoreService.store.dispatch(ActionTypes.sortListB(asc));
    static toggleLoading = (status: boolean) => StoreService.store.dispatch(ActionTypes.toggleLoading(status));
    static loadList = (skip: number, take: number) => {
        let sortFlag = state().listB.asc;
        Actions.toggleLoading(true);
        getList('http://123', skip, take).then(result => {
            Actions.setList(result);
            Actions.sortList(sortFlag);
            Actions.toggleLoading(false);
        })
    }
}


export default Actions;
