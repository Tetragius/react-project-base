import * as React from 'react';
import BaseComponent from '../../../../components';
import './style.scss';
import { IBaseComponentProps } from '../../../../components/base-component';
import IExtendedItem from '../../../simple-module/interfaces/IExtendedItem';
import ExtendedListItem from '../extended-list-item';

interface ITableProps extends IBaseComponentProps {
    list: IExtendedItem[];
    onItemSelect: (item: IExtendedItem) => void;
    onItemClicked: (item: IExtendedItem) => void;
    onItemRemove: (item: IExtendedItem) => void;
}

interface ITableState { }

export default class Table extends BaseComponent<ITableProps, ITableState>{
    constructor(props) {
        super(props);
    }

    view() {

        const list = this.props.list;

        return (
            <div className="table">
                {list.map(item => <ExtendedListItem
                    key={item.id}
                    item={item}
                    onClick={this.props.onItemClicked}
                    onSelect={this.props.onItemSelect} 
                    onRemove={this.props.onItemRemove}/>)}
            </div>
        );
    }
}