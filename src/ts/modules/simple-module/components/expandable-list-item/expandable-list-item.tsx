import * as React from 'react';
import './style.scss';
import IExpandableItem from '../../interfaces/IExpandableItem';
import ExtendedListItem from '../extended-list-item';

interface IExpandableListItemProps { 
    expanded?: boolean;
    onExpand?: (id: string) => void;
}

interface IExpandableListItemState { 
    expanded?: boolean;
}

export default class ExpandableListItem extends ExtendedListItem<IExpandableListItemProps, IExpandableListItemState, IExpandableItem>{
    constructor(props) {
        super(props);
    }

    state: any = { expanded: this.props.expanded || false }

    onClick(id: string){
        this.setState({expanded: !this.state.expanded});
    }

    view(body?: JSX.Element) {

        const props = this.props;
        const state = this.state;
        const item = props.item;

        return( 
            <div className={`expandable-list-item${item.selected && ' expandable-list-item__selected' || ''}`}>
                <div className={"expandable-list-item_head"}>
                    {super.view()}
                </div>
                {   
                    state.expanded && <div className="expandable-list-item_body">{item.body}</div>
                }
            </div>
        );
    }
}