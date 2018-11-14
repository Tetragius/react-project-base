import * as React from 'react';
import './style.scss';
import IItem from '../../interfaces/IItem';
import SimpleListItem from '../simple-list-item';

interface IExtendedListItemProps { 
    selected?: boolean;
    onSelect?: (id: string) => void;
    onRemove?: (id: string) => void;
}

interface IExtendedListItemState { 
    selected?: boolean;
}

export default class ExtendedListItem extends SimpleListItem<IExtendedListItemProps, IExtendedListItemState, IItem>{
    constructor(props) {
        super(props);
    }

    view() {
        return( 
        <div>
            <>
                {super.view()}
            </>
        </div>
        );
    }
}