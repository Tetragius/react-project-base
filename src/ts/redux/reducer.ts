import { handleActions } from 'redux-actions';
import ActionTypes from './types';
import * as _ from 'lodash';
import { ExtModuleService } from '../services/external-module-service';

const initialState: any = {
    loading: false,
    modules: [
        ...ExtModuleService.preparePageStore(),
        { id: 3, name: "simple-module", internal: true },
        { id: 5, name: "example-module", internal: true }
    ]
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
