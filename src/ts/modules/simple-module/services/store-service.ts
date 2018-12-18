import manifest from "../manifest";
import IState from "../interfaces/IState";

export default class StoreService {

    public static _store;

    public static get store() { return StoreService._store; }
    public static get state(): IState { return StoreService.store.getState()[manifest.name]; }

    constructor(store) {
        StoreService._store = store;
    }

    public static setStore(store) {
        StoreService._store = store;
    }

}