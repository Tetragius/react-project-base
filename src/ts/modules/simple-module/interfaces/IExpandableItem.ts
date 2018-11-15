import IExtendedItem from "./IExtendedItem";

export default interface IExpandableItem extends IExtendedItem {
    expanded?: boolean;
    body?: string;
}