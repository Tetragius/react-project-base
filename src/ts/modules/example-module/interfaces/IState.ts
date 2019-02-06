import { ITable } from "./ITable";
import { IFilter } from "./IFilter";
import { IHead } from "./IHead";
import { IOperations } from "./IOperations";

export default interface IState {
    table: ITable;

    page: number;

    filter: IFilter;

    head: IHead;

    operations: IOperations;

    loading: boolean;
}