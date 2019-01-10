import * as React from 'react';
import './style.scss';
import SimpleListItem from '../simple-list-item';
import IExtendedItem from '../../interfaces/IExtendedItem';

interface IExtendedListItemProps<T> {
    onSelect?: (item: IExtendedItem & T) => void;
    onRemove?: (item: IExtendedItem & T) => void;
}

interface IExtendedListItemState {
    selected?: boolean;
}

export default class ExtendedListItem<P, S, T> extends SimpleListItem<IExtendedListItemProps<T> & P, IExtendedListItemState | S, IExtendedItem & T>{

    constructor(props) {
        super(props);
    }

    state = { selected: this.props.item.selected || false }

    onSelect(item: IExtendedItem & T) {
        this.setState({ selected: !this.state.selected })
        this.props.onSelect && this.props.onSelect(item);
    }

    onRemove(item: IExtendedItem & T) {
        this.props.onRemove && this.props.onRemove(item);
    }

    view() {

        const props = this.props;
        const state = this.state;
        const item = props.item;

        return (
            <div className={`extended-list-item${state.selected && ' extended-list-item__selected' || ''}`}>
                <div className="extended-list-item_select" onClick={() => this.onSelect(item)}></div>
                <>
                    {super.view()}
                </>
                <div className="extended-list-item_remove" onClick={() => this.onRemove(item)}></div>
            </div>
        );
    }
}