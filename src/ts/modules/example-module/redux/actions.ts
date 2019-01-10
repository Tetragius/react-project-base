import ActionTypes from './types';
import StoreService from './../services/store-service';
import { IFilter } from '../interfaces/IFilter';
import IExtendedItem from '../../simple-module/interfaces/IExtendedItem';

class Actions {
    static setList = (page: number, items: IExtendedItem[], total: number) => StoreService.store.dispatch(ActionTypes.setList({ page, items, total }));
    static removeItem = (item: any) => StoreService.store.dispatch(ActionTypes.removeItemFromList(item));
    static selectItem = (item: any) => StoreService.store.dispatch(ActionTypes.selectItemFromList(item));
    static setFilter = (filter: IFilter) => StoreService.store.dispatch(ActionTypes.setFilter(filter));
    static toggleLoading = (status: boolean) => StoreService.store.dispatch(ActionTypes.toggleLoading(status));

}


export default Actions;
