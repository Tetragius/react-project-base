import ActionTypes from './types';
import StoreService from './../services/store-service';
import IList from '../interfaces/IList';

class Actions {
    static setList = (list: IList) => StoreService.store.dispatch(ActionTypes.setListB(list));
    static removeItem = (item: any) => StoreService.store.dispatch(ActionTypes.removeItemFromListB(item));
    static selectItem = (item: any) => StoreService.store.dispatch(ActionTypes.selectItemFromListB(item));
    static sortList = (asc: boolean = true) => StoreService.store.dispatch(ActionTypes.sortListB(asc));
}


export default Actions;
