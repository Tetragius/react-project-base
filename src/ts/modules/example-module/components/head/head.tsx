import * as React from 'react';
import BaseComponent from '../../../../components';
import './style.scss';
import { IBaseComponentProps } from '../../../../components/base-component';
import { IHead } from '../../interfaces/IHead';

interface IHeadProps extends IBaseComponentProps {
    head: IHead;
}

interface IHeadState { }

export default class Head extends BaseComponent<IHeadProps, IHeadState>{
    constructor(props) {
        super(props);
    }

    view() {
        return (
            <></>
        );
    }
}