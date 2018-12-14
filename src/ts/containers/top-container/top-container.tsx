import * as React from 'react';
import BaseContainer from '../base-container';
import { withRouter } from 'react-router';
import './style.scss';
import ModuleService from '../../services/module-service';
import { history } from '../../redux/store';

interface ITopContainerProps { }

interface ITopContainerState { }

class TopContainer extends BaseContainer<ITopContainerProps, ITopContainerState>{

    constructor(props) {
        super(props);
    }

    goToModule = (name: string = "/") => history.push(name);

    defineLinks = (): JSX.Element[] => {
        const modules = ModuleService.modules;
        return modules.map(m =>
            <div
                className="link"
                key={m.manifest.id}
                onClick={() => this.goToModule(m.manifest.name)}>{m.manifest.name}
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

export default withRouter(TopContainer);