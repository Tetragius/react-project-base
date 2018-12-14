import ActionTypes from './types';
import StoreService from './../services/store-service';
import IList from '../interfaces/IList';

class Actions {
    static setList = (list: IList) => StoreService.store.dispatch(ActionTypes.setList(list));
    static removeItem = (item: any) => StoreService.store.dispatch(ActionTypes.removeItem(item));
    static selectItem = (item: any) => StoreService.store.dispatch(ActionTypes.selectItem(item));
    static sortList = (asc: boolean = true) => StoreService.store.dispatch(ActionTypes.sortList(asc));
}


export default Actions;
