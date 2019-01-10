import * as React from 'react';
import ExpandableListItem from '../expandable-list-item';
import IExtendedExpandableItem from '../../interfaces/IExtendedExpandableItem';
//import './style.scss';

interface IExtendedExpandableListItemProps { }

interface IExtendedExpandableListItemState { }

export default class ExtendedExpandableListItem
    extends ExpandableListItem<IExtendedExpandableListItemProps, IExtendedExpandableListItemState, IExtendedExpandableItem>{
    view() {
        const item = this.props.item;
        const footer = <div className="special-footer">{item.footer}</div>;
        return super.view({ footer });
    }
}