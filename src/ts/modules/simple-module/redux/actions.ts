import ActionTypes from './types';
import StoreService from './../services/store-service';
import IList from '../interfaces/IList';

class Actions {
    static setList = (list: IList) => {
        StoreService.store.dispatch(ActionTypes.setList(list));
    }
}


export default Actions;
