import * as React from 'react';
import BaseContainer from '../../../../containers';
import { withRouter } from 'react-router';
import './style.scss';
import IList from '../../interfaces/IList';
import ListService from './list-service'
import { ComponentClass } from 'enzyme';
import listService from './list-service';
import Actions from '../../redux/actions';
import { IBaseContainerState } from '../../../../containers/base-container';

interface IListContainerProps {
    list: IList;
}

interface IListContainerState extends IBaseContainerState {
    items: any;
}

class ListContainer extends BaseContainer<IListContainerProps, IListContainerState>{

    state = { items: this.props.list.items };

    constructor(props) {
        super(props, true);
        listService.stateProvider = () => this.state;
    }

    selectItemHandler = (item: any) =>
        // listService.selectItem(item)
        //     .then(list => this.setState({ items: list.items }));
        Actions.selectItem(item);


    removeItemHandler = (item: any) =>
        // listService.removeItem(item)
        //     .then(list => this.setState({ items: list.items }));
        Actions.removeItem(item);

    clickItemHandler = (item: any) => console.log(item);

    sort = (flag?: boolean) =>
        // listService.sort(flag)
        //     .then(list => this.setState({ items: list.items }));
        Actions.sortList(flag);


    componentWillReceiveProps(nextProps: IListContainerProps) {
        this.setState({ items: nextProps.list.items });
    }

    view() {

        const items = this.state.items;
        const itemFactory = ListService.itemFactory;

        const defineItem = (item) => {
            const Component = itemFactory(item) as ComponentClass<any>;
            return (
                <Component
                    key={item.id}
                    item={item}
                    onClick={this.clickItemHandler}
                    onRemove={this.removeItemHandler}
                    onSelect={this.selectItemHandler}
                    stream={this.stream} />)
        }

        return (
            <div className="list-container" >
                <div onClick={() => this.sort()}>asc</div>
                <div onClick={() => this.sort(false)}>desc</div>
                {items.map(item => defineItem(item))}
            </div>
        );
    }
}

export default withRouter(ListContainer);