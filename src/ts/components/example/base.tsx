import * as React from 'react';

export interface IBaseComponentProps {
    hidden?: boolean;
}

export interface IBaswComponentState {
    _error?: boolean;
}

export interface ITemplate {
    [key: string]: JSX.Element;
}

export interface IBaseComponent<V> {
    view(template?: V): JSX.Element;

    errorView(): JSX.Element;
}

export class BaseComponent<P extends IBaseComponentProps = any, S extends IBaswComponentState = any, V extends ITemplate = any>
    extends React.Component<P, S>
    implements React.Component<P, S>, IBaseComponent<V> {

    constructor(props: P) {
        super(props);
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({ _error: true });
    }

    view(template: V = null): JSX.Element {
        return null;
    }

    errorView() {
        return null;
    }

    render() {

        const props = this.props;
        const state = this.state;

        if (state && state._error) {
            return this.errorView();
        }

        if (!props.hidden) {
            return this.view()
        }
        else {
            return null;
        }
    }
}


export class BasePureComponent<P extends IBaseComponentProps = any, S extends IBaswComponentState = any, V extends ITemplate = any>
    extends React.PureComponent<P, S>
    implements React.PureComponent<P, S>, IBaseComponent<V> {

    constructor(props: P) {
        super(props);
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({ _error: true });
    }

    view(template: V = null): JSX.Element {
        return null;
    }

    errorView() {
        return null;
    }

    render() {

        const props = this.props;
        const state = this.state;

        if (state && state._error) {
            return this.errorView();
        }

        if (!props.hidden) {
            return this.view()
        }
        else {
            return null;
        }
    }
}