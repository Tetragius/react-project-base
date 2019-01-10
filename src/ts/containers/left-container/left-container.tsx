import * as React from 'react';
import BaseContainer from '../base-container';
import { withRouter } from 'react-router';
//import './style.scss';

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
            </div>
        );
    }
}

export default withRouter(LeftContainer);