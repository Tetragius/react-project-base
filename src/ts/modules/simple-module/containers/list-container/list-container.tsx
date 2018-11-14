import * as React from 'react';
import BaseContainer from '../../../../containers';
import { withRouter } from 'react-router';
import './style.scss';
import IList from '../../interfaces/IList';
import SimpleListItem from '../../components/simple-list-item';

interface IListContainerProps {
    list: IList;
 }

interface IListContainerState { }

class ListContainer extends BaseContainer<IListContainerProps, IListContainerState>{

    constructor(props) {
        super(props, true);
    }

    view(children) {

        const items = this.props.list.items;

        return (
            <div className="list-container" >
                {items.map(item => <SimpleListItem key={item.id} item={item} stream={this.stream}/>)}
            </div>
        );
    }
}

export default withRouter(ListContainer);