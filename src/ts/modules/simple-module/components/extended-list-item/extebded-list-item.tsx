import * as React from 'react';
import './style.scss';
import SimpleListItem from '../simple-list-item';
import IExtendedItem from '../../interfaces/IExtendedItem';

interface IExtendedListItemProps { 
    selected?: boolean;
    onSelect?: (id: string) => void;
    onRemove?: (id: string) => void;
}

interface IExtendedListItemState { 
    selected?: boolean;
}

export default class ExtendedListItem<P, S, T> extends SimpleListItem<IExtendedListItemProps & P, IExtendedListItemState | S, IExtendedItem & T>{
    
    constructor(props) {
        super(props);
    }

    state = { selected: this.props.selected || false }

    onSelect(id: string){
        this.setState({ selected: !this.state.selected })
        this.props.onSelect && this.props.onSelect(id);
    }

    onRemove(id: string) {
        this.props.onRemove && this.props.onRemove(id);
    }

    view() {

        const props = this.props;
        const state = this.state;
        const item = props.item;

        return( 
        <div className={`extended-list-item${state.selected && ' extended-list-item__selected' || ''}`}>
            <div className="extended-list-item_select" onClick={() => this.onSelect(item.id)}></div>
            <>
                {super.view()}
            </>
            <div className="extended-list-item_remove" onClick={() => this.onRemove(item.id)}></div>
        </div>
        );
    }
}