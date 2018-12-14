import { createAction } from 'redux-actions';
import IList from '../interfaces/IList';

class ActionTypes {
    static setList = createAction<IList>(`SET_LIST`);
    static removeItem = createAction<any>(`REMOVE_ITEM`);
    static selectItem = createAction<any>(`SELECT_ITEM`);
    static sortList = createAction<boolean>(`SORT_LIST`);
}

export default ActionTypes;
