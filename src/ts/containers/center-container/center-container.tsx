import * as React from 'react';
import BaseContainer from '../base-container';
import { withRouter, Route } from 'react-router';
import ExampleContainer from '../example-container/example-container';
//import './style.scss';
import ModuleContainer from '../module-container';
import { connect } from 'react-redux';

interface ICenterContainerProps {
    modules: any;
}

interface ICenterContainerState { }

class CenterContainer extends BaseContainer<ICenterContainerProps, ICenterContainerState>{

    constructor(props) {
        super(props);
    }

    view() {

        const modules = this.props.modules;

        return (
            <div className="center-container" >
                <Route exact path="/" component={ExampleContainer} />
                {modules.map(m =>
                    <Route
                        key={m.id}
                        path={`/${m.name}`}
                        render={(props) => <ModuleContainer {...props} manifest={m} moduleName={m.name} internal={m.internal} />} />
                )}
            </div>
        );
    }
}

export default withRouter(connect<any, any, any>((state: any) => (
    {
        modules: state.core.modules
    }))(CenterContainer));