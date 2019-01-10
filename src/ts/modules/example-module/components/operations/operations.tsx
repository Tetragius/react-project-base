import * as React from 'react';
import BaseComponent from '../../../../components';
import './style.scss';
import { IBaseComponentProps } from '../../../../components/base-component';
import { IOperations } from '../../interfaces/IOperations';

interface IOperationsProps extends IBaseComponentProps {
    operations: IOperations[];
    onClick: Function;
}

interface IOperationsState { }

export default class Operations extends BaseComponent<IOperationsProps, IOperationsState>{
    constructor(props) {
        super(props);
    }

    view() {
        return (
            <div className="operations">
                {this.props.operations.map((o, i) => <div key={i} onClick={() => o.action()}>{o.title}</div>)}
            </div>
        );
    }
}