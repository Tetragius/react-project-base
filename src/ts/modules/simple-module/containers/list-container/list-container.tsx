import * as React from 'react';
import BaseContainer from '../../../../containers';
////import './style.scss';
import IList from '../../interfaces/IList';
import { ComponentClass } from 'enzyme';
import ListServiceStatic, { ListService } from './list-service';
import { IBaseContainerState } from '../../../../containers/base-container';
import { withRouter } from 'react-router';

interface IListContainerProps {
    list: IList;
}

interface IListContainerState extends IBaseContainerState {
    items?: any;
}

export class ListContainer<P, S> extends BaseContainer<IListContainerProps & P, IListContainerState | S>{

    state = { items: this.props.list.items };

    listService: ListService = null;

    constructor(props, selfListService = false) {
        super(props, true);
        if (selfListService) {
            this.listService = new ListService();
        }
        else {
            this.listService = ListServiceStatic;
        }
        this.listService.stateProvider = () => this.state;
    }

    selectItemHandler = (item: any) =>
        this.listService.selectItem(item)
            .then(list => this.setState({ items: list.items }));

    removeItemHandler = (item: any) =>
        this.listService.removeItem(item)
            .then(list => this.setState({ items: list.items }));

    clickItemHandler = (item: any) => console.log(item);

    sort = (flag?: boolean) =>
        this.listService.sort(flag)
            .then(list => this.setState({ items: list.items }));

    defineItemProps(item) {
        return {
            key: item.id,
            item: item,
            onClick: this.clickItemHandler,
            onRemove: this.removeItemHandler,
            onSelect: this.selectItemHandler,
            stream: this.stream,
        }
    }

    defineItem = (item) => {
        const itemFactory = this.listService.itemFactory;
        const Component = itemFactory(item) as ComponentClass<any>;
        const props = this.defineItemProps(item);
        return (
            <Component
                {...props}
            />)
    }

    view(custom = null) {

        const items = this.state.items;

        return (
            <div className="list-container">
                <div className="sort">
                    <div onClick={() => this.sort(true)}>asc</div>
                    <div onClick={() => this.sort(false)}>desc</div>
                    {custom}
                </div>
                <div className="list-wrapper">
                    <div className="list" >
                        {items.map(item => this.defineItem(item))}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ListContainer);