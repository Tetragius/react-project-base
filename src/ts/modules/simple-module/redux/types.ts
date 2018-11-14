import { createAction } from 'redux-actions';
import IList from '../interfaces/IList';

class ActionTypes {
    static setList = createAction<IList>(`SET_LIST`);
}

export default ActionTypes;
