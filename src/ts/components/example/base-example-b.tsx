import * as React from 'react';
export class Component extends React.Component<any, any> {

    clickHandler = () => this.props.onClick && this.props.onClick();

    render() {
        return (
            <div>
                <div>{this.props.title}</div>
                <div>{this.props.subTitle}</div>
                <div onClick={this.clickHandler}></div>
            </div>
        )
    }
}

export class ExtendedComponentA extends React.Component<any, any> {

    state = { selected: this.props.selected };

    changeHandler = () => {
        this.props.onChange && this.props.onChange(!this.state.selected);
        this.setState({ selected: !this.state.selected });
    };

    render() {

        const { title, subTitle, onClick, children, preButton } = this.props;

        return (
            <div>
                <div onClick={this.changeHandler}>{this.state.selected && 'selected' || 'unselected'}</div>
                {preButton}
                <Component {...{ title, subTitle, onClick }} />
                {children}
            </div>
        )
    }
}

export class ExtendedComponentB extends React.Component<any, any> {

    deleteHandler = () => this.props.onDelete && this.props.onDelete();

    render() {

        const { title, subTitle, onClick, onChange, selected } = this.props;
        const preButton = <div >pre</div>;

        return (
            <ExtendedComponentA
                title={title}
                subTitle={subTitle}
                onClick={onClick}
                preButton={preButton}
                onChange={onChange}
                selected={selected}
            >
                <div onClick={this.deleteHandler}>delete</div>
            </ExtendedComponentA>
        )
    }
}

export class ExtendedComponentC extends React.Component<any, any> {

    deleteHandler = () => alert(1);

    render() {

        const { title, subTitle, onClick, onChange, selected } = this.props;

        return (
            <ExtendedComponentB
                title={title}
                subTitle={subTitle}
                onClick={onClick}
                onChange={onChange}
                onDelete={this.deleteHandler}
                selected={selected}
            />
        )
    }
}