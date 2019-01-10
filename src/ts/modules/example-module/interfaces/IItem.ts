export enum ItemType {
    simple,
    extended,
    expandable,
    extendedExpandable,
    validate
}

export default interface IItem {
    id: string;
    type: ItemType;
    title: string;
}