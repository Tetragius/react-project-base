import * as React from 'react';
import BaseComponent from '../base-component';
import './style.scss';

interface IErrorComponentProps { }

interface IErrorComponentState { }

export default class ErrorComponent extends BaseComponent<IErrorComponentProps, IErrorComponentState>{
    constructor(props) {
        super(props);
    }

    view() {
        const a = undefined;
        a.m = 1;
        return (
            <div className="error-component">test</div>
        );
    }
}