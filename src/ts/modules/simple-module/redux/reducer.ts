import { handleActions, Action } from 'redux-actions';
import ActionTypes from './types';
import * as _ from 'lodash';
import IState from '../interfaces/IState';
import IList from '../interfaces/IList';
import { ItemType } from '../interfaces/IItem';
import IExtendedItem from '../interfaces/IExtendedItem';

const items = [
    { id: "1", title: "test 1", type: ItemType.simple },
    { id: "2", title: "test 2", type: ItemType.extended },
    { id: "3", title: "test 3", type: ItemType.expandable, body: 'test test tset test test test test' },
    { id: "4", title: "test 4", type: ItemType.simple },
    { id: "5", title: "test 5", type: ItemType.extendedExpandable, body: 'test test test test test test test test test test', footer: 'test test test test test test test test test test' },
    { id: "6", title: "test 6", type: ItemType.extended },
    { id: "7", title: "test 7", type: ItemType.extended },
    { id: "8", title: "test 8", type: ItemType.extended },
    { id: "9", title: "test 9", type: ItemType.extended },
    { id: "10", title: "test 10 with validation", type: ItemType.validate, body: 'valid if it over then 10 letters', footer: 'test test test test test test test test test test' },
    { id: "11", title: "test 11 with validation", type: ItemType.validate, body: 'valid if it over then 10 letters', footer: 'test test test test test test test test test test' },
]

const initialState: IState = {
    list: {
        items: _.cloneDeep(items)
    },
    listB: {
        items: _.cloneDeep(items)
    }
};

const reducer = handleActions<any, any>(
    {
        [ActionTypes.setListB(null).type]: (state: IState, action: Action<IList>): any => {
            const result = { ...state };
            _.assign(result, { listB: action.payload });
            return result;
        },

        [ActionTypes.removeItemFromListB(null).type]: (state: IState, action: Action<IExtendedItem>): any => {
            const result = { ...state };
            const items = result.listB.items;
            const index = items.indexOf(action.payload);
            items.splice(index, 1);
            return _.assign(result, { listB: { items: [...items] } });;
        },

        [ActionTypes.selectItemFromListB(null).type]: (state: IState, action: Action<IExtendedItem>): any => {
            const result = { ...state };
            const items = result.listB.items;
            const index = items.indexOf(action.payload);
            items[index].selected = !items[index].selected;
            return result;
        },

        [ActionTypes.sortListB(null).type]: (state: IState, action: Action<boolean>): any => {
            const result = { ...state };
            const items = result.listB.items;
            if (action.payload) {
                items.sort((a, b) => a.id - b.id);
            }
            else {
                items.sort((a, b) => b.id - a.id);
            }
            return _.assign(result, { listB: { items: [...items] } });
        }
    },
    initialState,
);

export default reducer;
