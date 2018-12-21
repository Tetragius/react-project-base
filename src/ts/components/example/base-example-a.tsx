import * as React from 'react';
import { BaseComponent } from './base';

export class Component extends BaseComponent {

    clickHandler = () => this.props.onClick && this.props.onClick();

    view(template?) {
        return (
            <div>
                <div>{this.props.title}</div>
                <div>{this.props.subTitle}</div>
                <div onClick={this.clickHandler}></div>
            </div>
        )
    }
}

export class ExtendedComponentA extends Component {

    state = { selected: this.props.selected };

    changeHandler = () => {
        this.props.onChange && this.props.onChange(!this.state.selected);
        this.setState({ selected: !this.state.selected });
    };

    view(template: { preButton: JSX.Element, button: JSX.Element } = { preButton: null, button: null }) {
        return (
            <div>
                <div onClick={this.changeHandler}>{this.state.selected && 'selected' || 'unselected'}</div>
                {template.preButton}
                {super.view()}
                {template.button}
            </div>
        );
    }
}

export class ExtendedComponentB extends ExtendedComponentA {

    deleteHandler = () => this.props.onDelete && this.props.onDelete();

    componentDidMount(){
        console.log(this.state, this.props)
    }

    view() {
        const button = <div onClick={this.deleteHandler}>delete</div>;
        const preButton = <div>pre</div>;
        return super.view({ button, preButton });
    }
}

export class ExtendedComponentC extends ExtendedComponentB {

    deleteHandler = () => alert(1);

    view() {
        return super.view();
    }
}