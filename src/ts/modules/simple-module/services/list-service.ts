import IItem, { ItemType } from '../interfaces/IItem';
import SimpleListItem from '../components/simple-list-item';
import ExtendedListItem from '../components/extended-list-item';
import ExpandableListItem from '../components/expandable-list-item';
import ExtendedExpandableListItem from '../components/extended-expandable-list-item';

class ListService {
    public itemFactory<T extends IItem>(item: T){
        switch(item.type){
            case ItemType.simple: return SimpleListItem;
            case ItemType.extended: return ExtendedListItem;
            case ItemType.expandable: return ExpandableListItem;
            case ItemType.extendedExpandable: return ExtendedExpandableListItem;
            default: return SimpleListItem;
        }
    }
}

export default new ListService();