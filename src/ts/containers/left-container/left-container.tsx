import * as React from 'react';
import BaseContainer from '../base-container';
import { withRouter } from 'react-router';
import './style.scss';
import FactoryComponentA, { actionList as AActions } from '../../components/factory-component/factory-component-a';
import FactoryComponentB, { actionList as BActions } from '../../components/factory-component/factory-component-b';
import { store } from '../../redux/store';

interface ILeftContainerProps { }

interface ILeftContainerState { }

class LeftContainer extends BaseContainer<ILeftContainerProps, ILeftContainerState>{

    constructor(props) {
        super(props);
    }

    view(children) {
        return (
            <div className="left-container" >
                {children}
                <FactoryComponentA />
                <FactoryComponentB />
                <div className="example" onClick={() => store.dispatch(AActions.action_two('test A-e'))}>ext A</div>
                <div className="example" onClick={() => store.dispatch(BActions.action_two('test B-e'))}>ext B</div>
            </div>
        );
    }
}

export default withRouter(LeftContainer);