import { handleActions } from 'redux-actions';
import ActionTypes from './types';
import * as _ from 'lodash';

const initialState: any = {
    loading: false
};

const reducer = handleActions<any, any>(
    {
        [ActionTypes.loading(null).type]: (state: any, action: any): any => {
            const result = { ...state };
            _.assign(result, { loading: action.payload });
            return result;
        }
    },
    initialState,
);

export default reducer;
