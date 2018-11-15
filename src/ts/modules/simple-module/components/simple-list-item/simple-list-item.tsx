import * as React from 'react';
import BaseComponent from '../../../../components';
import './style.scss';
import IItem from '../../interfaces/IItem';
import { IBaseComponentProps } from '../../../../components/base-component';

interface ISimpleListItemProps<T> extends IBaseComponentProps{ 
    item: IItem & T;
    onClick?: (id: string) => void;
}

interface ISimpleListItemState { }

export default class SimpleListItem<P, S, T> extends BaseComponent<ISimpleListItemProps<T> & P, ISimpleListItemState & S>{
    constructor(props) {
        super(props);
    }

    onClick(id: string){
        this.props.onClick && this.props.onClick(id)
    }

    view() {

        const item = this.props.item;

        return (
            <div className="simple-list-item" onClick={() => this.onClick(item.id)}>{item.title}</div>
        );
    }
}