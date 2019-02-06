import * as React from 'react';
import BaseComponent from '../../../../components';
import './style.scss';
import { IBaseComponentProps } from '../../../../components/base-component';
import { IFilter } from '../../interfaces/IFilter';

interface IFilterProps extends IBaseComponentProps {
    filter: IFilter;
    onChange: Function;
}

interface IFilterState { }

export default class Filter extends BaseComponent<IFilterProps, IFilterState>{
    constructor(props) {
        super(props);
    }

    view() {
        return (
            <></>
        );
    }
}