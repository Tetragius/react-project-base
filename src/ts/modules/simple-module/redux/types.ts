import { createAction } from 'redux-actions';
import IList from '../interfaces/IList';

class ActionTypes {
    static setListB = createAction<IList>(`SET_LIST_B`);
    static removeItemFromListB = createAction<any>(`REMOVE_ITEM_FROM_LIST_B`);
    static selectItemFromListB = createAction<any>(`SELECT_ITEM_FROM_LIST_B`);
    static sortListB = createAction<boolean>(`SORT_LIST_B`);
    static toggleLoading = createAction<boolean>('TOGGLE_LOADING');
}

export default ActionTypes;
