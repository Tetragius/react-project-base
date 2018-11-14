import { createAction } from 'redux-actions';

class ActionTypes {
    static loading = createAction<boolean>(`LOADING`);
}

export default ActionTypes;
