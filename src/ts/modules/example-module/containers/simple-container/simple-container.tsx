import * as React from 'react';
import BaseContainer from '../../../../containers';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import manifest from '../../manifest';
import Head from '../../components/head';
import Filter from '../../components/filter';
import Operations from '../../components/operations';
import Table from '../../components/table';
import Paginator from '../../components/paginator';
import { IFilter } from '../../interfaces/IFilter';
import { IHead } from '../../interfaces/IHead';
import { IOperations } from '../../interfaces/IOperations';
import { ITable } from '../../interfaces/ITable';
import './style.scss';
import Actions from '../../redux/actions';
import { IBaseContainerState } from '../../../../containers/base-container';
import Code from './code';

interface ISimpleContainerProps {
    table: ITable;

    page: number;

    filter: IFilter;

    head: IHead;

    loading: boolean;
    
    hasSelected: boolean;
}

interface ISimpleContainerState extends IBaseContainerState {

    operations: IOperations[];
}

class SimpleContainer extends BaseContainer<ISimpleContainerProps, ISimpleContainerState>{

    state = { operations: [] }

    constructor(props) {
        super(props);
    }

    filterChangeHandler = () => { }

    filterOperationsHandler = () => { }

    onItemSelectHandler = (item) => Actions.selectItem(item);

    onItemClickedHandler = (item) => console.log(item);

    onItemRemoveHandler = (item) => Actions.removeItem(item);

    pageChangeHandler = (page) => Code.loadList(page);

    onLoad = (page = 1, filter = null) => Code.loadList(page, filter);

    componentWillMount() {
        this.onLoad();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hasSelected) {
            this.setState({ operations: [{ title: "operation", action: () => console.log('operation') }] });
        }
        else {
            this.setState({ operations: [] });
        }
    }

    view() {

        const props = this.props;
        const state = this.state;

        return (
            <div className="simple-container">
                <Head
                    head={props.head} />
                <Filter
                    filter={props.filter}
                    onChange={this.filterChangeHandler} />
                <Operations
                    operations={state.operations}
                    onClick={this.filterOperationsHandler}
                    hidden={props.loading} />
                <Table
                    list={props.table.items}
                    onItemSelect={this.onItemSelectHandler}
                    onItemClicked={this.onItemClickedHandler}
                    onItemRemove={this.onItemRemoveHandler}
                    hidden={props.loading} />
                <div className="loader" hidden={!props.loading} >Loading...</div>
                <Paginator
                    current={props.page}
                    total={props.table.total}
                    perPage={15}
                    onChange={this.pageChangeHandler} />
            </div>
        );
    }
}

const mapper = (state: any): ISimpleContainerProps => {
    const modState = state[manifest.name];
    return {
        table: modState.table,
        page: modState.page,
        filter: modState.filter,
        head: modState.head,
        loading: modState.loading,
        hasSelected: modState.table.items.some(i => i.selected)
    }
}

export default connect(mapper)(withRouter(SimpleContainer));
