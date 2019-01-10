import * as React from 'react';
import ExpandableListItem from '../expandable-list-item';
import IExtendedExpandableItem from '../../interfaces/IExtendedExpandableItem';
import ValidationService from './validation-service';
//import './style.scss';

interface IValidationListItemProps {
    isValid: boolean;
    onChange: (item: IExtendedExpandableItem) => void;
}

interface IValidationListItemState {
    isValid?: boolean;
    item: IExtendedExpandableItem;
}

export default class ValidationListItem<P, S, T>
    extends ExpandableListItem<IValidationListItemProps & P, IValidationListItemState | S, IExtendedExpandableItem & T>{

    constructor(props) {
        super(props);
    }

    state = {
        expanded: this.props.expanded || false,
        selected: this.props.item.selected || false,
        isValid: true,
        item: this.props.item,
    };

    checkValidation = (event) =>
        this.setState({
            isValid: ValidationService.validateInput(event.target.value),
            item: { ...this.state.item as any, body: event.target.value }
        }, () =>
                this.props.onChange && this.props.onChange({ ...this.props.item as any, isValid: this.state.isValid }));


    view() {
        const validClass = !this.state.isValid && "input invalid" || "input";
        const item = this.state.item;
        const body = <input
            className={validClass}
            type="text"
            onChange={this.checkValidation}
            value={item.body} />
        return super.view({ body });
    }
}