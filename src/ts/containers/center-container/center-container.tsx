import * as React from 'react';
import BaseContainer from '../base-container';
import { withRouter, Route } from 'react-router';
import ModuleService from '../../services/module-service';
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
                {modules.map( _module => <Route key={_module.name} path={`/${_module.name}` } component={_module.component}/> )}
            </div>
            );
        }
    }
    
export default withRouter(CenterContainer);