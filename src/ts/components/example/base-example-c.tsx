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

const ExtendedComponentAWrapper = (WrappedComponent) =>
    class extends React.Component<any, any>{

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
                    <WrappedComponent {...{ title, subTitle, onClick }} />
                    {children}
                </div>
            )
        }
    };

const ExtendedComponentBWrapper = (WrappedComponent) =>
    class extends React.Component<any, any>{
        deleteHandler = () => this.props.onDelete && this.props.onDelete();

        f = "maskarad";

        render() {

            const { title, subTitle, onClick, onChange, selected } = this.props;
            const preButton = <div >pre</div>;

            return (
                <WrappedComponent
                    title={title}
                    subTitle={subTitle}
                    onClick={onClick}
                    preButton={preButton}
                    onChange={onChange}
                    selected={selected}
                >
                    <div onClick={this.deleteHandler}>delete</div>
                </WrappedComponent>
            )
        }
    };

const ExtendedComponentCWrapper = (WrappedComponent) =>
    class extends React.Component<any, any>{
        deleteHandler = () => alert(1);

        render() {

            const { title, subTitle, onClick, onChange, selected } = this.props;

            return (
                <WrappedComponent
                    title={title}
                    subTitle={subTitle}
                    onClick={onClick}
                    onChange={onChange}
                    onDelete={this.deleteHandler}
                    selected={selected}
                />
            )
        }
    };

export const ExtendedComponentA = ExtendedComponentAWrapper(Component);
export const ExtendedComponentB = ExtendedComponentBWrapper(ExtendedComponentA);
export const ExtendedComponentC = ExtendedComponentCWrapper(ExtendedComponentB);