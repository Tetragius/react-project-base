import ActionTypes from './types';
import store from "./store";

class Actions {
    static loading = (flag: boolean) => {
        store.dispatch(ActionTypes.loading(flag));
    }
}


export default Actions;
