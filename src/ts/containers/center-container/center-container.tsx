import * as React from 'react';
import BaseContainer from '../base-container';
import { withRouter, Route } from 'react-router';
import ModuleService from '../../services/module-service';
import ExampleContainer from '../example-container/example-container';
import './style.scss';

interface ICenterContainerProps { }

interface ICenterContainerState { }

class CenterContainer extends BaseContainer<ICenterContainerProps, ICenterContainerState>{

    constructor(props) {
        super(props);
    }

    view(children) {

        const modules = ModuleService.modules;

        return (
            <div className="center-container" >
                <Route exact path="/" component={ExampleContainer} />
                {modules.map(_module => <Route key={_module.manifest.id} path={`/${_module.manifest.name}`} component={_module.component} />)}
            </div>
        );
    }
}

export default withRouter(CenterContainer);