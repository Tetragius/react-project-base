import * as React from 'react';
import BaseContainer from '../../../../containers';
import { withRouter } from 'react-router';
import './style.scss';
import IList from '../../interfaces/IList';
import ListService from '../../services/list-service'

interface IListContainerProps {
    list: IList;
 }

interface IListContainerState { }

class ListContainer extends BaseContainer<IListContainerProps, IListContainerState>{

    constructor(props) {
        super(props, true);
    }

    view() {

        const items = this.props.list.items;
        const itemFactory = ListService.itemFactory;

        const defineItem = (item) => {
            const Component = itemFactory(item);
            return (<Component key={item.id} item={item} stream={this.stream}/>)
        }

        return (
            <div className="list-container" >
                {items.map(item => defineItem(item))}
            </div>
        );
    }
}

export default withRouter(ListContainer);