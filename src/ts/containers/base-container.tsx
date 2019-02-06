import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Subject } from 'rxjs';
import { ErrorInfo } from 'react';

export interface IBaseContainerProps<P = any> extends RouteComponentProps<P> {
    hidden?: boolean;
}

export interface IBaseContainerState {
    _error?: Error;
    _errorInfo?: ErrorInfo;
}

export interface IBaseContainer<T> {
    view(template?: T): JSX.Element;

    errorView(): JSX.Element;
}

export default class BaseContainer<P, S extends IBaseContainerState, T = any, V = any>
    extends React.Component<P & IBaseContainerProps<T>, S>
    implements React.Component<P & IBaseContainerProps<T>, S>, IBaseContainer<V>{

    private _stream;

    get stream() { return this._stream };
    set stream(data) { this._stream.next(data) };

    constructor(props: P & IBaseContainerProps<T>, createStream?: boolean) {
        super(props);
        if (createStream) {
            this._stream = new Subject();
        }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ _error: error, _errorInfo: errorInfo });
    }

    view(template?: V) {
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
            return this.view()
        }
        else {
            return null;
        }
    }
}