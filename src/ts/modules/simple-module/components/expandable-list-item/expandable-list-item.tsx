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

export default class ExpandableListItem<P, S, T> extends ExtendedListItem<IExpandableListItemProps & P, IExpandableListItemState | S, IExpandableItem & T>{
    constructor(props) {
        super(props);
        this.stream
            .subscribe(val => val !== props.item.id && this.state.expanded && this.toggle())
    }

    state = { 
        expanded: this.props.expanded || false, 
        selected: this.props.selected || false 
    }

    toggle = () => this.setState({ expanded: !this.state.expanded });

    onClick(id: string){
        this.toggle()
        this.stream.next(id);
    }

    view(footer?: JSX.Element) {

        const props = this.props;
        const state = this.state;
        const item = props.item;

        footer = footer || <div className="simple-footer">[---]</div>

        return( 
            <div className={`expandable-list-item${state.selected && ' expandable-list-item__selected' || ''}`}>
                <div className={"expandable-list-item_head"}>
                    {super.view()}
                </div>
                {   
                    state.expanded && <div className="expandable-list-item_body">{item.body}</div>
                }
                {footer}
            </div>
        );
    }
}