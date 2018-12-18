
import * as React from 'react';
import "./style.scss"

export interface IExampleProps {
    value?: string;
    actions?: {
        action_one: () => void
    }
}
export interface IExampleState { }

export default class Example extends React.Component<IExampleProps, IExampleState> {
    render() {
        return <div className="example" onClick={this.props.actions.action_one}>{this.props.value}</div>
    }
}
