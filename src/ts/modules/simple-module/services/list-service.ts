import IItem, { ItemType } from '../interfaces/IItem';
import SimpleListItem from '../components/simple-list-item';
import ExtendedListItem from '../components/extended-list-item';
import ExpandableListItem from '../components/expandable-list-item';

class ListService {
    public itemFactory<T extends IItem>(item: T){
        switch(item.type){
            case ItemType.simple: return SimpleListItem;
            case ItemType.extended: return ExtendedListItem;
            case ItemType.expandable: return ExpandableListItem;
            default: return SimpleListItem;
        }
    }
}

export default new ListService();