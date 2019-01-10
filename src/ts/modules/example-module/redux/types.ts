import { createAction } from 'redux-actions';
import IExtendedItem from '../../simple-module/interfaces/IExtendedItem';
import { IFilter } from '../interfaces/IFilter';

class ActionTypes {
    static setList = createAction<{ page: number, items: IExtendedItem[], total: number }>(`SET_LIST`);
    static removeItemFromList = createAction<any>(`REMOVE_ITEM_FROM_LIST`);
    static selectItemFromList = createAction<any>(`SELECT_ITEM_FROM_LIST`);
    static setFilter = createAction<IFilter>(`SORT_LIST`);
    static toggleLoading = createAction<boolean>('TOGGLE_LOADING');
}

export default ActionTypes;
