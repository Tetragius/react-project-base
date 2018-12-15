import IItem, { ItemType } from '../../interfaces/IItem';
import SimpleListItem from '../../components/simple-list-item';
import ExtendedListItem from '../../components/extended-list-item';
import ExpandableListItem from '../../components/expandable-list-item';
import ExtendedExpandableListItem from '../../components/extended-expandable-list-item';
import IExtendedItem from '../../interfaces/IExtendedItem';
import getModuleStateUnsafe from '../../redux/store';
import IList from '../../interfaces/IList';
import ValidationListItem from '../../components/validation-list-item';

export class ListService {

    public get listStoreUnsafe() { return getModuleStateUnsafe().list; }

    public stateProvider;
    public get state() { return this.stateProvider(); }

    public itemFactory<T extends IItem>(item: T) {
        switch (item.type) {
            case ItemType.simple: return SimpleListItem;
            case ItemType.extended: return ExtendedListItem;
            case ItemType.expandable: return ExpandableListItem;
            case ItemType.extendedExpandable: return ExtendedExpandableListItem;
            case ItemType.validate: return ValidationListItem;
            default: return SimpleListItem;
        }
    }

    public async sort(asc: boolean = true): Promise<IList> {
        const items = [...this.state.items];
        if (asc) {
            items.sort((a, b) => a.id - b.id);
        }
        else {
            items.sort((a, b) => b.id - a.id);
        }
        return { items };
    }

    public async removeItem(item: IItem): Promise<IList> {
        const items = [...this.state.items];
        const index = items.findIndex(i => i.id === item.id);
        items.splice(index, 1);
        return { items };
    }

    public async selectItem(item: IExtendedItem): Promise<IList> {
        const items = [...this.state.items];
        const index = items.findIndex(i => i.id === item.id);
        items[index] = { ...items[index], selected: !items[index].selected };
        return { items };
    }
}

export default new ListService();