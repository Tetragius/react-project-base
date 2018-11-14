import { handleActions, Action } from 'redux-actions';
import ActionTypes from './types';
import * as _ from 'lodash';
import IState from '../interfaces/IState';
import IList from '../interfaces/IList';

const initialState: IState = {
    list: {
        items: [
            { id: "1", title: "test 1" },
            { id: "2", title: "test 2" },
            { id: "3", title: "test 3" },
            { id: "4", title: "test 4" },
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
