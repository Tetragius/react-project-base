import { handleActions, Action } from 'redux-actions';
import ActionTypes from './types';
import * as _ from 'lodash';
import IState from '../interfaces/IState';
import IExtendedItem from '../interfaces/IExtendedItem';
import { ItemType } from '../../simple-module/interfaces/IItem';


const initialState: IState = {
    table: {
        items: [],
        total: 0
    },
    page: 1,
    filter: null,
    head: null,
    operations: null,
    loading: false,
};

const reducer = handleActions<IState, any>(
    {
        [ActionTypes.setList(null).type]: (state: IState, action: Action<any>): IState => {
            const result = { ...state };
            const payload = action.payload;
            _.assign(
                result,
                {
                    table: {
                        items: [...payload.items], total: payload.total
                    },
                    page: payload.page
                }
            );
            return result;
        },

        [ActionTypes.removeItemFromList(null).type]: (state: IState, action: Action<IExtendedItem>): IState => {
            const result = { ...state };
            const items = result.table.items;
            const index = items.indexOf(action.payload);
            items.splice(index, 1);
            return _.assign(result, { table: { ...state.table, items: [...items] } });;
        },

        [ActionTypes.selectItemFromList(null).type]: (state: IState, action: Action<IExtendedItem>): IState => {
            const result = { ...state };
            const items = result.table.items;
            const index = items.indexOf(action.payload);
            items[index].selected = !items[index].selected;
            return result;
        },

        [ActionTypes.setFilter(null).type]: (state: IState, action: Action<boolean>): IState => {
            const result = { ...state };
            return result;
        },

        [ActionTypes.toggleLoading(null).type]: (state: IState, action: Action<boolean>): IState => {
            const result = { ...state };
            result.loading = action.payload;
            return result;
        }
    },
    initialState,
);

export default reducer;
