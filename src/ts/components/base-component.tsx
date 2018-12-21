import * as React from 'react';
import { Subject } from 'rxjs';

export interface IBaseComponentProps {
    hidden?: boolean;
    stream?: Subject<any>;
}

export interface IBaswComponentState {
    _error?: boolean;
}

export interface IBaseComponent<T> {
    view(template?: T): JSX.Element;

    errorView(): JSX.Element;
}


export default class BaseComponent<P extends IBaseComponentProps, S extends IBaswComponentState, V = any>
    extends React.Component<P, S>
    implements React.Component<P, S>, IBaseComponent<V>{

    _stream: Subject<any>;

    get stream(): Subject<any> { return this._stream }
    set stream(val: Subject<any>) { this._stream.next(val) }

    constructor(props: P) {
        super(props);
        this._stream = this.props.stream;
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({ _error: true });
    }

    view(template?: V): JSX.Element {
        return null;
    }

    errorView() {
        return null;
    }

    render() {

        if (this.state && this.state._error) {
            return this.errorView();
        }

        const props = this.props;
        if (!props.hidden) {
            return this.view();
        }
        else {
            return null;
        }
    }
}