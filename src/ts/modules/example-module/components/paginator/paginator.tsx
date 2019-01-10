import * as React from 'react';
import BaseComponent from '../../../../components';
import './style.scss';
import { IBaseComponentProps } from '../../../../components/base-component';
import { totalmem } from 'os';

interface IPaginatorProps extends IBaseComponentProps {
    current: number;
    total: number;
    perPage: number;
    onChange: Function;
}

interface IPaginatorState { }

export default class Paginator extends BaseComponent<IPaginatorProps, IPaginatorState>{
    constructor(props) {
        super(props);
    }

    definePaginator = () => {
        let elems = [];
        for (let i = 1; i <= Math.floor(this.props.total / this.props.perPage) + 1; i++) {
            elems.push(<div key={i} className={i === this.props.current && 'cur' || ''} onClick={() => this.props.onChange(i)}>{i}</div>);
        }
        return elems;
    }

    view() {
        return (
            <div className="paginator">
                {this.definePaginator()}
            </div>
        );
    }
}