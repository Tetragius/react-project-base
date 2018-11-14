export default class StoreService{
    
    public static _store;

    public static get store() { return StoreService._store; }

    constructor(store){
        StoreService._store = store;
    }

    public static setStore(store){
        StoreService._store = store;
    }

}