
import * as React from 'react';
import "./style.scss"
export default class Example extends React.Component<any, any> {
    render() {
        return <div className="example" onClick={this.props.actions.action_one}>{this.props.value}</div>
    }
}
