import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Subject } from 'rxjs';
import { ErrorInfo } from 'react';

export interface IBaseContainerProps<P = any> extends RouteComponentProps<P>{
    hidden?: boolean;
}

export interface IBaseContainerState { 
    _error?: Error;
    _errorInfo?: ErrorInfo;
}

export default class BaseContainer<P, S extends IBaseContainerState, T = any, V = any>
    extends React.Component<P & IBaseContainerProps<T>, S>
    implements React.Component<P & IBaseContainerProps<T>, S>{

    private _stream;

    get stream() { return this._stream };
    set stream(data) { this._stream.next(data) };

    constructor(props: P & IBaseContainerProps<T>, createStream?: boolean) {
        super(props);
        if (createStream) {
            this._stream = new Subject();
        }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo){
        this.setState({ _error: error, _errorInfo: errorInfo });
    }

    view(children: React.ReactNode, template?: V) {
        return null;
    }

    render() {

        if(this.state && this.state._error){
            return <div>error</div>
        }

        const props = this.props;
        if (!props.hidden) {
            return this.view(props.children)
        }
        else {
            return null;
        }
    }
}