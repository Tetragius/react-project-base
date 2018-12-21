import * as React from 'react';
import { MainContainer } from './containers';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './redux/store';
import { hot } from 'react-hot-loader';
import ModuleService from './services/module-service';
import modules from './modules';
import '../styles/main.scss';

ModuleService.loadModules(modules);

class Application extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <MainContainer />
                </Router>
            </Provider>
        )
    }
}

const HotApplication = hot(module)(Application);

ReactDOM.render(<HotApplication />, document.getElementById('app'));