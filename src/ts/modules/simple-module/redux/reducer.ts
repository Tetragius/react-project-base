import { handleActions, Action } from 'redux-actions';
import ActionTypes from './types';
import * as _ from 'lodash';
import IState from '../interfaces/IState';
import IList from '../interfaces/IList';
import { ItemType } from '../interfaces/IItem';

const initialState: IState = {
    list: {
        items: [
            { id: "1", title: "test 1", type: ItemType.simple },
            { id: "2", title: "test 2", type: ItemType.extended },
            { id: "3", title: "test 3", type: ItemType.expandable, body: 'test test tset test test test test' },
            { id: "5", title: "test 5", type: ItemType.simple },
            { id: "4", title: "test 4", type: ItemType.extendedExpandable, body: 'test test test test test test test test test test', footer: 'test test test test test test test test test test' },
        ], 
        total: 2}
};

const reducer = handleActions<any, any>(
    {
        [ActionTypes.setList(null).type]: (state: IState, action: Action<IList>): any => {
            const result = { ...state };
            _.assign(result, { list: action.payload });
            return result;
        }
    },
    initialState,
);

export default reducer;
