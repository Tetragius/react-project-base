import * as React from 'react';
import BaseComponent from '../base-component';
import './style.scss';

interface ISimpleComponentProps { }

interface ISimpleComponentState { }

export default class SimpleComponent extends BaseComponent<ISimpleComponentProps, ISimpleComponentState>{
    constructor(props) {
        super(props);
    }

    view() {
        return (
            <div className="simple-component">test</div>
        );
    }
}