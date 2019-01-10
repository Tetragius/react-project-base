import * as React from 'react';
import BaseContainer from '../base-container';
import { withRouter } from 'react-router';
//import './style.scss';
import { history } from '../../redux/store';
import { connect } from 'react-redux';

interface ITopContainerProps {
    modules: any;
}

interface ITopContainerState { }

class TopContainer extends BaseContainer<ITopContainerProps, ITopContainerState>{

    constructor(props) {
        super(props);
    }

    goToModule = (name: string = "/") => history.push(name);

    defineLinks = (): JSX.Element[] => {
        const modules = this.props.modules;
        return modules.map(m =>
            <div
                className="link"
                key={m.id}
                onClick={() => this.goToModule(m.name)}>{m.name}
            </div>
        );
    }

    view() {
        return (
            <div className="top-container" >
                <div className="links">
                    <div className="link" onClick={() => this.goToModule()}>Main</div>
                    {this.defineLinks()}
                </div>
            </div>
        );
    }
}

export default withRouter(connect<any, any, any>((state: any) => (
    {
        modules: state.core.modules
    }))(TopContainer));