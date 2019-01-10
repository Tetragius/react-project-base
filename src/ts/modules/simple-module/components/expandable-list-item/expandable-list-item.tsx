import * as React from 'react';
import './style.scss';
import IExpandableItem from '../../interfaces/IExpandableItem';
import ExtendedListItem from '../extended-list-item';

interface IExpandableListItemProps<T> {
    expanded?: boolean;
    onExpand?: (item: IExpandableItem & T) => void;
}

interface IExpandableListItemState {
    expanded?: boolean;
}

export default class ExpandableListItem<P, S, T> extends ExtendedListItem<IExpandableListItemProps<T> & P, IExpandableListItemState | S, IExpandableItem & T>{
    constructor(props) {
        super(props);
        this.stream
            .subscribe(val => val !== props.item.id && this.state.expanded && this.toggle())
    }

    state = {
        expanded: this.props.expanded || false,
        selected: this.props.item.selected || false
    }

    toggle = () => this.setState({ expanded: !this.state.expanded });

    onClick(item: IExpandableItem & T) {
        this.toggle()
        this.stream.next(item);
    }

    view(template?: { body?: JSX.Element, footer?: JSX.Element }) {

        const props = this.props;
        const state = this.state;
        const item = props.item;

        const footer = template && template.footer || <div className="simple-footer">[---]</div>
        const body = template && template.body || item.body;

        return (
            <div className={`expandable-list-item${state.selected && ' expandable-list-item__selected' || ''}`}>
                <div className={"expandable-list-item_head"}>
                    {super.view()}
                </div>
                {
                    state.expanded && <div className="expandable-list-item_body">{body}</div>
                }
                {footer}
            </div>
        );
    }
}