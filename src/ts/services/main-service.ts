import { Subject } from "rxjs";

export interface IMainService {
    mainStream: Subject<any>;
}
class $MainService implements IMainService {
    mainStream = new Subject<any>();
    constructor() {
    }
}

const MainService = new $MainService();
export default MainService;