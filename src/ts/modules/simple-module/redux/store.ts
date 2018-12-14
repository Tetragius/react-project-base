import store from "../../../redux/store";
import IState from "../interfaces/IState";
import { manifest } from "..";

const getModuleStateUnsafe = (): IState => store.getState()[manifest.name];
export default getModuleStateUnsafe;