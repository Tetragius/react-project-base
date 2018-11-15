export enum ItemType{
    simple,
    extended,
    expandable,
    extendedExpandable
}

export default interface IItem{
    id: string;
    type: ItemType;
    title: string;
}