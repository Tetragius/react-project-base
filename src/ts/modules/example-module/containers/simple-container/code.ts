import { IFilter } from "../../interfaces/IFilter";
import Actions from "../../redux/actions";
import getList from "../../endpoints/getList";

export default class Code {

    static loadList = (page: number, filter?: IFilter) => {
        Actions.toggleLoading(true);
        getList('http://123', (page - 1) * 15, 15).then(result => {
            Actions.setList(page, result.items, result.total);
            Actions.toggleLoading(false);
        })
    }
}